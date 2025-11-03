import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from '../../types/overlay-data'
import eventData from '../../assets/event_data.json'

const RIOT_API_URL = process.env.RIOT_API_URL;

const simulate500Response = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				status: 500,
				json: () => Promise.resolve({ error: 'Simulated 500 error' })
			});
		}, 1000);
	});
}

const triggerEventDataSync = async () => {
	try {
		console.warn('[event-data] Triggering event data sync');
		await fetch('/api/sync-event-data', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('[event-data] Error triggering sync:', error);
	}
}

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

			if (!fetchRes.ok || fetchRes.status !== 200) {
				// Trigger sync when we get a non-200 response
				triggerEventDataSync();
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
			console.error('[event-data] RIOT_API_URL unavailable, using local fallback');
			triggerEventDataSync();
			return res.status(200).json(eventData as any);
		}
	} catch (error) {
		console.error('[event-data] Error serving event data:', error);

		// Fall back to local data on error
		if (eventData) {
			console.error('[event-data] Error occurred, falling back to local data', error);
			triggerEventDataSync();
			res.setHeader('X-Data-Source', 'LOCAL-ERROR-FALLBACK');
			return res.status(200).json(eventData as any);
		}

		return res.status(500).json({ error: 'Internal server error' });
	}
}
