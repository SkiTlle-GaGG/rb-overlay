import React from "react";
import Card, { CardProps } from "../Card";
import ChallengeStats from "../ChallengeStats";

export default function InfluencerStatsCard() {
    const stats = [
        { name: "Challenge 1", points: 100 },
        { name: "Challenge 2", points: 200 },
        { name: "Challenge 3", points: 300 },
    ];

    return (
        <Card>
            <ChallengeStats stats={stats} />
        </Card>
    )
}