import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import VolunteerApplicationForm from "@/components/VolunteerApplicationForm"
import { serveOpportunities, volunteerTrainingEvents } from "@/lib/serve"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Serve Application",
  description: "Apply to volunteer at Praise Tabernacle.",
  path: "/serve/apply",
})

export default function ServeApplyPage() {
  return (
    <>
      <PageHeader
        titleEn="Serve Application"
        titleTa="சேவை விண்ணப்பம்"
        descriptionEn="Choose a team and send your volunteer application."
        descriptionTa="ஒரு குழுவைத் தேர்ந்தெடுத்து உங்கள் தன்னார்வ விண்ணப்பத்தை அனுப்புங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-4xl">
            <VolunteerApplicationForm opportunities={serveOpportunities} trainingEvents={volunteerTrainingEvents} />
          </div>
        </Container>
      </section>
    </>
  )
}

