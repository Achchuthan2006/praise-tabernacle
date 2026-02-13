import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import PrayerWall from "@/components/PrayerWall"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Prayer Wall",
  description: "Public prayer requests shared by our community.",
  path: "/prayer-wall",
})

export default function PrayerWallPage() {
  return (
    <>
      <PageHeader
        titleEn="Prayer Wall"
        titleTa="ஜெப சுவர்"
        descriptionEn="Share a request and pray with our church community."
        descriptionTa="வேண்டுகோள்களை பகிர்ந்து ஒன்றாக ஜெபிப்போம்."
      />
      <section className="bg-white">
        <Container className="section-padding">
          <PrayerWall />
        </Container>
      </section>
    </>
  )
}

