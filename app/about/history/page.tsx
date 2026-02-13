import type { Metadata } from "next"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { historyTimeline } from "@/lib/history"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Our History",
  description: "A brief history of Praise Tabernacle.",
  path: "/about/history",
})

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        titleEn="Our History"
        titleTa="வரலாறு"
        descriptionEn="How God has led our church family over time."
        descriptionTa="எங்கள் சபையை தேவன் வழிநடத்திய விதம்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Timeline" ta="காலவரிசை" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Milestones" ta="முக்கிய நிகழ்வுகள்" />
                </h2>
                <p className="mt-3 text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="A few key moments of how God has led our church family."
                    ta="தேவன் எங்கள் சபைக்குடும்பத்தை வழிநடத்திய சில முக்கிய தருணங்கள்."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 space-y-6">
                  {historyTimeline.map((event, idx) => (
                    <div key={`${event.year}-${idx}`} className="rounded-2xl border border-churchBlue/10 bg-white p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{event.year}</div>
                          <div className="mt-1 text-base font-semibold tracking-tight text-churchBlue">
                            <Lang en={event.titleEn} ta={event.titleTa} taClassName="font-tamil" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang
                          en={event.descriptionEn}
                          ta={event.descriptionTa}
                          taClassName="font-tamil"
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
