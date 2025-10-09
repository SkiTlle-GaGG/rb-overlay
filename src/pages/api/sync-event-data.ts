import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
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

const RIOT_API_URL = 'https://stg.ftw.riotgames.com/assets/twitch-overlays/redbull-fractured-alliance-1.json'
const LOCAL_FILE_PATH = path.join(process.cwd(), 'src', 'assets', 'event_data.json')

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SyncResponse>
) {
	const timestamp = new Date().toISOString()

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

		console.log(`[${timestamp}] Starting event data sync from ${RIOT_API_URL}`)

		// Fetch data from Riot Games API
		const response = await fetch(RIOT_API_URL)

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`)
		}

		const eventData = await response.json()

		// Validate that we got valid data
		if (!eventData || typeof eventData !== 'object') {
			throw new Error('Invalid data received from API')
		}

		console.log(`[${timestamp}] Successfully fetched event data`)

		// Write to local file
		await fs.writeFile(
			LOCAL_FILE_PATH,
			JSON.stringify(eventData, null, 2),
			'utf-8'
		)

		console.log(`[${timestamp}] Successfully wrote to local file: ${LOCAL_FILE_PATH}`)

		// Upload to GCP Cloud Storage
		let gcsResult
		if (gcpStorageService.isConfigured()) {
			gcsResult = await gcpStorageService.uploadEventData(eventData)
			console.log(`[${timestamp}] GCS upload result:`, gcsResult)
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
			localFile: LOCAL_FILE_PATH,
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

