import { Storage } from '@google-cloud/storage'

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
		try {
			const projectId = process.env.GCP_PROJECT_ID
			const serviceAccountKey = process.env.GCP_SERVICE_ACCOUNT_KEY

			if (!projectId || !serviceAccountKey || !this.bucketName) {
				console.warn('GCP credentials not properly configured')
				return
			}

			// Decode base64 encoded service account key
			let credentials
			try {
				const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
				credentials = JSON.parse(decodedKey)
			} catch (parseError) {
				console.error('Failed to parse GCP service account key:', parseError)
				throw new Error('Invalid GCP_SERVICE_ACCOUNT_KEY format. Must be base64 encoded JSON.')
			}

			this.storage = new Storage({
				projectId,
				credentials,
			})

			console.log('GCP Storage initialized successfully')
		} catch (error) {
			console.error('Failed to initialize GCP Storage:', error)
			this.storage = null
		}
	}

	async uploadEventData(data: any): Promise<UploadResult> {
		if (!this.storage) {
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

			const bucket = this.storage.bucket(this.bucketName)
			const file = bucket.file(fileName)

			// Convert data to JSON string
			const jsonString = JSON.stringify(data, null, 2)

			// Upload to GCS with public access
			await file.save(jsonString, {
				contentType: 'application/json',
			})

			console.log(`File ${fileName} uploaded to ${this.bucketName}`)

			// Generate a signed URL (valid for 7 days) as backup
			const [signedUrl] = await file.getSignedUrl({
				action: 'read',
				expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
			})

			return {
				success: true,
				fileName,
				bucket: this.bucketName,
				publicUrl: `https://storage.googleapis.com/${this.bucketName}/${fileName}`,
				signedUrl,
			}
		} catch (error) {
			console.error('Failed to upload to GCP Storage:', error)
			return {
				success: false,
				fileName: '',
				bucket: this.bucketName,
				error: error instanceof Error ? error.message : 'Unknown error',
			}
		}
	}

	async getLatestEventData(): Promise<any | null> {
		if (!this.storage) {
			console.warn('Storage client not initialized')
			return null
		}

		try {
			const bucket = this.storage.bucket(this.bucketName)
			
			// Get the latest event_data file
			const [files] = await bucket.getFiles({
				prefix: 'event_data_',
			})

			if (files.length === 0) {
				console.warn('No event data files found in bucket')
				return null
			}

			// Sort by creation time and get the latest
			const latestFile = files.sort((a, b) => {
				const aTime = new Date(a.metadata.timeCreated || 0).getTime()
				const bTime = new Date(b.metadata.timeCreated || 0).getTime()
				return bTime - aTime
			})[0]

			// Download and parse the file
			const [contents] = await latestFile.download()
			const data = JSON.parse(contents.toString('utf-8'))

			console.log(`Retrieved latest event data from ${latestFile.name}`)
			return data
		} catch (error) {
			console.error('Failed to get latest event data:', error)
			return null
		}
	}

	async getCurrentEventData(): Promise<any | null> {
		if (!this.storage) {
			console.warn('Storage client not initialized')
			return null
		}

		try {
			const bucket = this.storage.bucket(this.bucketName)
			const currentFile = bucket.file('event_data_current.json')

			// Check if file exists
			const [exists] = await currentFile.exists()
			
			if (!exists) {
				console.warn('Current event data file not found')
				return null
			}

			// Download and parse the file
			const [contents] = await currentFile.download()
			const data = JSON.parse(contents.toString('utf-8'))

			console.log('Retrieved current event data from GCS')
			return data
		} catch (error) {
			console.error('Failed to get current event data:', error)
			return null
		}
	}

	async updateCurrentEventData(data: any): Promise<boolean> {
		if (!this.storage) {
			console.warn('Storage client not initialized')
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

			await currentFile.save(jsonString, {
				contentType: 'application/json',
			})

			console.log('Updated current event data in GCS')
			return true
		} catch (error) {
			console.error('Failed to update current event data:', error)
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

