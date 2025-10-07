import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from '../../types/overlay-data'
import eventData from '../../assets/event_data.json'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<EventData | { error: string }>
) {
	try {
		// Set CORS headers to allow cross-origin requests
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

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

		// Return the event data
		res.status(200).json(eventData as any)
	} catch (error) {
		console.error('Error serving event data:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}
