import React from 'react'
import Image from 'next/image'

interface Player {
	summoner_name: string
	stats: number
	placement_in_team: number
	captain: boolean
}

interface DemaciaCardProps {
	teamName: string
	players: Player[]
}

export default function DemaciaCard({ teamName, players }: DemaciaCardProps) {
	return (
		<div className="demacia-card relative w-[400px] h-[600px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg overflow-hidden shadow-2xl">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-20">
				<div className="w-full h-full bg-gradient-to-br from-gray-500/30 to-gray-800/30"></div>
			</div>
			
			{/* Header Section */}
			<div className="relative z-10 p-6">
				{/* Team Logo and Name */}
				<div className="flex items-center justify-center mb-4">
					<div className="flex items-center space-x-3">
						{/* Team Crest Icon */}
						<div className="w-12 h-12 relative">
							<Image
								src="/src/assets/img/team/Demacia/crest_icon.png"
								alt="Demacia Crest"
								fill
								className="object-contain"
							/>
						</div>
						<div className="text-center">
							<h1 className="text-white text-2xl font-bold drop-shadow-lg">
								{teamName}
							</h1>
							<p className="text-gray-300 text-sm">TOP SPIELER</p>
						</div>
					</div>
				</div>

				{/* Players List */}
				<div className="space-y-3">
					{players.map((player, index) => (
						<div
							key={player.summoner_name}
							className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 border border-gray-600/50"
						>
							<div className="flex items-center space-x-4">
								{/* Player Rank */}
								<div className="flex-shrink-0">
									<div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
										<span className="text-white font-bold text-sm">
											{String(player.placement_in_team).padStart(2, '0')}
										</span>
									</div>
								</div>

								{/* Player Avatar */}
								<div className="flex-shrink-0">
									<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
										<Image
											src="/src/assets/img/team/Demacia/crest_icon.png"
											alt="Player Avatar"
											width={48}
											height={48}
											className="object-cover"
										/>
									</div>
								</div>

								{/* Player Info */}
								<div className="flex-1 min-w-0">
									<p className="text-gray-300 text-xs uppercase tracking-wide">SUMMONER</p>
									<p className="text-white font-bold text-lg truncate">
										{player.summoner_name}
									</p>
								</div>

								{/* Player Stats */}
								<div className="flex-shrink-0 text-right">
									<p className="text-gray-300 text-xs uppercase tracking-wide">PUNKTE</p>
									<p className="text-white font-bold text-lg">
										{player.stats.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Red Bull Fractured Alliance Logo */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
				<div className="flex flex-col items-center">
					{/* Crystal Formation */}
					<div className="w-16 h-8 bg-blue-400 rounded-t-full mb-2"></div>
					
					{/* Red Bull Logo */}
					<div className="flex items-center space-x-2 mb-2">
						<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
							<span className="text-white text-xs font-bold">RB</span>
						</div>
						<span className="text-white font-bold text-sm">Red Bull</span>
					</div>
					
					{/* Fractured Alliance Text */}
					<div className="bg-yellow-600/90 px-3 py-1 rounded text-xs font-bold text-white">
						FRACTURED ALLIANCE
					</div>
				</div>
			</div>
		</div>
	)
}
