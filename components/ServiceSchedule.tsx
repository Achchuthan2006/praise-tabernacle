"use client"

import Link from "next/link"

import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { googleCalendarUrl, outlookCalendarUrl } from "@/lib/calendarLinks"
import { parseWeeklyTimeText, nextWeeklyOccurrence } from "@/lib/serviceTimes"
import { siteConfig } from "@/lib/site"
import { normalizeBullets } from "@/lib/text"

export default function ServiceSchedule({
  titleEn = "Service Schedule",
  titleTa = "ஆராதனை அட்டவணை",
  subtitleEn = "Sunday services plus weekly and monthly prayer times.",
  subtitleTa = "ஞாயிறு ஆராதனைகள் + வாராந்திர மற்றும் மாதாந்திர ஜெப நேரங்கள்.",
}: {
  titleEn?: string
  titleTa?: string
  subtitleEn?: string
  subtitleTa?: string
}) {
  const { language } = useLanguage()
  const title = language === "ta" ? titleTa : titleEn
  const subtitle = language === "ta" ? subtitleTa : subtitleEn

  const { detailedSchedule } = siteConfig
  const serviceTimeZone = siteConfig.officeHours.timeZone
  const churchLocation = siteConfig.addressLines.join(", ")

  const serviceTimeEntries = siteConfig.serviceTimes
    .map((st) => {
      const parsed = parseWeeklyTimeText(st.time)
      if (!parsed) return null
      const startLocal = nextWeeklyOccurrence(parsed)
      const endLocal = new Date(startLocal.getTime() + 90 * 60 * 1000)
      return {
        id: st.id as string,
        labelEn: st.labelEn as string,
        labelTa: st.labelTa as string,
        time: st.time as string,
        startLocal,
        endLocal,
        links: {
          google: googleCalendarUrl({
            title: `${st.labelEn} — ${siteConfig.nameEn}`,
            details: "Service time reminder.",
            location: churchLocation,
            startLocal,
            endLocal,
            timeZone: serviceTimeZone,
          }),
          outlook: outlookCalendarUrl({
            title: `${st.labelEn} — ${siteConfig.nameEn}`,
            body: "Service time reminder.",
            location: churchLocation,
            startLocal,
            endLocal,
          }),
          ics: `/service-times/${st.id}/calendar`,
        },
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

  const sections: Array<{
    titleEn: string
    titleTa: string
    items: Array<{ time: string; titleEn: string; titleTa: string }>
  }> = [
    { titleEn: "Sunday services", titleTa: "ஞாயிறு ஆராதனைகள்", items: detailedSchedule.sundayServices },
    { titleEn: "Weekly events", titleTa: "வாராந்திர நிகழ்வுகள்", items: detailedSchedule.weeklyEvents },
    { titleEn: "Monthly events", titleTa: "மாதாந்திர நிகழ்வுகள்", items: detailedSchedule.monthlyEvents },
  ]

  return (
    <section className="bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                {subtitle}
              </p>
            </div>
          </Reveal>

          {serviceTimeEntries.length ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {serviceTimeEntries.map((item) => (
                <Reveal key={item.id} delay={0}>
                  <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                    <div className="text-sm font-semibold text-churchBlue">
                      <span className={language === "ta" ? "font-tamil" : undefined}>
                        {language === "ta" ? item.labelTa : item.labelEn}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-churchBlue/75">{normalizeBullets(item.time)}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={item.links.ics} className="btn btn-sm btn-secondary w-full sm:w-auto" title="Download an iCal reminder for the next service">
                        {language === "ta" ? "iCal (.ics)" : "Download iCal"}
                      </a>
                      <a href={item.links.google} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary w-full sm:w-auto">
                        {language === "ta" ? "Google Calendar" : "Add to Google Calendar"}
                      </a>
                      <a href={item.links.outlook} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary w-full sm:w-auto">
                        {language === "ta" ? "Outlook" : "Add to Outlook"}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}

          <div className="mt-10 grid gap-6">
            {sections.map((section, idx) => (
              <Reveal key={section.titleEn} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}>
                <div className="card">
                  <div className="card-content p-6 sm:p-8">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue sm:text-xl">
                        <span className={language === "ta" ? "font-tamil" : undefined}>
                          {language === "ta" ? section.titleTa : section.titleEn}
                        </span>
                      </h3>
                      <div
                        className={[
                          "text-xs text-churchBlue/60",
                          language === "ta" ? "font-tamil" : "",
                        ].join(" ")}
                      >
                        {language === "ta" ? `${section.items.length} உருப்படிகள்` : `${section.items.length} items`}
                      </div>
                    </div>

                    <div className="mt-5 divide-y divide-churchBlue/10 border-y border-churchBlue/10">
                      {section.items.map((item) => (
                        <div
                          key={`${section.titleEn}-${item.time}-${item.titleEn}`}
                          className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-churchBlue sm:text-base">
                              <span className={language === "ta" ? "font-tamil" : undefined}>
                                {language === "ta" ? item.titleTa : item.titleEn}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:justify-end">
                            <div className="whitespace-nowrap text-sm font-semibold text-churchBlue/80">
                              {normalizeBullets(item.time)}
                            </div>
                            {item.titleEn.toLowerCase().includes("1st service") ? (
                              <Link href="/watch?service=1" className="btn btn-sm btn-secondary">
                                Watch (English)
                              </Link>
                            ) : item.titleEn.toLowerCase().includes("2nd service") ? (
                              <Link href="/watch?service=2" className="btn btn-sm btn-secondary">
                                Watch (Tamil)
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
