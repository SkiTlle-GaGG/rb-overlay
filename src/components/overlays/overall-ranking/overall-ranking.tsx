import { OverlayCard } from '@/components/common/overlay-card'
import React from 'react'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'
import DemaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import styles from './overall-ranking.module.css'
import { PlayerItem } from '@/components/common/team-player-item/team-player-item'

function OverallRanking() {

	const getFrameBackground = (number: number) => {
		// TODO replace with logic for getting the frame background
		return number === 1 ? NoxusFrame.src : number === 2 ? DemaciaFrame.src : IoniaFrame.src
	}

	return (
		<OverlayCard title="GESAMTWERTUNG" subtitle="TEAM RANKING">
			{/* List */}
			<div className={styles.list}>
				{/* Item */}
				{[1, 2, 3].map((number) => (
					<PlayerItem
						key={number}
						rank={number}
						iconUrl="https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png"
						summonerName={"ARIANA GRANDE" + number}
						points={number * 1000}
						frameBackground={getFrameBackground(number)}
						label={number === 1 ? "DEMACIA" : number === 2 ? "IONIA" : "NOXUS"}
					/>
				))}
			</div>
		</OverlayCard>
	)
}

export default OverallRanking