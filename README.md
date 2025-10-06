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
