import React, { useEffect, useMemo } from 'react'
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

		if (teamId.toUpperCase() === TeamEnum.DEMACIA) return DemaciaFrame.src
		if (teamId.toUpperCase() === TeamEnum.IONIA) return IoniaFrame.src
		return NoxusFrame.src
	}

	const challengesData = useMemo(() => {
		return challenges ?? []
	}, [challenges])

	return (
		<OverlayCard title="CHALLENGES" subtitle="Team Ranking">
			<div className={styles.challengeStatsHeader}>
				<svg className={styles.cardTitle} height={30} width="100%">
					<text
						x="2px"
						y="18px"
						fontFamily="FuturaforRedBull-CondBold"
						fontSize="14"
						fontWeight="bold"
						fill="white"
						stroke={"#383C42"}
						strokeWidth="3"
						paintOrder="stroke"
						textAnchor="start"
						dominantBaseline="middle"
						letterSpacing="2"
					>
						CHALLENGES
					</text>
				</svg>

				
				<svg className={styles.cardTitle} height={30} width="100%">
					<text
						x="80px"
						y="18px"
						fontFamily="FuturaforRedBull-CondBold"
						fontSize="14"
						fontWeight="bold"
						fill="white"
						stroke={"#383C42"}
						strokeWidth="3"
						paintOrder="stroke"
						textAnchor="start"
						dominantBaseline="middle"
						letterSpacing="2"
					>
						PUNKTE
					</text>
				</svg>
			</div>
			<div className={styles.challengeStats}>
				{challengesData.map((challenge, index) => (
					<div
						key={index}
						className={styles.challengeStatItem}
						style={{
							backgroundImage: `url(${getFrameBackground(challenge.team_name as TeamType)})`,
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