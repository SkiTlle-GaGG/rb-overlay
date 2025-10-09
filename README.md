# Red Bull Fractured Alliance - Event Overlays

## Environment Configuration

This project includes an automated data pipeline that syncs event data from Riot Games API to local storage and Google Cloud Storage.

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# API Configuration
RIOT_API_URL=https://stg.ftw.riotgames.com/assets/twitch-overlays/redbull-fractured-alliance-1.json

# GCP Configuration
GCP_PROJECT_ID=your-project-id
GCP_BUCKET_NAME=your-bucket-name
GCP_SERVICE_ACCOUNT_KEY=base64-encoded-service-account-json

# Cron Secret for securing the sync endpoint (optional, for API access)
CRON_SECRET=your-secure-random-token
```

#### Setting up GCP Service Account Key

1. Create a service account in your GCP project
2. Grant it "Storage Object Creator" permission
3. Download the JSON key file
4. Encode it using the provided utility script:
   ```bash
   node scripts/encode-gcp-key.js path/to/your-service-account-key.json
   ```
   This will output the properly formatted environment variables.

**Alternative encoding methods:**
- Linux/Mac: `base64 -w 0 service-account-key.json`
- Windows: `certutil -encode service-account-key.json encoded.txt` (then remove headers)

#### Generating CRON_SECRET

Generate a secure random token:
```bash
openssl rand -hex 32
```

### Data Sync Pipeline

The pipeline syncs event data from the Riot Games API and stores it in GCP Cloud Storage:

#### Architecture

```
Riot Games API (every 20 min) 
    ↓
Vercel Cron Job → /api/sync-event-data
    ↓
GCP Cloud Storage (Source of Truth)
    ├── event_data_current.json (latest data - always fresh)
    └── event_data_YYYY-MM-DD_HH-mm-ss.json (timestamped archives)
    ↓
/api/event-data (NO CACHE - always fetches from GCP)
    ↓
Your Application/Overlays (Real-time data)
```

#### How It Works

1. **Automatic Sync**: Vercel cron job runs every 20 minutes
2. **Data Storage**: 
   - Fetches from `RIOT_API_URL`
   - Saves to `event_data_current.json` in GCP (single source of truth)
   - Creates timestamped archive for history
   - Adds `lastUpdated` and `syncedAt` metadata
3. **Data Delivery**:
   - `/api/event-data` **always** fetches from GCP (no caching)
   - Returns fresh data immediately after sync
   - Falls back to local file only if GCP unavailable
4. **No Local Writes**: Compatible with Vercel's read-only filesystem
5. **Real-time Updates**: Data is available immediately after sync (no cache delays)

#### File Access & Security

Files stored in GCP Cloud Storage are accessible via:
- **Signed URLs**: Temporary secure links (valid for 7 days) - Used by default
- **Public URLs**: Files are uploaded with public read access as a fallback
- Service account needs "Storage Object Creator" and "Storage Object Viewer" permissions

#### Data Sync Triggers

**Automatic (Default)**: 
Vercel cron job runs every 20 minutes (`*/20 * * * *`) automatically pulling fresh data.

**Manual Triggers**:

1. **Web Interface**: Navigate to `/data-sync` and click "Sync Event Data"
2. **API Call**: 
   ```bash
   curl -X POST https://your-domain.vercel.app/api/sync-event-data \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

**Customizing Sync Frequency**:

Edit `vercel.json` to change the schedule:
- Every 10 minutes: `"schedule": "*/10 * * * *"`
- Every 15 minutes: `"schedule": "*/15 * * * *"`
- Every 20 minutes (default): `"schedule": "*/20 * * * *"`
- Every 30 minutes: `"schedule": "*/30 * * * *"`
- Every hour: `"schedule": "0 * * * *"`

### Troubleshooting

#### "Access Denied" Error on GCP Storage Files

**Error**: `Anonymous caller does not have storage.objects.get access`

**Solution**: The application now uses signed URLs (temporary secure links) that work regardless of bucket permissions. The download links in the UI automatically use signed URLs valid for 7 days.

If you still have issues:
- Ensure your service account has "Storage Object Creator" permission
- Files uploaded by the sync endpoint are automatically made publicly readable
- Signed URLs are regenerated each time you view the file list

#### "Unexpected token, not valid JSON" Error

This error typically occurs when:

1. **GCP Service Account Key is incorrectly encoded**
   - Use the provided script: `node scripts/encode-gcp-key.js your-key.json`
   - Ensure no line breaks or extra characters in the environment variable
   - The key must be valid base64-encoded JSON

2. **API Response Issues**
   - Check the Vercel/server logs for detailed error messages
   - Verify the `RIOT_API_URL` environment variable is set correctly
   - The response might be compressed or have encoding issues (now handled automatically)

3. **Environment Variables**
   - Ensure all required variables are set in Vercel dashboard
   - Restart your development server after changing `.env.local`
   - Variables should have no quotes in Vercel (just the raw value)

#### Testing the Sync Endpoint

Test locally to see detailed error logs:
```bash
# Start dev server
npm run dev

# In another terminal, trigger sync
curl -X POST http://localhost:3000/api/sync-event-data \
  -H "Content-Type: application/json"
```

Check the console output for detailed error messages.

#### Data Not Updating?

If you don't see new data after a sync:

1. **Check Response Headers**: The `/api/event-data` endpoint includes helpful headers
   - `X-Data-Source: GCP` means data from Cloud Storage (expected)
   - `X-Data-Source: LOCAL-FALLBACK` means GCP unavailable, using local file
   - `X-Updated` shows when data was last synced
