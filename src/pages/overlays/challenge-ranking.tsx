import React from 'react'
import { ChallengesRanking } from '@/components/overlays/challenges-ranking'
import { TeamEnum } from '@/types/team'

function ChallengeRankingPage() {
  const stats = [
    { name: 'WINS', points: 1242, team: TeamEnum.NOXUS },
    { name: 'PORO SNAX', points: 242461123, team: TeamEnum.NOXUS },
    { name: 'Quadras', points: 563626234324, team: TeamEnum.IONIA },
    { name: '40+ Takedowns', points: 12123123, team: TeamEnum.NOXUS },
    { name: 'XK Damage', points: 674573545234, team: TeamEnum.DEMACIA },
  ]
  return (
    <div className="overlay-container">
      <ChallengesRanking stats={stats} />
    </div>
  )
}

export default ChallengeRankingPage
