'use client'

import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
import { TeamPlayersRankingData } from '@/types/overlay-data'
import { TeamEnum } from '@/types/team'
import React, { useEffect, useRef, useState } from 'react'
import styles from './streamer-overlay-style.module.css'

function ObsessOverlay() {
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [runId, setRunId] = useState<number>(0)
    const nextStartRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const endRunRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const RUN_DURATION_MS = 96_000
    const TEN_MINUTES_MS = 1 * 60 * 1000

    function getMsUntilNextTenMinuteBoundary(now: Date): number {
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        const ms = now.getMilliseconds()
        const minutesToBoundary = (10 - (minutes % 10)) % 10
        let msUntil = minutesToBoundary * 60 * 1000 - seconds * 1000 - ms
        if (msUntil < 0) msUntil += TEN_MINUTES_MS
        return msUntil
    }

    function startRun() {
        if (endRunRef.current) {
            clearTimeout(endRunRef.current)
            endRunRef.current = null
        }
        // Remount layers to restart CSS animations
        setRunId(prev => prev + 1)
        setIsRunning(true)
        endRunRef.current = setTimeout(() => {
            setIsRunning(false)
        }, RUN_DURATION_MS)

        if (nextStartRef.current) {
            clearTimeout(nextStartRef.current)
            nextStartRef.current = null
        }
        // Schedule the next run exactly 10 minutes after this start
        nextStartRef.current = setTimeout(() => {
            startRun()
        }, TEN_MINUTES_MS)
    }

    useEffect(() => {
        const msUntil = getMsUntilNextTenMinuteBoundary(new Date())
        nextStartRef.current = setTimeout(() => {
            startRun()
        }, msUntil)

        return () => {
            if (nextStartRef.current) clearTimeout(nextStartRef.current)
            if (endRunRef.current) clearTimeout(endRunRef.current)
        }
    }, [])

    const challengesData = [
        {
            team_id: TeamEnum.NOXUS,
            challenge: 'WINS',
            label: 'Wins',
            score: 1242,
            placement: 1,
        },
        {
            team_id: TeamEnum.IONIA,
            challenge: 'PORO_SNACKS',
            label: 'Poro snacks',
            score: 1100,
            placement: 1,
        },
        {
            team_id: TeamEnum.DEMACIA,
            challenge: 'TAKEDOWNS',
            label: '40+ Takedowns',
            score: 980,
            placement: 1,
        },
        {
            team_id: TeamEnum.IONIA,
            challenge: 'DAMAGE',
            label: 'XK Damage',
            score: 1500,
            placement: 1,
        },
    ]

    const teamPlayers: TeamPlayersRankingData[] = [
        {
            team_id: TeamEnum.DEMACIA,
            captain_riot_id: 'CaptainIonia#EUW',
            players: [
                {
                    riot_id: 'SkiTlletron#EUW',
                    score: 1500,
                    placement: 1,
                    icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
                    captain: true,
                },
                {
                    riot_id: 'PlayerTwo#EUW',
                    score: 1200,
                    placement: 2,
                    icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
                    captain: false,
                },
                {
                    riot_id: 'xLicht#EUW',
                    score: 1000,
                    placement: 3,
                    icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
                    captain: false,
                },
            ],
        }
    ]

    const teamsRankingData = [
        {
            team_id: TeamEnum.NOXUS,
            score: 10000,
            placement: 1,
            captain_riot_id: 'CaptainNoxus#EUW',
            icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
        },
        {
            team_id: TeamEnum.DEMACIA,
            score: 9000,
            placement: 3,
            captain_riot_id: 'CaptainDemacia#EUW',
            icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
        },
        {
            team_id: TeamEnum.IONIA,
            score: 8000,
            placement: 2,
            captain_riot_id: 'CaptainIonia#EUW',
            icon_url: 'https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png',
        },
    ]

    return (
        <>
            <div
                className={`${styles.sequenceRoot} ${isRunning ? styles.running : ''}`}
                style={{ position: 'relative', width: '100%', height: '100vh' }}
                key={runId}
            >
                <div className={`${styles.overlayLayer} ${styles.overlayCard1}`}>
                    <ChallengesRanking challenges={challengesData} />
                </div>

                <div className={`${styles.overlayLayer} ${styles.overlayCard2}`}>
                    <TeamPlayersRanking data={teamPlayers.find(el => el.team_id === TeamEnum.DEMACIA)!} />
                </div>

                <div className={`${styles.overlayLayer} ${styles.overlayCard3}`}>
                    <OverallRanking teams={teamsRankingData} />
                </div>
            </div>
        </>
    )
}

export default ObsessOverlay