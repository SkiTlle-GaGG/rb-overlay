import React from 'react'
import StreamerOverlayCard, { STREAMER_VIDEO_SRC } from '@/components/overlays/streamer-overlay/StreamerOverlayCar'
import { TeamEnum } from '@/types/team'

function KarniPage() {

  return (
    <StreamerOverlayCard teamId={TeamEnum.IONIA} videoSrc={STREAMER_VIDEO_SRC.KARNI} />
  )
}

export default KarniPage