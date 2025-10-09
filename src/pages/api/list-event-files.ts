import type { NextApiRequest, NextApiResponse } from 'next'
import { Storage } from '@google-cloud/storage'

interface FileInfo {
	name: string
	size: number
	created: string
	updated: string
	publicUrl: string
	signedUrl: string
}

interface ListFilesResponse {
	success: boolean
	files?: FileInfo[]
	error?: string
	bucketName?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ListFilesResponse>
) {
	if (req.method !== 'GET') {
		return res.status(405).json({
			success: false,
			error: 'Method not allowed',
		})
	}

	try {
		const projectId = process.env.GCP_PROJECT_ID
		const serviceAccountKey = process.env.GCP_SERVICE_ACCOUNT_KEY
		const bucketName = process.env.GCP_BUCKET_NAME

		if (!projectId || !serviceAccountKey || !bucketName) {
			return res.status(500).json({
				success: false,
				error: 'GCP credentials not configured',
			})
		}

		// Decode base64 encoded service account key
		let credentials
		try {
			const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
			credentials = JSON.parse(decodedKey)
		} catch (parseError) {
			console.error('Failed to parse GCP service account key:', parseError)
			return res.status(500).json({
				success: false,
				error: 'Invalid GCP_SERVICE_ACCOUNT_KEY format. Must be base64 encoded JSON.',
			})
		}

		const storage = new Storage({
			projectId,
			credentials,
		})

		const bucket = storage.bucket(bucketName)
		const [files] = await bucket.getFiles({
			prefix: 'event_data_',
		})

		// Generate signed URLs for each file
		const fileInfosPromises = files.map(async (file) => {
			// Generate signed URL (valid for 7 days)
			const [signedUrl] = await file.getSignedUrl({
				action: 'read',
				expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
			})

			return {
				name: file.name,
				size: typeof file.metadata.size === 'string' 
					? parseInt(file.metadata.size, 10) 
					: (file.metadata.size || 0),
				created: file.metadata.timeCreated || '',
				updated: file.metadata.updated || '',
				publicUrl: `https://storage.googleapis.com/${bucketName}/${file.name}`,
				signedUrl,
			}
		})

		const fileInfos = (await Promise.all(fileInfosPromises))
			.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())

		return res.status(200).json({
			success: true,
			files: fileInfos,
			bucketName,
		})
	} catch (error) {
		console.error('Error listing files:', error)
		return res.status(500).json({
			success: false,
			error: error instanceof Error ? error.message : 'Failed to list files',
		})
	}
}

