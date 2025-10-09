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

The pipeline syncs event data from the Riot Games API:
- **Source**: Configured via `RIOT_API_URL` environment variable
- **Local Storage**: `src/assets/event_data.json`
- **Cloud Storage**: GCP Cloud Storage with timestamped versions

#### File Access & Security

Files stored in GCP Cloud Storage are accessible via:
- **Signed URLs**: Temporary secure links (valid for 7 days) - Used by default
- **Public URLs**: Files are uploaded with public read access as a fallback
- Service account needs "Storage Object Creator" permission

#### Triggering Data Sync

**Option 1: Web Interface** (Recommended)
Navigate to `/data-sync` in your dashboard and click the "Sync Event Data" button.

**Option 2: API Call**
```bash
curl -X POST https://your-domain.vercel.app/api/sync-event-data \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**Option 3: Vercel Cron Job** (Optional)
Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/sync-event-data",
      "schedule": "0 * * * *"
    }
  ]
}
```

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
