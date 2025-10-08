'use client'

import { AnimatePresence, motion } from "motion/react"
import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
import { TeamPlayersRankingData } from '@/types/overlay-data'
import { TeamEnum, TeamType } from '@/types/team'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './streamer-overlay-style.module.css'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



function ObsessOverlayMotion() {

    // Get url param "dev"
    const [isDev, setIsDev] = useState<boolean>(false);

    const [showCardIndex, setShowCardIndex] = useState<number>(-1)
    const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState<number>(0)
    const [eventData, setEventData] = useState(null);
    const [errorsPresent, setErrorsPresent] = useState<boolean>(false)

    const [FIRST_START_TIME_IN_SECONDS, setFIRST_START_TIME_IN_SECONDS] = useState<number>(0 * 60);
    const [SECOND_START_TIME_IN_SECONDS, setSECOND_START_TIME_IN_SECONDS] = useState<number>(31 * 60);
    const [OVERLAY_DURATION_IN_SECONDS, setOVERLAY_DURATION_IN_SECONDS] = useState<number>(30);
    const [OVERLAYS_COUNT, setOVERLAYS_COUNT] = useState<number>(4);
    
    const OVERLAY_VISIBLE_BETWEEN = [
        [FIRST_START_TIME_IN_SECONDS, FIRST_START_TIME_IN_SECONDS + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT)],
        [SECOND_START_TIME_IN_SECONDS, SECOND_START_TIME_IN_SECONDS + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT)],
    ]

    const getCurrentWeek = (eventData: any) => {
        const timeframes = eventData?.timeframes
        const activeWeek = timeframes?.find((el: any) => el.active)
        if (activeWeek) {
            return activeWeek
        }

        return null;
    }

    const getTeamPlayersRankingForTeam = (teamId: TeamType, currentWeekData: any): any => {
        if (currentWeekData !== null && currentWeekData.team_players_ranking !== null) {
            return currentWeekData.team_players_ranking.find((el: any) => el.team_id === teamId)
        }
        return null;
    }

    const eventDataFormated = useMemo(() => {
        const currentWeek = getCurrentWeek(eventData)

        let challenges: any = [];
        let team_players_ranking: any = [];
        let teams_ranking: any = [];

        if (currentWeek !== null) {
            const weekData = currentWeek.data ?? null;

            if (weekData !== null) {
                challenges = weekData.challenges ?? [];
                team_players_ranking = getTeamPlayersRankingForTeam(TeamEnum.IONIA, weekData) ?? [];
                teams_ranking = weekData.teams_ranking ?? [];
            } else {
                console.error("WEEK_DATA IS NULL", { weekData, eventData })
            }
        } else {
            console.error("CURRENT_WEEK IS NULL FROM", { currentWeek, eventData })
        }

        if (challenges === null || team_players_ranking === null) {
            setErrorsPresent(true)
        }

        console.log(challenges, team_players_ranking, teams_ranking);
        return { challenges, team_players_ranking, teams_ranking }
    }, [eventData])


    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log({ window })
            const urlParams = new URLSearchParams(window.location.search);
            setIsDev(urlParams.has("dev") || urlParams.has("Dev"));

            if(urlParams.has("start_at")) {
                setFIRST_START_TIME_IN_SECONDS(Number(urlParams.get("start_at")) * 60);
            }
            if(urlParams.has("end_at")) {
                setSECOND_START_TIME_IN_SECONDS(Number(urlParams.get("end_at")) * 60);
            }
            if(urlParams.has("duration")) {
                setOVERLAY_DURATION_IN_SECONDS(Number(urlParams.get("duration")));
            }
            if(urlParams.has("overlays_count")) {
                setOVERLAYS_COUNT(Number(urlParams.get("overlays_count")));
            }
        }

        // Fetching event data
        fetch('/api/event-data')
            .then(res => res.json())
            .then(setEventData)

        setInterval(() => {
            // Fetching event data
            fetch('/api/event-data')
                .then(res => res.json())
                .then(setEventData)
        }, 1000 * 5)

        // Setting timer
        setInterval(() => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            setCurrentTimeInSeconds(minutes * 60 + seconds)
        }, 1000)
    }, [])


    const overlayVisible = useMemo(() => {

        let visible = false;
        if (currentTimeInSeconds >= FIRST_START_TIME_IN_SECONDS && currentTimeInSeconds <= FIRST_START_TIME_IN_SECONDS + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT)) {
            visible = true;
        }
        if (currentTimeInSeconds >= SECOND_START_TIME_IN_SECONDS && currentTimeInSeconds <= SECOND_START_TIME_IN_SECONDS + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT)) {
            visible = true;
        }

        return visible;
    }, [currentTimeInSeconds]);

    useEffect(() => {
        if (overlayVisible) {
            // Find the index of the card that should be displayed within the current Time
            // Each card is shown for OVERLAY_DURATION_IN_SECONDS, cycling through 3 cards per visible period
            const periodStarts = [FIRST_START_TIME_IN_SECONDS, SECOND_START_TIME_IN_SECONDS];
            let foundIndex = -1;
            for (let i = 0; i < periodStarts.length; i++) {
                const start = periodStarts[i];
                const end = start + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT);
                if (currentTimeInSeconds >= start && currentTimeInSeconds < end) {
                    foundIndex = Math.floor((currentTimeInSeconds - start) / OVERLAY_DURATION_IN_SECONDS);
                    break;
                }
            }
            setShowCardIndex(foundIndex);
        } else {
            setShowCardIndex(-1);
        }
    }, [currentTimeInSeconds])


    const INITIAL_CARD_X_COORDINATE = -500
    return (
        <>

            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

                {/* Dev TOOLS */}
                <div className="absolute top-0 right-100">
                    {isDev &&
                        <>
                            <Input className=" w-48" type="number" value={showCardIndex} onChange={(e) => setShowCardIndex(Number(e.target.value))} />

                            <div className="w-48">
                                {JSON.stringify({ overlayVisible, OVERLAY_VISIBLE_BETWEEN })} {currentTimeInSeconds}
                            </div>
                        </>
                    }
                </div>

                <div className="absolute top-0 left-0">
                    <AnimatePresence >
                        {showCardIndex === 0 && (
                            <motion.div
                                initial={{ x: INITIAL_CARD_X_COORDINATE }}
                                animate={{ x: 0 }}
                                exit={{ x: INITIAL_CARD_X_COORDINATE }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <ChallengesRanking challenges={eventDataFormated.challenges} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute top-0 left-0">
                    <AnimatePresence>
                        {showCardIndex === 1 && (
                            <motion.div
                                initial={{ x: INITIAL_CARD_X_COORDINATE }}
                                animate={{ x: 0 }}
                                exit={{ x: INITIAL_CARD_X_COORDINATE }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <TeamPlayersRanking data={eventDataFormated.team_players_ranking} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute top-0 left-0">
                    <AnimatePresence>
                        {showCardIndex === 2 && (
                        <motion.div
                            initial={{ x: INITIAL_CARD_X_COORDINATE }}
                            animate={{ x: 0 }}
                            exit={{ x: INITIAL_CARD_X_COORDINATE }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                                <OverallRanking teams={eventDataFormated.teams_ranking} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {
                    showCardIndex === 3 && (
                        <div className="absolute top-[-350px] left-0">
                            <video src={'/rb-video-obsess.webm'} autoPlay muted />
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default ObsessOverlayMotion