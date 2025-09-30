import Card from '@/components/Card'
import Image from 'next/image'
import React from 'react'
import NoxusFrame from '@/assets/img/team/noxus/noxus_frame.png'
import DemaciaFrame from '@/assets/img/team/Demacia/demacia_frame.png'
import IoniaFrame from '@/assets/img/team/ionia/ionia_frame.png'
import styles from './OverallRanking.module.css'

function OverallRanking() {
	return (
		<Card title="GESAMTWERTUNG" subtitle="TEAM RANKING">
			{/* List */}
			<div className={styles.list}>
				{/* Item */}
				{['NOXUS', 'DEMACIA', 'IONIA'].map((team, index) => (
					<div
						key={team}
						className={styles.item}
						style={{
							backgroundImage: `url(${team === 'NOXUS' ? NoxusFrame.src : team === 'DEMACIA' ? DemaciaFrame.src : IoniaFrame.src})`,
						}}
					>
						<div className={styles.leftSection}>
							{/* Number */}
							<p className={styles.number}>0{index + 1}</p>

						{/* Icon */}
						<div>
							<Image
								src={
									'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png'
								}
								alt="Icon"
								width={50}
								height={50}
								className={styles.icon}
							/>
						</div>

						{/* Summoner */}
						<div>
								<p className={styles.label}>{team}</p>
								<p className={styles.summonerName}>ARIANA GRANDE</p>
							</div>
						</div>
						<div className={styles.rightSection}>
							<p className={styles.label}>PUNKTE</p>
							<p className={styles.points}>1322113123</p>
						</div>
					</div>
				))}
			</div>
		</Card>
	)
}

export default OverallRanking