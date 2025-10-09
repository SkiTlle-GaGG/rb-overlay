import { TeamType } from './team'


export interface EventData {
	timeframes: Timeframe[],
	main_leaderboard: any,
	forever_challenge: any
}

export interface Timeframe {
	active: boolean
	start_date: string
	end_date: string
	data: WeekData
}

export interface WeekData {
	challenges: Challenge[]
	team_players_ranking: TeamPlayersRankingData[]
	teams_ranking: TeamRanking[]
}


// Slide 1: Challenges Ranking
export interface Challenge {
	team_id: TeamType,
	team_name: string
	challenge: string
	label: string
	score: number
	placement: number
	icon_url: string,
}


export interface TeamPlayersRankingData {
	team_id: TeamType,
	team_name: string
	captain_riot_id: string
	players: Player[],
}


// Slide 2: Overall Ranking (Teams Placement)
export interface TeamRanking {
	team_id: TeamType
	score: number
	placement: number
	captain_riot_id: string
	icon_url: string
	team_name: string
}

// Slide 3: Team Players Ranking
export interface Player {
	riot_id: string
	score: number
	placement: number
	icon_url: string
	captain?: boolean
}
