import React from 'react'
import { TeamPlayersRanking } from '@/components/overlays/team-players-ranking'
import { TeamEnum } from '@/types/team'
import { withAuth } from "@/components/hoc";
import { TeamPlayersRankingData } from '@/types/overlay-data';
import EventProcessor from '@/lib/event-processor';
import { motion } from 'framer-motion';

type TeamPlayersRankingPageProps = {
  teamPlayersRankingData: TeamPlayersRankingData | null
}

function TeamPlayersRankingPage({ teamPlayersRankingData }: TeamPlayersRankingPageProps) {
  return (
    <div>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.5 }}
      >
      <TeamPlayersRanking data={teamPlayersRankingData} />
      </motion.div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`/api/event-data`);
  const data = await res.json();
  const eventProcessor = new EventProcessor(data);
  const teamPlayersRanking = eventProcessor.getTeamPlayersRanking(TeamEnum.IONIA);

  return {
    props: {
      teamPlayersRankingData: teamPlayersRanking ?? null,
    },
  };
}

export default withAuth(TeamPlayersRankingPage);
