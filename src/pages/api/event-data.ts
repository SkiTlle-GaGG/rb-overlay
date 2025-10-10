import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from '../../types/overlay-data'
import eventData from '../../assets/event_data.json'

const RIOT_API_URL = process.env.RIOT_API_URL;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<EventData | { error: string }>
) {
	try {


		// Make sure the RIOT_API_URL is defined
		if (!RIOT_API_URL) {
			console.error('[event-data] RIOT_API_URL is not defined in environment variables');
			res.setHeader('X-Data-Source', 'LOCAL-FALLBACK-NO-RIOT-URL');
			return res.status(200).json(eventData as any);
		}

		let riotData: any = null;
		let errorFetching = false;

		try {
			const fetchRes = await fetch(RIOT_API_URL, {
				headers: { Accept: 'application/json' }
			});

			if (!fetchRes.ok) {
				throw new Error(`[event-data] RIOT_API_URL fetch failed: Status ${fetchRes.status}`);
			}

			riotData = await fetchRes.json();
		} catch (error) {
			errorFetching = true;
			console.error('[event-data] Error fetching RIOT_API_URL data:', error);
		}

		if (riotData && !errorFetching) {
			console.log('[event-data] Serving fresh data from RIOT_API_URL');
			return res.status(200).json(riotData);
		} else {
			console.warn('[event-data] RIOT_API_URL unavailable, using local fallback');
			return res.status(200).json(eventData as any);
		}
	} catch (error) {
		console.error('[event-data] Error serving event data:', error);

		// Fall back to local data on error
		if (eventData) {
			console.log('[event-data] Error occurred, falling back to local data');
			res.setHeader('X-Data-Source', 'LOCAL-ERROR-FALLBACK');
			return res.status(200).json(eventData as any);
		}

		return res.status(500).json({ error: 'Internal server error' });
	}
}
