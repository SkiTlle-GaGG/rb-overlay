import React from 'react'
import TeamPlayersRanking from '@/components/slides/TeamPlayersRanking/TeamPlayersRanking'
import { TeamColor } from '@/components/Card'

function TeamPlayersRankingPage() {
  return (
    <div>
      <TeamPlayersRanking teamColor={TeamColor.NOXUS} />
    </div>
  )
}

export default TeamPlayersRankingPage
