import { ChallengesRanking } from '@/components/overlays/challenges-ranking'
import { useEffect, useMemo, useState } from 'react'
import { Challenge, EventData } from '@/types/overlay-data'


function ChallengeRankingPage() {

  const [eventData, setEventData] = useState<EventData | null>(null)

  useEffect(() => {
    fetch('/api/event-data')
      .then(res => res.json())
      .then(data => setEventData(data))
  }, [])

  const challengesData = useMemo(() => {
    return eventData?.timeframes[0].data.challenges ?? []
  }, [eventData])

  if (challengesData === null) return (<></>);

  return <ChallengesRanking challenges={challengesData} />
}

export default ChallengeRankingPage
