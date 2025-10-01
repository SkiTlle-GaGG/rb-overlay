import { OverlayCard, TeamColor } from '@/components/common/overlay-card'
import React from 'react'
import DamaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import { TeamPlayerItem } from '@/components/common/team-player-item'
import { PlayerItem } from '@/components/common/team-player-item/team-player-item'

function TeamPlayersRanking({ teamColor }: { teamColor: TeamColor }) {
  const frame =
    teamColor === TeamColor.DEMACIA
      ? DamaciaFrame.src
      : teamColor === TeamColor.NOXUS
        ? NoxusFrame.src
        : IoniaFrame.src

	return (
		<OverlayCard title="TEAM OBSESSS" subtitle="TOP SPIELER" color={teamColor}>
      {/* List */}
      <div
        className={'flex flex-col gap-4 font-redbull-book text-[12px]'}
      >
        {[1, 2, 3].map((number) => (
          <PlayerItem
            key={number}
            rank={number}
            iconUrl="https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png"
            summonerName="ARIANA GRANDE"
            points="1322113123"
            frameBackground={frame}
          />
        ))}
      </div>
		</OverlayCard>
	)
}

export default TeamPlayersRanking;
