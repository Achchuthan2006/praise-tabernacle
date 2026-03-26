"use client"

import LazyMount from "@/components/LazyMount"
import SermonHighlights from "@/components/SermonHighlights"
import SectionSkeleton from "@/components/ui/SectionSkeleton"

export default function SermonHighlightsLazy() {
  return (
    <LazyMount
      rootMargin="800px 0px"
      fallback={<SectionSkeleton bandClassName="bg-white" lines={2} cards={4} gridClassName="md:grid-cols-2 lg:grid-cols-4" />}
    >
      <SermonHighlights />
    </LazyMount>
  )
}
