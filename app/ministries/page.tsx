import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { ministries, ministryCategories } from "@/lib/ministries"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Ministries",
  description: "Ways to connect and serve at Praise Tabernacle.",
  path: "/ministries",
})

export default function MinistriesPage() {
  const categoryTa: Record<string, string> = {
    "Life Stages": "வாழ்க்கை கட்டங்கள்",
    "Special Ministries": "சிறப்பு சேவைகள்",
    Missions: "மிஷன்",
    General: "பொது",
  }

  return (
    <>
      <PageHeader
        titleEn="Ministries"
        titleTa="சேவைகள்"
        descriptionEn="Find a place to belong, serve, and grow — at your own pace."
        descriptionTa="சேர்ந்து, சேவை செய்து, உங்கள் வேகத்தில் வளர ஒரு இடத்தை கண்டுபிடிக்கவும்."
      />

      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          {ministryCategories.map((category, sectionIdx) => {
            const items = ministries.filter((m) => m.category === category)
            if (items.length === 0) return null

            return (
              <Reveal key={category} delay={sectionIdx === 0 ? 0 : sectionIdx === 1 ? 1 : 2}>
                <section className={sectionIdx === 0 ? "" : "mt-14"}>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                      <Lang en={category} ta={categoryTa[category] ?? category} taClassName="font-tamil" />
                    </h2>
                    <span className="text-xs text-churchBlue/60">
                      <Lang
                        en={`${items.length} ministries`}
                        ta={`${items.length} சேவைகள்`}
                        taClassName="font-tamil"
                      />
                    </span>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((m) => (
                      <Link
                        key={m.slug}
                        href={`/ministries/${m.slug}`}
                        className="focus-ring group card block"
                      >
                        <div className="card-content">
                          <div className="flex flex-wrap items-center gap-2">
                            {m.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-churchBlue group-hover:text-churchBlueLight">
                            <Lang en={m.nameEn} ta={m.nameTa} taClassName="font-tamil" />
                          </h3>
                          <p className="mt-4 text-sm text-churchBlue/75 sm:text-base">
                            <Lang en={m.summaryEn} ta={m.summaryTa} taClassName="font-tamil" />
                          </p>
                          <div className="mt-6 text-sm text-churchBlue/70">
                            <div>
                              <span className="font-semibold text-churchBlue">
                                <Lang en="When:" ta="எப்போது:" taClassName="font-tamil" />
                              </span>{" "}
                              <Lang en={m.meetingTimeEn} ta={m.meetingTimeTa} taClassName="font-tamil" />
                            </div>
                            <div className="mt-1">
                              <span className="font-semibold text-churchBlue">
                                <Lang en="Where:" ta="எங்கே:" taClassName="font-tamil" />
                              </span>{" "}
                              <Lang en={m.locationEn} ta={m.locationTa} taClassName="font-tamil" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
            )
          })}

          <Reveal className="mt-14">
            <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-churchBlue">
                    <Lang en="Want to get involved?" ta="ஈடுபட விரும்புகிறீர்களா?" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-2 text-sm text-churchBlue/70">
                    <Lang
                      en="Send us a note and we&apos;ll help you find a good fit."
                      ta="உங்களுக்கு பொருத்தமான சேவையை கண்டுபிடிக்க எங்களுக்கு செய்தி அனுப்புங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/contact" className="btn btn-md btn-primary">
                    <Lang en="Request to Join" ta="சேர கோருங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/events" className="btn btn-md btn-secondary">
                    <Lang en="View Events" ta="நிகழ்வுகளை பார்க்கவும்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  )
}
