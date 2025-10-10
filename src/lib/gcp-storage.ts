import { Storage } from '@google-cloud/storage'
import logger from './logger'

interface UploadResult {
	success: boolean
	fileName: string
	bucket: string
	publicUrl?: string
	signedUrl?: string
	error?: string
}

class GCPStorageService {
	private storage: Storage | null = null
	private bucketName: string

	constructor() {
		this.bucketName = process.env.GCP_BUCKET_NAME || ''
		this.initializeStorage()
	}

	private initializeStorage() {
		const timer = logger.startTimer('GCP Storage initialization')
		
		try {
			const projectId = process.env.GCP_PROJECT_ID
			const serviceAccountKey = process.env.GCP_SERVICE_ACCOUNT_KEY

			logger.debug('Checking GCP configuration', {
				hasProjectId: !!projectId,
				hasServiceAccountKey: !!serviceAccountKey,
				hasBucketName: !!this.bucketName,
				bucketName: this.bucketName,
			})

			if (!projectId || !serviceAccountKey || !this.bucketName) {
				logger.warn('GCP credentials not properly configured', {
					projectId: projectId ? 'set' : 'missing',
					serviceAccountKey: serviceAccountKey ? 'set' : 'missing',
					bucketName: this.bucketName || 'missing',
				})
				timer()
				return
			}

			// Decode base64 encoded service account key
			let credentials
			try {
				const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
				credentials = JSON.parse(decodedKey)
				logger.debug('Service account key decoded successfully', {
					clientEmail: credentials.client_email,
				})
			} catch (parseError) {
				logger.error(
					'Failed to parse GCP service account key',
					{
						errorType: 'JSON_PARSE_ERROR',
					},
					parseError instanceof Error ? parseError : new Error(String(parseError))
				)
				throw new Error('Invalid GCP_SERVICE_ACCOUNT_KEY format. Must be base64 encoded JSON.')
			}

			this.storage = new Storage({
				projectId,
				credentials,
			})

			logger.info('GCP Storage initialized successfully', {
				projectId,
				bucket: this.bucketName,
				clientEmail: credentials.client_email,
			})
			timer()
		} catch (error) {
			logger.error(
				'Failed to initialize GCP Storage',
				{
					bucketName: this.bucketName,
					errorType: 'INITIALIZATION_FAILED',
				},
				error instanceof Error ? error : new Error(String(error))
			)
			this.storage = null
			timer()
		}
	}

