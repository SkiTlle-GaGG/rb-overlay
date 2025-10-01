import React from 'react'
import { TeamPlayersRanking } from '@/components/overlays/team-players-ranking'
import { TeamColor } from '@/components/common/overlay-card'

function TeamPlayersRankingPage() {
  return (
    <div>
      <TeamPlayersRanking teamColor={TeamColor.DEMACIA} />
    </div>
  )
}

export default TeamPlayersRankingPage
