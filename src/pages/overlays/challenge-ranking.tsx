import ChallengesRanking from '@/components/overlays/challenges-ranking/ChallengeRanking'
import { Challenge } from '@/types/overlay-data'
import { withAuth } from "@/components/hoc";
import { motion } from 'motion/react';
import EventProcessor from '@/lib/event-processor';


type ChallengeRankingPageProps = {
  challengesData: Challenge[]
}

function ChallengeRankingPage({ challengesData }: ChallengeRankingPageProps) {


  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <ChallengesRanking challenges={challengesData} />
    </motion.div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/event-data`);
  const data = await res.json();
  const eventProcessor = new EventProcessor(data);
  const challenges = eventProcessor.getChallengesRanking();
  return { props: { challengesData: challenges ?? [] } };
}

export default withAuth(ChallengeRankingPage);
