import Card from '@/components/Card'
import React from 'react'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'
import DemaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import styles from './OverallRanking.module.css'
import { TeamPlayerItem } from '../components/Item'

function OverallRanking() {

	const getFrameBackground = (number: number) => {
		// TODO replace with logic for getting the frame background
		return number === 1 ? NoxusFrame.src : number === 2 ? DemaciaFrame.src : IoniaFrame.src
	}

	return (
		<Card title="GESAMTWERTUNG" subtitle="TEAM RANKING">
			{/* List */}
			<div className={styles.list}>
				{/* Item */}
				{[1, 2, 3].map((number) => (
					<TeamPlayerItem
						key={number}
						rank={number}
						iconUrl="https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png"
						summonerName="ARIANA GRANDE"
						points="1322113123"
						frameBackground={getFrameBackground(number)}
					/>
				))}
			</div>
		</Card>
	)
}

export default OverallRanking