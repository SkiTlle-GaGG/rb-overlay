import { OverlayCard } from '@/components/common/overlay-card'
import React, { useMemo } from 'react'
import styles from './overall-ranking.module.css'
import { PlayerItem } from '@/components/common/team-player-item/team-player-item'
import { TeamEnum, TeamType } from '@/types/team'
import { TeamRanking } from '@/types/overlay-data'
import DemaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'

interface OverallRankingProps {
	teams: TeamRanking[]
}

function OverallRanking({ teams }: OverallRankingProps) {
	const getFrameBackground = (teamId: TeamType) => {
		if (teamId === TeamEnum.DEMACIA) return DemaciaFrame.src
		if (teamId === TeamEnum.IONIA) return IoniaFrame.src
		return NoxusFrame.src
	}

	const getTeamLabel = (teamId: TeamType) => {
		if (teamId === TeamEnum.DEMACIA) return 'DEMACIA'
		if (teamId === TeamEnum.IONIA) return 'IONIA'
		return 'NOXUS'
	}

	const teamsData = useMemo(() => {
		console.log({ teams })
		return teams ?? []
	}, [teams])
	return (
		<OverlayCard title="GESAMTWERTUNG" subtitle="TEAM RANKING">
			{/* List */}
			<div className={styles.list}>
				{/* Item */}
				{teamsData.map((team, index) => (
					<PlayerItem
						key={index}
						rank={team.placement}
						iconUrl={team.icon_url}
						summonerName={team.captain_riot_id}
						points={team.score}
						frameBackground={getFrameBackground(team.team_id)}
						label={getTeamLabel(team.team_id)}
					/>
				))}
			</div>
		</OverlayCard>
	)
}

export default OverallRanking