import type { NextApiRequest, NextApiResponse } from 'next'
import gcpStorageService from '../../lib/gcp-storage'
import logger from '../../lib/logger'

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
	const timer = logger.startTimer('Event data sync - total duration')

	logger.info('Sync request received', {
		method: req.method,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		userAgent: req.headers['user-agent'],
		hasAuthHeader: !!req.headers.authorization,
	})

	try {
		if (!RIOT_API_URL) {
			throw new Error('RIOT_API_URL environment variable is not set')
		}

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

		// Get response as text first to check encoding
		const responseText = await response.text()
		
		// Try to parse as JSON
		let eventData
		try {
			eventData = JSON.parse(responseText)
		} catch (parseError) {
			throw new Error(`Failed to parse API response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
		}

		// Validate that we got valid data
		if (!eventData || typeof eventData !== 'object') {
			throw new Error('Invalid data received from API')
		}

		// Upload to GCP Cloud Storage
		let gcsResult
		let currentFileUpdated = false

		if (gcpStorageService.isConfigured()) {
			// Upload timestamped archive
			gcsResult = await gcpStorageService.uploadEventData(eventData)

			// Update current file (used by event-data API)
			// currentFileUpdated = await gcpStorageService.updateCurrentEventData(eventData)
		} else {
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
		timer()

		return res.status(500).json({
			success: false,
			message: 'Failed to sync event data',
			timestamp,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
		})
	}
}

