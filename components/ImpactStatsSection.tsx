import Link from "next/link"

import Lang from "@/components/language/Lang"
import CountUp from "@/components/ui/CountUp"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { getLatestImpactMonth } from "@/lib/impact"

function formatMonth(monthIso: string) {
  const [y, m] = monthIso.split("-").map((v) => Number(v))
  if (!y || !m) return monthIso
  const d = new Date(Date.UTC(y, m - 1, 1))
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" }).format(d)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-CA").format(value)
}

function StatCard({
  titleEn,
  titleTa,
  value,
  detailEn,
  detailTa,
  delay,
}: {
  titleEn: string
  titleTa: string
  value: number
  detailEn: string
  detailTa: string
  delay: 0 | 1 | 2 | 3
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card card-accent-left h-full" data-accent="community">
        <div className="card-content p-7">
          <div className="text-sm font-semibold text-churchBlue">
            <Lang en={titleEn} ta={titleTa} taClassName="font-tamil" />
          </div>
          <div className="mt-3 tracking-tight">
            <CountUp value={value} className="text-[3rem] leading-none text-churchBlue sm:text-[3.25rem]" />
          </div>
          <div className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
            <Lang en={detailEn} ta={detailTa} taClassName="font-tamil" />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function ImpactStatsSection() {
  const latest = getLatestImpactMonth()
  const monthLabel = formatMonth(latest.monthIso)

  return (
    <section className="bg-churchBlueSoft">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12 fade-up">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="section-kicker">
                    <Lang en="Impact" ta="தாக்கம்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading">
                    <Lang en="Monthly ministry impact" ta="மாதாந்திர சேவை தாக்கம்" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                    <Lang
                      en={`Updated monthly • Latest: ${monthLabel}`}
                      ta={`மாதம் தோறும் புதுப்பிப்பு • சமீபத்தியது: ${monthLabel}`}
                      taClassName="font-tamil"
                    />
                  </p>
                  {latest.noteEn ? (
                    <p className="mt-3 text-xs text-churchBlue/55">
                      <Lang en={latest.noteEn} ta={latest.noteTa ?? latest.noteEn} taClassName="font-tamil" />
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link href="/impact" className="btn btn-sm btn-secondary">
                    <Lang en="View impact dashboard" ta="தாக்கப் பக்கம்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/partnership" className="btn btn-sm btn-primary">
                    <Lang en="Support the mission" ta="சேவைக்கு ஆதரவு" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <div className="section-divider" aria-hidden="true" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
                <StatCard
                  titleEn="People served"
                  titleTa="சேவை பெற்றவர்கள்"
                  value={latest.peopleServed}
                  detailEn="Counseling, visits, follow-ups, and ongoing care touchpoints."
                  detailTa="ஆலோசனை, பார்வைகள், தொடர்ச்சி உதவி, அக்கறை தொடர்புகள்."
                  delay={0}
                />
                <StatCard
                  titleEn="Prayer requests answered"
                  titleTa="ஜெப வேண்டுகோள்கள்"
                  value={latest.prayerRequestsAnswered}
                  detailEn="Requests prayed for by our team and community."
                  detailTa="எங்கள் ஜெபக் குழு மற்றும் சமூகத்தின் ஜெப ஆதரவு."
                  delay={1}
                />
                <StatCard
                  titleEn="Families reached"
                  titleTa="அணுகப்பட்ட குடும்பங்கள்"
                  value={latest.familiesReached}
                  detailEn="Families reached through services, follow-ups, and support."
                  detailTa="ஆராதனைகள், தொடர்ச்சி, உதவி மூலம் அணுகப்பட்ட குடும்பங்கள்."
                  delay={2}
                />
                <StatCard
                  titleEn="Community outreach moments"
                  titleTa="சமூக சேவை"
                  value={latest.communityOutreachMoments}
                  detailEn="Outreach connections, meals, care moments, and invitations."
                  detailTa="அவுட்ரீச் தொடர்புகள், உணவு உதவி, அக்கறை, அழைப்புகள்."
                  delay={3}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
