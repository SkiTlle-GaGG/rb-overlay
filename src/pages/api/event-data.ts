import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from '../../types/overlay-data'
import eventData from '../../assets/event_data.json'
import gcpStorageService from '../../lib/gcp-storage'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<EventData | { error: string }>
) {
	try {
		// Set CORS headers to allow cross-origin requests
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		
		// No caching - always return fresh data
		res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
		res.setHeader('Pragma', 'no-cache')
		res.setHeader('Expires', '0')

		// Handle preflight requests
		if (req.method === 'OPTIONS') {
			res.status(200).end()
			return
		}

		// Only allow GET requests
		if (req.method !== 'GET') {
			res.status(405).json({ error: 'Method not allowed' })
			return
		}

		// Always fetch fresh data from GCP Cloud Storage
		let freshData = null
		
		if (gcpStorageService.isConfigured()) {
			console.log('[event-data] Fetching latest data from GCP Cloud Storage')
			freshData = await gcpStorageService.getCurrentEventData()
		}

		// Use GCP data if available, otherwise fall back to local file
		if (freshData) {
			console.log('[event-data] Serving fresh data from GCP')
			res.setHeader('X-Data-Source', 'GCP')
			res.setHeader('X-Updated', freshData.lastUpdated || new Date().toISOString())
			return res.status(200).json(freshData)
		} else {
			console.log('[event-data] GCP data unavailable, using local fallback')
			res.setHeader('X-Data-Source', 'LOCAL-FALLBACK')
			return res.status(200).json(eventData as any)
		}
	} catch (error) {
		console.error('[event-data] Error serving event data:', error)
		
		// Fall back to local data on error
		if (eventData) {
			console.log('[event-data] Error occurred, falling back to local data')
			res.setHeader('X-Data-Source', 'LOCAL-ERROR-FALLBACK')
			return res.status(200).json(eventData as any)
		}
		
		return res.status(500).json({ error: 'Internal server error' })
	}
}