2. **Verify Sync Success**: Check the Data Sync page to confirm new files were created
3. **Check GCP Permissions**: Ensure service account has both "Storage Object Creator" and "Storage Object Viewer"
4. **Check Logs**: 
   - Vercel deployment logs for sync execution
   - Console logs show `[event-data] Fetching latest data from GCP Cloud Storage`
5. **Browser Cache**: Your browser may cache responses - hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
6. **Verify Data**: Check `lastUpdated` and `syncedAt` fields in the API response

**No server-side caching** - data is always fetched fresh from GCP on every request!

---

# OVERLAY JSON STRUCTURE

## Slide 1: Challenges Ranking

Display the challenges for the week

### Data Structure

```json
[
  // The placement is always 1 because we are showing the leading team from each challenge
  {
    "team_id": "TEAM_NOXUS",
    "challenge": "WINS",
    "label": "Wins",
    "score": 1242,
    "placement": 1
  },
  {
    "team_id": "TEAM_NOXUS",
    "challenge": "PORO_SNACKS",
    "label": "Poro snacks",
    "score": 1242,
    "placement": 1
  }
]
```

## Slide 2: Team Players Ranking

Displays player rankings within a team (based on the influencer).

### Data Structure

```json
[
    // Influences from team NOXUS
    {
        "team_id": "TEAM_NOXUS",
        "captain_riot_id": "captainriot_id#EUW"

        // Max 3 objects ( because only 3 players will be displayed)
        "players": [
            {
                "riot_id": "SkiTlletron#EUW",
                "score": 10,
                "placement": 1,
                "icon_url": "url"
            },
            {
                "riot_id": "#EUW",
                "score": 9,
                "placement": 2,
                "icon_url": "url"
            },
            {
                "riot_id": "xLicht#EUW",
                "score": 8,
                "placement": 3,
                "icon_url": "url"
            }
        ]
    },
    // Influencer from team Demacia
    {
        "team_id": "TEAM_DEMACIA",
        "captain_riot_id": "captainriot_id#DEMACIA",
        "players": [
            {
                "riot_id": "SkiTlletron#DEMACIA",
                "score": 10,
                "placement": 1,
                "captain": true,
                "icon_url": "url"
            },
            {
                "riot_id": "#DEMACIA",
                "score": 9,
                "placement": 2,
                "captain": false,
                "icon_url": "url"
            },
            {
                "riot_id": "xLicht#DEMACIA",
                "score": 8,
                "placement": 3,
                "captain": false,
                "icon_url": "url"
            }
        ]
    },
]
```

## Slide 3: Teams placement

Displays the placement of the team within the 3 teams

```json
[
  {
    "team_id": "TEAM_NOXUS",
    "score": 1000,
    "placement": 1,
    "captain_riot_id": "captainriot_id#NOXUS",
    "icon_url": "url"
  },
  {
    "team_id": "TEAM_DEMACIA",
    "score": 900,
    "placement": 2,
    "captain_riot_id": "captainriot_id#DEMACIA",
    "icon_url": "url"
  },
  {
    "team_id": "TEAM_IONIA",
    "score": 800,
    "placement": 3,
    "captain_riot_id": "captainriot_id#IONIA",
    "icon_url": "url"
  }
]
```

## Full JSON Format

A mockup of the full object

```json
{
  "timeframes": [
    // Week 1 - 5
    {
      "active": true,
      "start_date": "01.01.2025",
      "end_date": "01.02.2025",
      "data": {
        // DATA Structure of the (slide 1)
        "challenges": [
          {
            "team_id": "TEAM_NOXUS",
            "challenge": "WINS",
            "label": "Wins",
            "score": 1242,
            "placement": 1,
            "icon_url": "url"
          },
          {
            "team_id": "TEAM_NOXUS",
            "challenge": "PORO_SNACKS",
            "label": "Poro snacks",
            "score": 1242,
            "placement": 1,
            "icon_url": "url"
          } // ...
        ],

        // Data structure of the (slide 2)
        "team_players_ranking": [
          {
            "team_id": "TEAM_NOXUS",
            "captain_riot_id": "captainriot_id#EUW",
            "players": [
              {
                "riot_id": "SkiTlletron#EUW",
                "score": 10,
                "placement": 1,
                "icon_url": "url"
              },
              {
                "riot_id": "#EUW",
                "score": 9,
                "placement": 2,
                "icon_url": "url"
              },
              {
                "riot_id": "xLicht#EUW",
                "score": 8,
                "placement": 3,
                "icon_url": "url"
              }
            ]
          },

          {
            "team_id": "TEAM_DEMACIA",
            "captain_riot_id": "captainriot_id#DEMACIA",
            "players": [
              {
                "riot_id": "SkiTlletron#DEMACIA",
                "score": 10,
                "placement": 1,
                "captain": true,
                "icon_url": "url"
              },
              {
                "riot_id": "#DEMACIA",
                "score": 9,
                "placement": 2,
                "captain": false,
                "icon_url": "url"
              },
              {
                "riot_id": "xLicht#DEMACIA",
                "score": 8,
                "placement": 3,
                "captain": false,
                "icon_url": "url"
              }
            ]
          }
        ],

        // Data structure of the slide 3 
        "teams_ranking": [
          {
            "team_id": "TEAM_NOXUS",
            "score": 1000,
            "placement": 1,
            "captain_riot_id": "captainriot_id#NOXUS",
            "icon_url": "url"
          },
          {
            "team_id": "TEAM_DEMACIA",
            "score": 900,
            "placement": 2,
            "captain_riot_id": "captainriot_id#DEMACIA",
            "icon_url": "url"
          },
          {
            "team_id": "TEAM_IONIA",
            "score": 800,
            "placement": 3,
            "captain_riot_id": "captainriot_id#IONIA",
            "icon_url": "url"
          }
        ]
      }
    }
  ]
}
```
