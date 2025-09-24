import React from "react";
import Card from "../Card";
import { TeamEnum, TeamType } from "@/types/team";
import NoxusFrame from "@/assets/img/team/noxus/noxus_frame.png";
import DemaciaFrame from "@/assets/img//team/Demacia/demacia_frame.png";
import IoniaFrame from "@/assets/img//team/ionia/ionia_frame.png";

interface ChallengeStat {
  name: string;
  points: number;
  team: TeamType;
}

export default function ChallengesRankingCard({stats}: {stats: ChallengeStat[]}) {

  return (
    <Card title="CHALLENGES" subtitle="Team Ranking">
      <div className="flex justify-between items-center w-full font-redbull-book ">
        <p className="text-[12px] text-redbull-red font-[600] tracking-wider">
          CHALLENGE
        </p>
        <p className="text-[12px] text-redbull-red font-[600] tracking-wider">
          PUNKTE
        </p>
      </div>
      <div className="challenge-stats flex flex-col justify-between gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-[9px] px-2 py-2 flex justify-between items-center"
            style={{
              backgroundImage: `url(${
                stat.team === TeamEnum.NOXUS
                  ? NoxusFrame.src
                  : stat.team === TeamEnum.DEMACIA
                  ? DemaciaFrame.src
                  : IoniaFrame.src
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-white uppercase text-sm font-redbull-cond-bold tracking-wider">
              {stat.name}
            </p>
            <p className="text-white text-sm font-redbull-cond-bold tracking-wider">
              {stat.points}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}