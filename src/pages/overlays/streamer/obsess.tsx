import { TeamColor } from '@/components/common/overlay-card'
import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
import { TeamEnum } from '@/types/team'
import React from 'react'

function Obsess() {

  const stats = [
    {
      team: TeamEnum.NOXUS,
      name: 'Wins',
      points: 100,
    },

    {
      team: TeamEnum.IONIA,
      name: 'PORO SNACKS',
      points: 100,
    },
    {
      team: TeamEnum.DEMACIA,
      name: '40+ TAKEDOWNS',
      points: 100,
    },
    {
      team: TeamEnum.IONIA,
      name: 'XK DAMAGE',
      points: 100,
    },

  ]

  const teamColor = TeamColor.IONIA

  return (
    <div className="flex gap-4">
      <div>
        <ChallengesRanking stats={stats} team={teamColor} />
      </div>
      <div>
        <TeamPlayersRanking teamColor={teamColor} />
      </div>
      <div>
        <OverallRanking />
      </div>
    </div>

  )
}

export default Obsess