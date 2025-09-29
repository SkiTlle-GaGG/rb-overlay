import Card, { TeamColor } from "@/components/Card";
import React from "react";
import styles from "./TeamPlayersRanking.module.css";
import Image from "next/image";
import DamaciaFrame from "@/assets/img/team/Demacia/demacia_frame.png";
import NoxusFrame from "@/assets/img/team/noxus/noxus_frame.png";
import IoniaFrame from "@/assets/img/team/ionia/ionia_frame.png";

function TeamPlayersRanking({ teamColor }: { teamColor: TeamColor }) {
  const frame =
    teamColor === TeamColor.DEMACIA
      ? DamaciaFrame.src
      : teamColor === TeamColor.NOXUS
      ? NoxusFrame.src
      : IoniaFrame.src;
  return (
    <Card title="TEAM OBSESSS" subtitle="TOP SPIELER" color={teamColor}>
      {/* List */}
      <div
        className={
          "flex flex-col gap-4 font-redbull-book text-white text-[12px]"
        }
      >
        {[1, 2, 3].map((number) => (
          <>
            {/* Item */}
            <div
              className={"flex align-center justify-between p-2 rounded-lg"}
              style={{
                backgroundImage: `url(${frame})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex align-center gap-2">
                {/* Number */}
                <p className="text-white flex items-center justify-center font-redbull-cond-bold h-auto">
                  0{number}
                </p>

                {/* Icon */}
                <div>
                  <Image
                    src={
                      "https://ga.gg/wp-content/uploads/ddragon/currentVersion/assets/img/profileicon/6725.png"
                    }
                    alt="Icon"
                    width={50}
                    height={50}
                    className="object-cover rounded-full h-10 w-10"
                  />
                </div>

                {/* Summoner */}
                <div>
                  <p className="font-redbull-book">SUMMONER</p>
                  <p className="font-redbull-cond-bold text-md">
                    ARIANA GRANDE
                  </p>
                </div>
              </div>
              <div className="text-right h-full flex flex-col justify-between">
                <p className="font-redbull-book">PUNKTE</p>
                <p className="font-redbull-cond-bold">1322113123</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </Card>
  );
}

export default TeamPlayersRanking;
