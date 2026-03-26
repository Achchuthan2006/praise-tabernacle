"use client"

import dynamic from "next/dynamic"

import LazyMount from "@/components/LazyMount"
import SectionSkeleton from "@/components/ui/SectionSkeleton"

const PhotosMediaSection = dynamic(() => import("@/components/PhotosMediaSection"), {
  ssr: false,
  loading: () => <SectionSkeleton lines={2} cards={3} gridClassName="md:grid-cols-3" />,
})

export default function PhotosMediaLazy() {
  return (
    <LazyMount
      fallback={<SectionSkeleton lines={2} cards={3} gridClassName="md:grid-cols-3" />}
    >
      <PhotosMediaSection />
    </LazyMount>
  )
}
