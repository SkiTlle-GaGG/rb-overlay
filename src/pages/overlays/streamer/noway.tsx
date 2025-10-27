import React from 'react'
import StreamerOverlayCard, { STREAMER_VIDEO_SRC } from '@/components/overlays/streamer-overlay/StreamerOverlayCar'
import { TeamEnum } from '@/types/team'
import StreamerOverlayCardNoway from '@/components/overlays/streamer-overlay/StreamerOverlayCardNoway'

function NowayPage() {

  return (
    <StreamerOverlayCardNoway teamId={TeamEnum.DEMACIA} videoSrc={STREAMER_VIDEO_SRC.NOWAY} />
  )
}

export default NowayPage