	async uploadEventData(data: any): Promise<UploadResult> {
		const timer = logger.startTimer('Upload event data to GCS')
		
		if (!this.storage) {
			logger.warn('Upload attempted but storage client not initialized', {
				operation: 'uploadEventData',
			})
			timer()
			return {
				success: false,
				fileName: '',
				bucket: this.bucketName,
				error: 'Storage client not initialized',
			}
		}

		try {
			// Generate timestamp filename
			const timestamp = new Date()
				.toISOString()
				.replace(/:/g, '-')
				.replace(/\..+/, '')
			const fileName = `event_data_${timestamp}.json`

			logger.info('Starting file upload to GCS', {
				fileName,
				bucket: this.bucketName,
				dataSize: JSON.stringify(data).length,
			})

			const bucket = this.storage.bucket(this.bucketName)
			const file = bucket.file(fileName)

			// Convert data to JSON string
			const jsonString = JSON.stringify(data, null, 2)

			// Upload to GCS with public access
			await file.save(jsonString, {
				contentType: 'application/json',
			})

			logger.info('File uploaded successfully', {
				fileName,
				bucket: this.bucketName,
				size: jsonString.length,
			})

			// Generate a signed URL (valid for 7 days) as backup
			const [signedUrl] = await file.getSignedUrl({
				action: 'read',
				expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
			})

			const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`
			
			logger.info('Upload completed successfully', {
				fileName,
				publicUrl,
			})

			timer()
			return {
				success: true,
				fileName,
				bucket: this.bucketName,
				publicUrl,
				signedUrl,
			}
		} catch (error) {
			logger.error(
				'Failed to upload to GCP Storage',
				{
					bucket: this.bucketName,
					operation: 'uploadEventData',
					errorType: 'UPLOAD_FAILED',
				},
				error instanceof Error ? error : new Error(String(error))
			)
			timer()
			return {
				success: false,
				fileName: '',
				bucket: this.bucketName,
				error: error instanceof Error ? error.message : 'Unknown error',
			}
		}
	}

	async getLatestEventData(): Promise<any | null> {
		const timer = logger.startTimer('Get latest event data from GCS')
		
		if (!this.storage) {
			logger.warn('Get latest data attempted but storage client not initialized', {
				operation: 'getLatestEventData',
			})
			timer()
			return null
		}

		try {
			logger.debug('Fetching latest event data', {
				bucket: this.bucketName,
			})

			const bucket = this.storage.bucket(this.bucketName)
			
			// Get the latest event_data file
			const [files] = await bucket.getFiles({
				prefix: 'event_data_',
			})

			if (files.length === 0) {
				logger.warn('No event data files found in bucket', {
					bucket: this.bucketName,
					prefix: 'event_data_',
				})
				timer()
				return null
			}

			logger.debug('Found event data files', {
				count: files.length,
			})

			// Sort by creation time and get the latest
			const latestFile = files.sort((a, b) => {
				const aTime = new Date(a.metadata.timeCreated || 0).getTime()
				const bTime = new Date(b.metadata.timeCreated || 0).getTime()
				return bTime - aTime
			})[0]

			// Download and parse the file
			const [contents] = await latestFile.download()
			const data = JSON.parse(contents.toString('utf-8'))

			logger.info('Retrieved latest event data successfully', {
				fileName: latestFile.name,
				size: contents.length,
				created: latestFile.metadata.timeCreated,
			})
			timer()
			return data
		} catch (error) {
			logger.error(
				'Failed to get latest event data',
				{
					bucket: this.bucketName,
					operation: 'getLatestEventData',
					errorType: 'FETCH_FAILED',
				},
				error instanceof Error ? error : new Error(String(error))
			)
			timer()
			return null
		}
	}

	async getCurrentEventData(): Promise<any | null> {
		const timer = logger.startTimer('Get current event data from GCS')
		
		if (!this.storage) {
			logger.warn('Get current data attempted but storage client not initialized', {
				operation: 'getCurrentEventData',
			})
			timer()
			return null
		}

		try {
			const bucket = this.storage.bucket(this.bucketName)
			const currentFile = bucket.file('event_data_current.json')

			logger.debug('Checking for current event data file', {
				bucket: this.bucketName,
				fileName: 'event_data_current.json',
			})

			// Check if file exists
			const [exists] = await currentFile.exists()
			
			if (!exists) {
				logger.warn('Current event data file not found', {
					bucket: this.bucketName,
					fileName: 'event_data_current.json',
				})
				timer()
				return null
			}

			// Download and parse the file
			const [contents] = await currentFile.download()
			const data = JSON.parse(contents.toString('utf-8'))

			logger.info('Retrieved current event data successfully', {
				size: contents.length,
				lastUpdated: data.lastUpdated,
			})
			timer()
			return data
		} catch (error) {
			logger.error(
				'Failed to get current event data',
				{
					bucket: this.bucketName,
					fileName: 'event_data_current.json',
					operation: 'getCurrentEventData',
					errorType: 'FETCH_FAILED',
				},
				error instanceof Error ? error : new Error(String(error))
			)
			timer()
			return null
		}
	}

	async updateCurrentEventData(data: any): Promise<boolean> {
		const timer = logger.startTimer('Update current event data in GCS')
		
		if (!this.storage) {
			logger.warn('Update current data attempted but storage client not initialized', {
				operation: 'updateCurrentEventData',
			})
			timer()
			return false
		}

		try {
			const bucket = this.storage.bucket(this.bucketName)
			const currentFile = bucket.file('event_data_current.json')

			// Add metadata to track when data was last updated
			const dataWithMetadata = {
				...data,
				lastUpdated: new Date().toISOString(),
				syncedAt: Date.now(),
			}

			const jsonString = JSON.stringify(dataWithMetadata, null, 2)

			logger.info('Updating current event data file', {
				bucket: this.bucketName,
				fileName: 'event_data_current.json',
				size: jsonString.length,
			})

			await currentFile.save(jsonString, {
				contentType: 'application/json',
			})

			logger.info('Updated current event data successfully', {
				fileName: 'event_data_current.json',
				lastUpdated: dataWithMetadata.lastUpdated,
			})
			timer()
			return true
		} catch (error) {
			logger.error(
				'Failed to update current event data',
				{
					bucket: this.bucketName,
					fileName: 'event_data_current.json',
					operation: 'updateCurrentEventData',
					errorType: 'UPDATE_FAILED',
				},
				error instanceof Error ? error : new Error(String(error))
			)
			timer()
			return false
		}
	}

	isConfigured(): boolean {
		return this.storage !== null
	}
}

// Export singleton instance
const gcpStorageService = new GCPStorageService()
export default gcpStorageService

