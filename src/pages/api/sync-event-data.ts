import type { NextApiRequest, NextApiResponse } from 'next'
import gcpStorageService from '../../lib/gcp-storage'

interface SyncResponse {
	success: boolean
	message: string
	timestamp: string
	localFile?: string
	gcsUpload?: {
		success: boolean
		fileName?: string
		bucket?: string
		publicUrl?: string
		error?: string
	}
	error?: string
}

const RIOT_API_URL = process.env.RIOT_API_URL

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SyncResponse>
) {
	const timestamp = new Date().toISOString()

	console.log("FEtching data from Riot Games API", RIOT_API_URL)
	try {
		// Verify cron secret for security
		const authHeader = req.headers.authorization
		const cronSecret = process.env.CRON_SECRET

		if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
				timestamp,
				error: 'Invalid or missing authorization token',
			})
		}

		// Only allow POST requests
		if (req.method !== 'POST') {
			return res.status(405).json({
				success: false,
				message: 'Method not allowed',
				timestamp,
				error: 'Only POST requests are allowed',
			})
		}

		if (!RIOT_API_URL) {
			throw new Error('RIOT_API_URL environment variable is not set')
		}

		console.log(`[${timestamp}] Starting event data sync from ${RIOT_API_URL}`)

		// Fetch data from Riot Games API with proper headers
		const response = await fetch(RIOT_API_URL, {
			headers: {
				'Accept': 'application/json',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
			},
		})

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`)
		}

		// Check content type
		const contentType = response.headers.get('content-type')
		console.log(`[${timestamp}] Response content-type: ${contentType}`)

		// Get response as text first to check encoding
		const responseText = await response.text()
		
		// Try to parse as JSON
		let eventData
		try {
			eventData = JSON.parse(responseText)
		} catch (parseError) {
			console.error(`[${timestamp}] JSON parse error:`, parseError)
			console.error(`[${timestamp}] Response preview:`, responseText.substring(0, 200))
			throw new Error(`Failed to parse API response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
		}

		// Validate that we got valid data
		if (!eventData || typeof eventData !== 'object') {
			throw new Error('Invalid data received from API')
		}

		console.log(`[${timestamp}] Successfully fetched event data`)

		// Upload to GCP Cloud Storage
		let gcsResult
		let currentFileUpdated = false

		if (gcpStorageService.isConfigured()) {
			// Upload timestamped archive
			gcsResult = await gcpStorageService.uploadEventData(eventData)
			console.log(`[${timestamp}] GCS timestamped upload result:`, gcsResult)

			// // Update current file (used by event-data API)
			currentFileUpdated = await gcpStorageService.updateCurrentEventData(eventData)
			console.log(`[${timestamp}] Current file updated: ${currentFileUpdated}`)
		} else {
			console.warn(`[${timestamp}] GCP Storage not configured, skipping cloud upload`)
			gcsResult = {
				success: false,
				error: 'GCP Storage not configured',
			}
		}

		return res.status(200).json({
			success: true,
			message: 'Event data synced successfully',
			timestamp,
			localFile: currentFileUpdated ? 'GCS: event_data_current.json' : 'Not updated',
			gcsUpload: gcsResult,
		})
	} catch (error) {
		console.error(`[${timestamp}] Sync error:`, error)

		return res.status(500).json({
			success: false,
			message: 'Failed to sync event data',
			timestamp,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
		})
	}
}

