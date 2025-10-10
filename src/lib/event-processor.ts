import { Challenge, EventData, TeamPlayersRankingData, TeamRanking, Timeframe, WeekData } from "@/types/overlay-data";
import { TeamType } from "@/types/team";


class EventProcessor {
    eventData: EventData;

    constructor(eventData: EventData) {
        this.eventData = eventData;
    }

    getCurrentTimeframe(): Timeframe | null {
        if (!this.eventData || !this.eventData.timeframes) {
            return null;
        }

        const timeframes = this.eventData?.timeframes ?? [];

        const activeWeek = timeframes?.find((el: any) => el && el.active);

        if (activeWeek) {
            return activeWeek;
        }

        return null;
    }

    getCurrentWeekData(): WeekData | null {
        const currentWeek = this.getCurrentTimeframe();
        return currentWeek?.data ?? null;
    }

    getTeamPlayersRankingForTeam(teamId: TeamType): TeamPlayersRankingData | null {
        const currentWeekData = this.getCurrentWeekData();
        return currentWeekData?.team_players_ranking.find((el: TeamPlayersRankingData) => el.team_id === teamId) ?? null;
    }

    // 
    getChallengesRanking(): Challenge[] {
        const currentWeekData = this.getCurrentWeekData();
        console.log({ currentWeekData })
        return currentWeekData?.challenges ?? [];
    }

    getTeamPlayersRanking(TeamId: TeamType): TeamPlayersRankingData | null {
        const currentWeekData = this.getCurrentWeekData();
        const team_players_ranking = currentWeekData?.team_players_ranking ?? [];
        const team = team_players_ranking.find((el: TeamPlayersRankingData) => el.team_name.toLowerCase() === TeamId.toLowerCase());
        if (!team) {
            console.error("TEAM_NOT_FOUND", { TeamId, team_players_ranking });
            return null;
        }
        return team;
    }

    getTeamsRanking(): TeamRanking[] {
        const currentWeekData = this.getCurrentWeekData();
        return currentWeekData?.teams_ranking ?? [];
    }
}

export default EventProcessor;
