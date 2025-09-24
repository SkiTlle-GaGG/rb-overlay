import React from "react";
import Card from "../Card";
import { TeamEnum, TeamType } from "@/types/team";
import NoxusFrame from "@/assets/img/team/noxus/noxus_frame.png";
import DemaciaFrame from "@/assets/img//team/Demacia/demacia_frame.png";
import IoniaFrame from "@/assets/img//team/ionia/ionia_frame.png";
import styles from "./ChallengesRankingCard.module.css";

interface ChallengeStat {
  name: string;
  points: number;
  team: TeamType;
}

export default function ChallengesRankingCard({
  stats,
}: {
  stats: ChallengeStat[];
}) {
  return (
    <Card title="CHALLENGES" subtitle="Team Ranking">
      <div className={styles.challengeStatsHeader}>
        <p className={styles.challengeStatsLabel}>CHALLENGE</p>
        <p className={styles.challengeStatsLabel}>PUNKTE</p>
      </div>
      <div className={styles.challengeStats}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={styles.challengeStatItem}
            style={{
              backgroundImage: `url(${
                stat.team === TeamEnum.NOXUS
                  ? NoxusFrame.src
                  : stat.team === TeamEnum.DEMACIA
                  ? DemaciaFrame.src
                  : IoniaFrame.src
              })`,
            }}
          >
            <p className={styles.challengeStatName}>{stat.name}</p>
            <p className={styles.challengeStatPoints}>{stat.points}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}