import { OverlayCard, TeamColor } from '@/components/common/overlay-card'
import React from 'react'
import { PlayerItem } from '@/components/common/team-player-item/team-player-item'
import DemaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'
import { TeamEnum, TeamType } from '@/types/team'
import { TeamPlayersRankingData } from '@/types/overlay-data'

interface TeamPlayersRankingProps {
  data: TeamPlayersRankingData
}

function TeamPlayersRanking({ data }: TeamPlayersRankingProps) {

  const getFrameBackground = (teamId: TeamType) => {
    if (teamId === TeamEnum.DEMACIA) return DemaciaFrame.src
    if (teamId === TeamEnum.IONIA) return IoniaFrame.src
    return NoxusFrame.src
  }

  const getTeamColor = (teamId: TeamType): TeamColor => {
    if (teamId === TeamEnum.DEMACIA) return TeamColor.DEMACIA
    if (teamId === TeamEnum.IONIA) return TeamColor.IONIA
    return TeamColor.NOXUS
  }

  const getTeamName = (teamId: TeamType) => {
    if (teamId === TeamEnum.DEMACIA) return 'TEAM DEMACIA'
    if (teamId === TeamEnum.IONIA) return 'TEAM IONIA'
    return 'TEAM NOXUS'
  }

	return (
    <OverlayCard
      title={getTeamName(data.team_id)}
      subtitle="TOP SPIELER"
      color={getTeamColor(data.team_id)}
    >
      {/* List */}
      <div className={'flex flex-col gap-4 font-redbull-book text-[12px]'}>
        {data.players.map((player, index) => {
          return (
            <PlayerItem
              key={index}
              rank={player.placement}
              iconUrl={player.icon_url}
              summonerName={player.riot_id}
              label={player.captain ? 'CAPTAIN' : 'SUMMONER'}
              points={player.score}
              frameBackground={getFrameBackground(data.team_id)}
            />
          )
        })}
      </div>
		</OverlayCard>
	)
}

export default TeamPlayersRanking
