import React, { useEffect, useMemo, useState } from "react";
import { OverlayCard } from "@/components/common/overlay-card";
import { TeamEnum, TeamType } from "@/types/team";
import { Challenge } from "@/types/overlay-data";
import NoxusFrame from "@/assets/img/team/noxus/noxus_frame.png";
import DemaciaFrame from "@/assets/img/team/Demacia/demacia_frame.png";
import IoniaFrame from "@/assets/img/team/ionia/ionia_frame.png";
import styles from "./challenges-ranking.module.css";
import { motion, AnimatePresence } from "motion/react";
import EventProcessor from "@/lib/event-processor";

const INITIAL_CARD_X_COORDINATE = -500;
const SCORE_ANIMATION_DURATION = 3000; // 2 seconds to show difference
const SCORE_UPDATE_DELAY = 300; // 0.5 seconds delay before showing difference


const getFrameBackground = (teamId: TeamType) => {
  if (teamId.toUpperCase() === TeamEnum.DEMACIA) return DemaciaFrame.src;
  if (teamId.toUpperCase() === TeamEnum.IONIA) return IoniaFrame.src;
  return NoxusFrame.src;
};


const ChallengeLabelsToText = (challengeLabel: string) => {
  const labelToTextMap = {
    dragonTakedowns: "Drachen Takedowns",
    quadraKills: "Vierfachtötungen",
    totalDamageDealtToChampions: "Schaden an Champions",
    GamesPlayed: "Spiele gespielt",
  };

  if (!Object.keys(labelToTextMap).includes(challengeLabel)) {
    return "Challenge";
  } else {
    return labelToTextMap[challengeLabel as keyof typeof labelToTextMap];
  }
};


interface ChallengesRankingProps {
  challenges: Challenge[];
  displayCard: boolean;
}

interface ScoreAnimationState {
  currentScore: number;
  newScore: number;
  difference: number;
  isAnimating: boolean;
  showDifference: boolean;
}

export default function ChallengesRanking({
  challenges,
  displayCard
}: ChallengesRankingProps) {

  const [challengesCurrentState, setChallengesCurrentState] = useState<Challenge[] | []>([]);
  const [scoreAnimations, setScoreAnimations] = useState<ScoreAnimationState[]>([]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    setChallengesCurrentState(prev => {
      const currentState = [...prev];
      const newChallengesState = [...challenges ?? []];

      const hasChanged = EventProcessor.hasChallengesRankingChanged(currentState, newChallengesState);

      if (hasChanged) {
        setHasChanges(true);

        // Initialize score animations for each challenge
        const newAnimations: ScoreAnimationState[] = newChallengesState.map((newChallenge, index) => {
          const currentChallenge = currentState[index];
          const currentScore = currentChallenge?.score ?? 0;
          const newScore = newChallenge.score;
          const difference = newScore - currentScore;

          return {
            currentScore,
            newScore,
            difference,
            isAnimating: difference !== 0,
            showDifference: false
          };
        });

        setScoreAnimations(newAnimations);

        // Start animation sequence
        setTimeout(() => {
          setScoreAnimations(prev =>
            prev.map(anim => ({ ...anim, showDifference: true }))
          );

          // After showing difference, animate to final score
          setTimeout(() => {
            setScoreAnimations(prev =>
              prev.map(anim => ({
                ...anim,
                showDifference: false,
                isAnimating: false,
                currentScore: anim.newScore
              }))
            );
          }, SCORE_ANIMATION_DURATION);
        }, SCORE_UPDATE_DELAY);
      }

      return challenges ?? []
    });
  }, [challenges]);

  return (
    <AnimatePresence>
      {displayCard && (
        <motion.div
          key="challenge-ranking-card"
          initial={{ x: INITIAL_CARD_X_COORDINATE }}
          animate={{ x: 0 }}
          exit={{ x: INITIAL_CARD_X_COORDINATE }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <OverlayCard title="CHALLENGES" subtitle="Team Ranking">
            <div className={styles.challengeStatsHeader}>
              <svg className={styles.cardTitle} height={30} width="100%">
                <text
                  x="2px"
                  y="18px"
                  fontFamily="FuturaforRedBull-CondBold"
                  fontSize="14"
                  fontWeight="bold"
                  fill="white"
                  stroke={"#383C42"}
                  strokeWidth="3"
                  paintOrder="stroke"
                  textAnchor="start"
                  dominantBaseline="middle"
                  letterSpacing="2"
                >
                  CHALLENGES
                </text>
              </svg>

              <svg className={styles.cardTitle} height={30} width="100%">
                <text
                  x="80px"
                  y="18px"
                  fontFamily="FuturaforRedBull-CondBold"
                  fontSize="14"
                  fontWeight="bold"
                  fill="white"
                  stroke={"#383C42"}
                  strokeWidth="3"
                  paintOrder="stroke"
                  textAnchor="start"
                  dominantBaseline="middle"
                  letterSpacing="2"
                >
                  PUNKTE
                </text>
              </svg>
            </div>
            <div className={styles.challengeStats}>
              {challengesCurrentState.map((challenge, index) => {
                const scoreAnimation = scoreAnimations[index];
                const displayScore = scoreAnimation?.currentScore ?? challenge.score;
                const showDifference = scoreAnimation?.showDifference && scoreAnimation?.difference !== 0;

                return (
                  <div
                    key={index}
                    className={styles.challengeStatItem}
                    style={{
                      backgroundImage: `url(${getFrameBackground(
                        challenge.team_name as TeamType
                      )})`,
                    }}
                  >
                    <p className={styles.challengeStatName}>
                      {ChallengeLabelsToText(challenge.label)}
                    </p>
                    <div className={styles.challengeStatPoints}>
                      <motion.p
                        animate={{
                          scale: showDifference ? 1.1 : 1,
                          color: showDifference ? "#00ff00" : "white"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {displayScore}
                      </motion.p>

                      {showDifference && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={styles.scoreDifference}
                        >
                          +{scoreAnimation.difference}
                        </motion.p>
                      )}

                    </div>
                  </div>
                )
              })}
            </div>
          </OverlayCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}