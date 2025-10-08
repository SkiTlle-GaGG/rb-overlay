import React, { useEffect } from 'react'
import { OverlayCard } from '@/components/common/overlay-card'
import { TeamEnum, TeamType } from '@/types/team'
import { Challenge } from '@/types/overlay-data'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'
import DemaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import styles from './challenges-ranking.module.css'

interface ChallengesRankingProps {
	challenges: Challenge[]
}

export default function ChallengesRanking({ challenges }: ChallengesRankingProps) {

	const getFrameBackground = (teamId: TeamType) => {
		if (teamId === TeamEnum.DEMACIA) return DemaciaFrame.src
		if (teamId === TeamEnum.IONIA) return IoniaFrame.src
		return NoxusFrame.src
	}

	useEffect(() => {
		// console.log({ challengesProp: challenges })
	}, [])

	return (
		<OverlayCard title="CHALLENGES" subtitle="Team Ranking">
			<div className={styles.challengeStatsHeader}>
				<p className={styles.challengeStatsLabel}>CHALLENGE</p>
				<p className={styles.challengeStatsLabel}>PUNKTE</p>
			</div>
			<div className={styles.challengeStats}>
				{challenges.map((challenge, index) => (
					<div
						key={index}
						className={styles.challengeStatItem}
						style={{
							backgroundImage: `url(${getFrameBackground(challenge.team_id)})`,
						}}
					>
						<p className={styles.challengeStatName}>{challenge.label}</p>
						<p className={styles.challengeStatPoints}>{challenge.score}</p>
					</div>
				))}
			</div>
		</OverlayCard>
	)
}