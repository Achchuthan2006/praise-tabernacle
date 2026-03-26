import { Suspense } from "react"

import SocialMediaSection from "@/components/SocialMediaSection"
import SectionSkeleton from "@/components/ui/SectionSkeleton"

export default function SocialMediaLazy() {
  return (
    <Suspense fallback={<SectionSkeleton lines={2} cards={2} gridClassName="md:grid-cols-2" />}>
      <SocialMediaSection />
    </Suspense>
  )
}
