'use client'

import { ChallengesRanking, OverallRanking, TeamPlayersRanking } from '@/components/overlays'
import { SlideIn, SlideInStatus } from '@/components/common'
import { TeamPlayersRankingData } from '@/types/overlay-data'
import { TeamEnum } from '@/types/team'
import React, { useEffect, useMemo, useState } from 'react'
import { SlideInStatusEnum } from '@/components/common/slide-in/slide-in'

interface CurrentTimeData {
    minute: number
    second: number
    millisecond: number
}

const MAX_MINUTE_OVERLAY_VISIBLE = 1;

const FIRST_SLIDE_START_TIME = [21, 30];
const SECOND_SLIDE_START_TIME = [FIRST_SLIDE_START_TIME[0] + MAX_MINUTE_OVERLAY_VISIBLE, FIRST_SLIDE_START_TIME[1] + MAX_MINUTE_OVERLAY_VISIBLE];
const THIRD_SLIDE_START_TIME = [SECOND_SLIDE_START_TIME[0] + MAX_MINUTE_OVERLAY_VISIBLE, SECOND_SLIDE_START_TIME[1] + MAX_MINUTE_OVERLAY_VISIBLE];


function ObsessOverlay() {
    const [cardStates, setCardStates] = useState<SlideInStatus[]>(['hidden', 'hidden', 'hidden'])
    // [minutes, seconds, milliseconds]
    const [currentDate, setCurrentTime] = useState<Date>(new Date())

    const currentTimeData = useMemo<CurrentTimeData>(() => {
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();
        const millisecond = currentDate.getMilliseconds();
        // console.log({ minute, second, millisecond })
        return { minute, second, millisecond }
    }, [currentDate])

    // Start timer
    useEffect(() => {
        setInterval(() => {
            const now = new Date()
            setCurrentTime(now)
        }, 1000)
    }, [])

    const shouldDisplayOverlay = useMemo(() => {
        const currentMinute = currentTimeData.minute;

        const showFirstSlide = (currentMinute >= FIRST_SLIDE_START_TIME[0] && currentMinute < SECOND_SLIDE_START_TIME[0]) || (currentMinute >= FIRST_SLIDE_START_TIME[1] && currentMinute < SECOND_SLIDE_START_TIME[1]);
        const showSecondSlide = (currentMinute >= SECOND_SLIDE_START_TIME[0] && currentMinute < THIRD_SLIDE_START_TIME[0]) || (currentMinute >= SECOND_SLIDE_START_TIME[1] && currentMinute < THIRD_SLIDE_START_TIME[1]);
        const showThirdSlide = (currentMinute >= THIRD_SLIDE_START_TIME[0] && currentMinute < THIRD_SLIDE_START_TIME[0] + MAX_MINUTE_OVERLAY_VISIBLE) || (currentMinute >= THIRD_SLIDE_START_TIME[1] && currentMinute < THIRD_SLIDE_START_TIME[1] + MAX_MINUTE_OVERLAY_VISIBLE);
        return { showFirstSlide, showSecondSlide, showThirdSlide };
    }, [currentTimeData])


    // Slide in/out animations
    useEffect(() => {
        // ========== CONFIGURATION ==========
        const { showFirstSlide, showSecondSlide, showThirdSlide } = shouldDisplayOverlay;
        console.log(...cardStates);

        if (showFirstSlide) {
            const firstSlideStatus = cardStates[0];

            switch (firstSlideStatus) {
                case SlideInStatusEnum.VISIBLE:
                    return;
                case SlideInStatusEnum.HIDDEN:
                    setCardStates([SlideInStatusEnum.SLIDING_IN, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN])
                    break;
                case SlideInStatusEnum.SLIDING_IN:
                    setCardStates([SlideInStatusEnum.VISIBLE, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN])
                    break;
            }

        } else if (showSecondSlide) {

            const firstSlideStatus = cardStates[0];

            if (firstSlideStatus === SlideInStatusEnum.VISIBLE) {
                setCardStates([SlideInStatusEnum.SLIDING_OUT, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN])
                setTimeout(() => {
                    setCardStates([SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN])
                }, 800)
            }

            const secondSlideStatus = cardStates[1];
            switch (secondSlideStatus) {
                case SlideInStatusEnum.VISIBLE:
                    return;
                case SlideInStatusEnum.HIDDEN:
                    setCardStates([SlideInStatusEnum.HIDDEN, SlideInStatusEnum.SLIDING_IN, SlideInStatusEnum.HIDDEN])
                    break;
                case SlideInStatusEnum.SLIDING_IN:
                    setCardStates([SlideInStatusEnum.HIDDEN, SlideInStatusEnum.VISIBLE, SlideInStatusEnum.HIDDEN])
                    break;
            }

        } else if (showThirdSlide) {

            const thirdSlideStatus = cardStates[2];

            switch (thirdSlideStatus) {
                case SlideInStatusEnum.VISIBLE:
                    return;
                case SlideInStatusEnum.HIDDEN:
                    setCardStates([SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.SLIDING_IN])
                    break;
                case SlideInStatusEnum.SLIDING_IN:
                    setCardStates([SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.VISIBLE])
                    break;
            }

        } else {
            setCardStates([SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN, SlideInStatusEnum.HIDDEN])
        }

    }, [currentTimeData])

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

    // Slide 2: Team Players Ranking Data
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

    // Slide 3: Overall Ranking (Teams Placement) Data
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
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <SlideIn status={cardStates[0]}>
                <ChallengesRanking challenges={challengesData} />
            </SlideIn>

            <SlideIn status={cardStates[1]}>
                <TeamPlayersRanking data={teamPlayers.find(el => el.team_id === TeamEnum.DEMACIA)!} />
            </SlideIn>

            <SlideIn status={cardStates[2]}>
                <OverallRanking teams={teamsRankingData} />
            </SlideIn>
        </div>
    )
}

export default ObsessOverlay