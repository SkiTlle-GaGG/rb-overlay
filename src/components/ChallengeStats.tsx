import React from "react";

interface ChallengeStat {
    name: string;
    points: number;
}

interface ChallengeStatsProps {
    stats: ChallengeStat[];
}

export default function ChallengeStats({ stats }: ChallengeStatsProps) {
    return (
        <div className="challenge-stats flex flex-col justify-between gap-4">
            {stats.map((stat) => (
            <div className="rounded-xl bg-dark-red px-2 py-2 flex justify-between items-center">
                    <p className="text-white uppercase text-xs">{stat.name}</p>
                    <p className="text-white text-xs">{stat.points}</p>
                </div>
            ))}
        </div>
    )
}