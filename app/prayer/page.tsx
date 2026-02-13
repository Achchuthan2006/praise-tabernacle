import type { Metadata } from "next"

import PrayerRequestForm from "@/components/PrayerRequestForm"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Prayer",
  description: "Send a private prayer request or share on the Prayer Wall.",
  path: "/prayer",
})

export default function PrayerPage() {
  return (
    <>
      <PageHeader
        titleEn="Prayer"
        titleTa="ஜெபம்"
        descriptionEn="Send a private prayer request, or share a public request/testimony on the Prayer Wall."
        descriptionTa="தனிப்பட்ட ஜெப வேண்டுகோளை அனுப்புங்கள், அல்லது Prayer Wall-ல் பொது வேண்டுகோள்/சாட்சி பகிருங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <PrayerRequestForm
            wrapInSection={false}
            enablePrayerWallOption
            titleEn="Prayer request"
            titleTa="ஜெப வேண்டுகோள்"
            subtitleEn="Choose private (to our prayer team) or public (Prayer Wall)."
            subtitleTa="தனிப்பட்டது (ஜெபக் குழு) அல்லது பொது (Prayer Wall) என்பதை தேர்வு செய்யுங்கள்."
          />
        </Container>
      </section>
    </>
  )
}

