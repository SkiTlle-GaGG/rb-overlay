import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import InfluencerStatsCard from "@/components/slides/InfluencerStatsCard";
import NoxusCard from "@/components/NoxusCard";
import DemaciaCard from "@/components/DemaciaCard";

// Sample data for demonstration
const noxusPlayers = [
  {
    summoner_name: "ARIANA GRANDE",
    stats: 1322113123,
    placement_in_team: 1,
    captain: true
  },
  {
    summoner_name: "PEDRO PASCAL",
    stats: 3457832,
    placement_in_team: 2,
    captain: false
  },
  {
    summoner_name: "FREDDY KRUGER",
    stats: 1242,
    placement_in_team: 3,
    captain: false
  }
];

const demaciaPlayers = [
  {
    summoner_name: "ARIANA GRANDE",
    stats: 1322113123,
    placement_in_team: 1,
    captain: true
  },
  {
    summoner_name: "PEDRO PASCAL",
    stats: 3457832,
    placement_in_team: 2,
    captain: false
  },
  {
    summoner_name: "FREDDY KRUGER",
    stats: 1242,
    placement_in_team: 3,
    captain: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Red Bull Fractured Alliance - Team Overlays
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
          {/* Noxus Team Card */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">NOXUS TEAM</h2>
            <NoxusCard teamName="TEAM NOWAY" players={noxusPlayers} />
          </div>

          {/* Demacia Team Card */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">DEMACIA TEAM</h2>
            <DemaciaCard teamName="TEAM KARNI" players={demaciaPlayers} />
          </div>
        </div>

        {/* Original Influencer Stats Card for reference */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4">Original Design</h2>
            <InfluencerStatsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
