import React, { useMemo, useState } from 'react'
import Image from 'next/image'

export interface PlayerItemProps {
	rank: number
	iconUrl: string
	summonerName: string
	points: number | string
	frameBackground: string
	label: string
}

export function PlayerItem({
	rank,
	iconUrl,
	summonerName,
	points,
	frameBackground,
	label,
}: PlayerItemProps) {
	const [imgSrc, setImgSrc] = useState(iconUrl);
	const fallbackSrc = "https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/29.png";

	const mappedSummonerName = useMemo(() => {
		if (summonerName === "Karneyney#prime") {
			return "Karni#ionia"
		}
		return summonerName;
	}, [summonerName])

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
						src={imgSrc}
						alt="Icon"
						width={50}
						height={50}
						className="object-cover rounded-full h-10 w-10"
						loading="lazy"
						onLoadingComplete={(result) => {
							if (result.naturalWidth === 0) {
								setImgSrc(fallbackSrc);
							}
						}}
						onError={() => {
							setImgSrc(fallbackSrc);
						}}
					/>
				</div>

				{/* Summoner */}
				<div>
					<p className="font-redbull-book text-[12px]">{label}</p>
					<p className="font-redbull-cond-bold text-[12px]">{mappedSummonerName}</p>
				</div>
			</div>
			<div className="text-right h-full flex flex-col justify-between">
				<p className="font-redbull-book text-[12px]">PUNKTE</p>
				<p className="font-redbull-cond-bold text-[12px]">{points}</p>
			</div>
		</div>
	)
}