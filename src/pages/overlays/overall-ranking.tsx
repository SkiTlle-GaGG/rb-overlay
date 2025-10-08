import React from 'react'
import { OverallRanking } from '@/components/overlays/overall-ranking'
import { TeamEnum } from '@/types/team'
import { withAuth } from "@/components/hoc";

function OverallRankingPage() {
  const teamsRankingData = [
    {
      team_id: TeamEnum.NOXUS,
      score: 10000,
      placement: 1,
      captain_riot_id: 'CaptainNoxus#EUW',
      icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
    },
  ]
  return (
    <div>
      <OverallRanking teams={teamsRankingData} />
    </div>
  )
}

export default withAuth(OverallRankingPage);