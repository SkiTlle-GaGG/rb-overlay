import React from 'react'
import { OverallRanking } from '@/components/overlays/overall-ranking'
import { TeamEnum } from '@/types/team'
import { withAuth } from "@/components/hoc";
import EventProcessor from '@/lib/event-processor';
import { TeamRanking } from '@/types/overlay-data';
import { motion } from 'motion/react';

type OverallRankingPageProps = {
  teamsRankingData: TeamRanking[]
}

function OverallRankingPage({ teamsRankingData }: OverallRankingPageProps) {
  return (
    <div>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <OverallRanking teams={teamsRankingData} />
      </motion.div>
    </div>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/event-data`);
  const data = await res.json();
  const eventProcessor = new EventProcessor(data);
  const teamsRanking = eventProcessor.getTeamsRanking();

  return {
    props: {
      teamsRankingData: teamsRanking ?? [],
    },
  };
} 

export default withAuth(OverallRankingPage);