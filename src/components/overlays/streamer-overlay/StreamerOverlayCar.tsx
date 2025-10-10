'use client'

import { AnimatePresence, motion } from "motion/react"
import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
import { Challenge, EventData, TeamPlayersRankingData, TeamRanking } from '@/types/overlay-data'
import { TeamEnum, TeamType } from '@/types/team'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './streamer-overlay-style.module.css'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import EventProcessor from "@/lib/event-processor"

const FIRST_START_TIME_IN_MINUTES_CONST = 0;

export enum STREAMER_VIDEO_SRC {
    OBSSESS = '/rb-video-obsess.webm',
    NOWAY = '/rb-video-noway.webm',
    KARNI = '/rb-video-karni.webm',
}

function ObsessOverlayMotion({teamId, videoSrc}: {teamId: TeamType, videoSrc: STREAMER_VIDEO_SRC}) {

    // Get url param "dev"
    const [isDev, setIsDev] = useState<boolean>(false);

    const [showCardIndex, setShowCardIndex] = useState<number>(-1)
    const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState<number>(0)

    const [FIRST_START_TIME_IN_SECONDS, setFIRST_START_TIME_IN_SECONDS] = useState<number>(FIRST_START_TIME_IN_MINUTES_CONST * 60);
    const [SECOND_START_TIME_IN_SECONDS, setSECOND_START_TIME_IN_SECONDS] = useState<number>(31 * 60);
    const [OVERLAY_DURATION_IN_SECONDS, setOVERLAY_DURATION_IN_SECONDS] = useState<number>(30);
    const [OVERLAYS_COUNT, setOVERLAYS_COUNT] = useState<number>(4);

    const OVERLAY_VISIBLE_BETWEEN = [
        [FIRST_START_TIME_IN_SECONDS, FIRST_START_TIME_IN_SECONDS + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT)],
        [SECOND_START_TIME_IN_SECONDS, SECOND_START_TIME_IN_SECONDS + (OVERLAY_DURATION_IN_SECONDS * OVERLAYS_COUNT)],
    ]

    const [challengesRanking, setChallengesRanking] = useState<Challenge[] | null>(null);
    const [teamPlayersRanking, setTeamPlayersRanking] = useState<TeamPlayersRankingData | null>(null);
    const [overallRanking, setOverallRanking] = useState<TeamRanking[] | null>(null);


    const fetchEventData = (callback: (event: EventData) => void) => {
        fetch('/api/event-data')
            .then(res => res.json())
            .then(callback)
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log({ window })
            const urlParams = new URLSearchParams(window.location.search);
            setIsDev(urlParams.has("dev") || urlParams.has("Dev"));

            if (urlParams.has("start_at")) {
                setFIRST_START_TIME_IN_SECONDS(Number(urlParams.get("start_at")) * 60);
            }
            if (urlParams.has("end_at")) {
                setSECOND_START_TIME_IN_SECONDS(Number(urlParams.get("end_at")) * 60);
            }
            if (urlParams.has("duration")) {
                setOVERLAY_DURATION_IN_SECONDS(Number(urlParams.get("duration")));
            }
            if (urlParams.has("overlays_count")) {
                setOVERLAYS_COUNT(Number(urlParams.get("overlays_count")));
            }
        }

        const setStates = (event: any) => {
            const eventProcessor = new EventProcessor(event);
            const challengesRanking = eventProcessor.getChallengesRanking();
            const teamPlayersRanking = eventProcessor.getTeamPlayersRanking(teamId);
            const teamsRanking = eventProcessor.getTeamsRanking();
            console.log({ challengesRanking, teamPlayersRanking, teamsRanking })
            setChallengesRanking(challengesRanking);
            setTeamPlayersRanking(teamPlayersRanking);
            setOverallRanking(teamsRanking);
        }

        // Fetching event data
        fetchEventData(setStates)

        // Setting interval to fetch event data
        setInterval(() => {
            fetchEventData(setStates)
        }, 1000 * 30)

        // Setting interval to update current time
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
                        <div className="flex flex-col gap-2 my-2">
                            <label className="text-xs">First Start (s)</label>
                            <Input
                                className="w-48"
                                type="number"
                                value={FIRST_START_TIME_IN_SECONDS}
                                onChange={e => setFIRST_START_TIME_IN_SECONDS(Number(e.target.value))}
                            />
                            <Button onClick={() => {
                                navigator.clipboard.writeText(window.location.origin + window.location.pathname)
                            }}>
                                Copy clean link
                            </Button>
                        </div>

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
                                <ChallengesRanking challenges={challengesRanking ?? []} />
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
                                <TeamPlayersRanking data={teamPlayersRanking ?? null} />
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
                                <OverallRanking teams={overallRanking ?? []} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {showCardIndex === 3 &&
                    <div className="absolute left-0">
                        <video src={videoSrc} autoPlay muted />
                    </div>
                }
            </div >
        </>
    )
}

export default ObsessOverlayMotion