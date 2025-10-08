import React from 'react'
import { TeamPlayersRanking } from '@/components/overlays/team-players-ranking'
import { TeamEnum } from '@/types/team'
import { withAuth } from "@/components/hoc";

function TeamPlayersRankingPage() {
  const teamPlayersRankingData = [
    {
      team_id: TeamEnum.DEMACIA,
      captain_riot_id: 'CaptainDemacia#EUW',
      players: [],
    },
    {
      team_id: TeamEnum.IONIA,
      captain_riot_id: 'CaptainIonia#EUW',
      players: [],
    },
    {
      team_id: TeamEnum.NOXUS,
      captain_riot_id: 'CaptainNoxus#EUW',
      players: [],
    },
  ]
  return (
    <div>
      <TeamPlayersRanking data={teamPlayersRankingData} />
    </div>
  )
}

export default withAuth(TeamPlayersRankingPage);
