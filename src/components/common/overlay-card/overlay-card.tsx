'use client'

import React, { useEffect, useState } from 'react'
import CardBg from '@/assets/img/card_bg_new.png'
import Image from 'next/image'
import RbLogo from '@/assets/img/rb_logo.png'
import styles from './overlay-card.module.css'

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
			style={{
				backgroundImage: `url(${CardBg.src})`,
			}}
		>
			{/* Header */}
			<div className={styles.cardHeader}>
				<div className={styles.cardTitleContainer}>
					<div className={styles.cardTitleWrapper}>
						<svg className={styles.cardTitle} height={30}>
							<text
								x="50%"
								y="50%"
								fontFamily="FuturaforRedBull-CondBold"
								fontSize="22"
								fontWeight="bold"
								fill="white"
								stroke={textColor}
								strokeWidth="3"
								paintOrder="stroke"
								textAnchor="middle"
								dominantBaseline="middle"
								letterSpacing="2"
							>
								{title}
							</text>
						</svg>
						<p className={styles.cardSubtitle} style={{ color: textColor }}>
							{subtitle}
						</p>
					</div>
				</div>
			</div>

			<div className={styles.cardContent}>{children}</div>

			<div className={styles.cardLogoContainer}>
				<Image
					src={RbLogo.src}
					alt="Red Bull Logo"
					className={styles.cardLogo}
					width={100}
					height={100}
				/>
			</div>
		</div>
	)
}
