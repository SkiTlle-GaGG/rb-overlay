import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
import { TeamPlayersRankingData } from '@/types/overlay-data'
import { TeamEnum } from '@/types/team'
import React from 'react'

function Obsess() {

  const challengesData = [
    {
      team_id: TeamEnum.NOXUS,
      challenge: 'WINS',
      label: 'Wins',
      score: 1242,
      placement: 1,
    },
    {
      team_id: TeamEnum.IONIA,
      challenge: 'PORO_SNACKS',
      label: 'Poro snacks',
      score: 1100,
      placement: 1,
    },
    {
      team_id: TeamEnum.DEMACIA,
      challenge: 'TAKEDOWNS',
      label: '40+ Takedowns',
      score: 980,
      placement: 1,
    },
    {
      team_id: TeamEnum.IONIA,
      challenge: 'DAMAGE',
      label: 'XK Damage',
      score: 1500,
      placement: 1,
    },
  ]

  // Slide 2: Team Players Ranking Data
  const teamPlayers: TeamPlayersRankingData[] = [
    {
      team_id: TeamEnum.DEMACIA,
      captain_riot_id: 'CaptainIonia#EUW',
      players: [
        {
          riot_id: 'SkiTlletron#EUW',
          score: 1500,
          placement: 1,
          icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
          captain: true,
        },
        {
          riot_id: 'PlayerTwo#EUW',
          score: 1200,
          placement: 2,
          icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
          captain: false,
        },
        {
          riot_id: 'xLicht#EUW',
          score: 1000,
          placement: 3,
          icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
          captain: false,
        },
      ],
    }
  ]

  // Slide 3: Overall Ranking (Teams Placement) Data
  const teamsRankingData = [
    {
      team_id: TeamEnum.NOXUS,
      score: 10000,
      placement: 1,
      captain_riot_id: 'CaptainNoxus#EUW',
      icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
    },
    {
      team_id: TeamEnum.DEMACIA,
      score: 9000,
      placement: 3,
      captain_riot_id: 'CaptainDemacia#EUW',
      icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
    },
    {
      team_id: TeamEnum.IONIA,
      score: 8000,
      placement: 2,
      captain_riot_id: 'CaptainIonia#EUW',
      icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
    },
  ]

  return (
    <div className="flex gap-4">
      <div>
        <ChallengesRanking challenges={challengesData} />
      </div>

      <div>
        <TeamPlayersRanking data={teamPlayers.find(el => el.team_id === TeamEnum.DEMACIA)!} />
      </div>

      <div>
        <OverallRanking teams={teamsRankingData} />
      </div>

    </div>
  )
}

export default Obsess