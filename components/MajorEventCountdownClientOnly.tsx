"use client"

import dynamic from "next/dynamic"

const MajorEventCountdown = dynamic(() => import("@/components/MajorEventCountdown"), {
  ssr: false,
})

export default function MajorEventCountdownClientOnly() {
  return <MajorEventCountdown />
}

