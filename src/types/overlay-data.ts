import { TeamType } from './team'

// Slide 1: Challenges Ranking
export interface Challenge {
	team_id: TeamType
	challenge: string
	label: string
	score: number
	placement: number
}

// Slide 2: Overall Ranking (Teams Placement)
export interface TeamRanking {
	team_id: TeamType
	score: number
	placement: number
	captain_riot_id: string
	icon_url: string
}

// Slide 3: Team Players Ranking
export interface Player {
	riot_id: string
	score: number
	placement: number
	icon_url: string
	captain?: boolean
}

export interface TeamPlayersRankingData {
	team_id: TeamType
	captain_riot_id: string
	players: Player[]
}

// Full JSON Structure
export interface TimeframeData {
	challenges: Challenge[]
	team_players_ranking: TeamPlayersRankingData[]
	teams_ranking: TeamRanking[]
}

export interface Timeframe {
	active: boolean
	start_date: string
	end_date: string
	data: TimeframeData
}

export interface EventData {
	timeframes: Timeframe[]
}

