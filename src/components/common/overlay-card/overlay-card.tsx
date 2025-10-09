'use client'

import React, { useEffect, useState } from 'react'
import CardBg from '@/assets/img/card_bg_new.png'
import Image from 'next/image'
import RbLogo from '@/assets/img/rb_logo.png'
import styles from './overlay-card.module.css'
import FtwLogo from '@/assets/img/ftw-logo-offwhite.png'
import FtwLogoSvg from '@/assets/img/ftw-logo.svg'

export enum TeamColor {
	DEMACIA = 'demacia',
	NOXUS = 'noxus',
	IONIA = 'ionia',
}

export interface OverlayCardProps {
	children: React.ReactNode
	title: string
	subtitle: string
	color?: TeamColor
}

export default function OverlayCard({
	children,
	title,
	subtitle,
	color = TeamColor.NOXUS,
}: OverlayCardProps) {
	const [textColor, setTextColor] = useState('white')

	useEffect(() => {
		if (color) {
			switch (color) {
				case TeamColor.DEMACIA:
					setTextColor('var(--color-demacia)')
					break
				case TeamColor.NOXUS:
					setTextColor('var(--color-noxus)')
					break
				case TeamColor.IONIA:
					setTextColor('var(--color-ionia)')
					break
			}
		}
	}, [color])

	return (
		<div
			className={styles.overlayCard}
			// style={{
			// 	backgroundImage: `url(${CardBg.src})`,
			// }}
		>
			<div
				className={styles.cardBgGradient}
				style={{
					background: 'radial-gradient(ellipse 80% 80% at 20% 20%, #11131A 48%, #21253300 100%)',
				}}
			/>

			<div className={styles.cardContent}>
				{/* Header */}
				<div className={styles.cardHeader}>

					<div className={styles.cardTitleContainer}>

						<div className={styles.cardLogoContainer}>
							<Image
								src={RbLogo.src}
								alt="Red Bull Logo"
								className={styles.cardLogo}
								width={100}
								height={100}
							/>
						</div>

						<div className={styles.cardTitleWrapper}>
							<svg className={styles.cardTitle} height={30} width="100%">
								<text
									x="2px"
									y="22px"
									fontFamily="FuturaforRedBull-CondBold"
									fontSize="22"
									fontWeight="bold"
									fill="white"
									stroke={"#383C42"}
									strokeWidth="3"
									paintOrder="stroke"
									textAnchor="start"
									dominantBaseline="middle"
									letterSpacing="2"
								>
									{title}
								</text>
							</svg>
							<div className={"flex gap-1 items-center"}>
								<div>
									<FtwLogoSvg width={80} height={50} />
								</div>
								<div className={"-mt-[2px]"}>
									|
								</div>
								<svg className={styles.cardTitle} height={30} width="100%">
									<text
										x="2px"
										y="17px"
										fontFamily="FuturaforRedBull-CondBold"
										fontSize="18"
										fontWeight="bold"
										fill="#FFF"
										strokeWidth="3"
										paintOrder="stroke"
										textAnchor="start"
										dominantBaseline="middle"
										letterSpacing="2"
										style={{ textTransform: 'uppercase' }}
									>
										{subtitle}
									</text>
								</svg>
							</div>
							{/* <p className={styles.cardSubtitle} style={{ color: "white", marginLeft: '2px' }}>
								{subtitle}
							</p> */}
						</div>
					</div>
				</div>

				<div className={styles.cardContent}>{children}</div>
			</div>
		</div>
	)
}
