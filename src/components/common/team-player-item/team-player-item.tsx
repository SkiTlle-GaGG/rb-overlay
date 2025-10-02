import React from 'react'
import Image from 'next/image'

export interface PlayerItemProps {
	rank: number
	iconUrl: string
	summonerName: string
	points: number | string
	frameBackground: string
}

export function PlayerItem({
	rank,
	iconUrl,
	summonerName,
	points,
	frameBackground,
}: PlayerItemProps) {
	return (
		<div
			className={'flex align-center justify-between p-2 rounded-lg text-white'}
			style={{
				backgroundImage: `url(${frameBackground})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="flex align-center gap-2">
				{/* Number */}
				<p className="text-white flex items-center justify-center font-redbull-cond-bold h-auto text-[14px]">
					{String(rank).padStart(2, '0')}
				</p>

				{/* Icon */}
				<div>
					<Image
						src={iconUrl}
						alt="Icon"
						width={50}
						height={50}
						className="object-cover rounded-full h-10 w-10"
					/>
				</div>

				{/* Summoner */}
				<div>
					<p className="font-redbull-book text-[12px]">SUMMONER</p>
					<p className="font-redbull-cond-bold text-[12px]">{summonerName}</p>
				</div>
			</div>
			<div className="text-right h-full flex flex-col justify-between">
				<p className="font-redbull-book text-[12px]">PUNKTE</p>
				<p className="font-redbull-cond-bold text-[12px]">{points}</p>
			</div>
		</div>
	)
}