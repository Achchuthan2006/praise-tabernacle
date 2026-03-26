"use client"

import dynamic from "next/dynamic"

import SectionSkeleton from "@/components/ui/SectionSkeleton"

const MajorEventCountdown = dynamic(() => import("@/components/MajorEventCountdown"), {
  ssr: false,
  loading: () => <SectionSkeleton bandClassName="bg-white" lines={1} cards={1} gridClassName="grid-cols-1" />,
})

export default function MajorEventCountdownClientOnly() {
  return <MajorEventCountdown />
}
