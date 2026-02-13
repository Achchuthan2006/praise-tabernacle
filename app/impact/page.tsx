import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { listImpactMonthsNewestFirst } from "@/lib/impact"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Impact",
  description: "Monthly ministry impact metrics for Praise Tabernacle.",
  path: "/impact",
})

function formatMonth(monthIso: string) {
  const [y, m] = monthIso.split("-").map((v) => Number(v))
  if (!y || !m) return monthIso
  const d = new Date(Date.UTC(y, m - 1, 1))
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" }).format(d)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-CA").format(value)
}

export default function ImpactPage() {
  const months = listImpactMonthsNewestFirst()

  return (
    <>
      <PageHeader
        titleEn="Impact"
        titleTa="தாக்கம்"
        descriptionEn="Updated monthly. Simple metrics that show how ministry is reaching people."
        descriptionTa="மாதம் தோறும் புதுப்பிப்பு. சேவை எவ்வாறு மக்களை அணுகுகிறது என்பதை காட்டும் எளிய கணக்குகள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-7 shadow-glow md:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                  <Lang en="Your support makes this possible" ta="உங்கள் ஆதரவு இதை சாத்தியப்படுத்துகிறது" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="These numbers are meant to build trust and show real outcomes. If you’d like to partner, explore a tier or reach out with a specific goal."
                    ta="இவை நம்பிக்கை வளர்க்கவும் உண்மையான விளைவுகளை காட்டவும். கூட்டாண்மைக்கு இணைக்க விரும்பினால், ஒரு கட்டத்தைப் பாருங்கள் அல்லது குறிப்பிட்ட நோக்கத்துடன் தொடர்பு கொள்ளுங்கள்."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link href="/partnership" className="btn btn-md btn-primary">
                    <Lang en="Partnership programs" ta="கூட்டாண்மை திட்டங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/give" className="btn btn-md btn-secondary">
                    <Lang en="Giving options" ta="கொடையின் வழிகள்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {months.map((m, idx) => (
                <Reveal key={m.monthIso} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                  <article className="card overflow-hidden">
                    <div className="card-content p-7">
                      <div className="section-kicker">
                        <Lang en="Month" ta="மாதம்" taClassName="font-tamil" />
                      </div>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                        {formatMonth(m.monthIso)}
                      </h3>
                      <div className="mt-5 grid gap-3">
                        <MetricRow
                          labelEn="People served"
                          labelTa="சேவை பெற்றவர்கள்"
                          value={m.peopleServed}
                        />
                        <MetricRow
                          labelEn="Prayer requests answered"
                          labelTa="ஜெப வேண்டுகோள்கள்"
                          value={m.prayerRequestsAnswered}
                        />
                        <MetricRow
                          labelEn="Families reached"
                          labelTa="குடும்பங்கள்"
                          value={m.familiesReached}
                        />
                        <MetricRow
                          labelEn="Community outreach moments"
                          labelTa="சமூக சேவை"
                          value={m.communityOutreachMoments}
                        />
                      </div>
                      {m.noteEn ? (
                        <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 text-sm text-churchBlue/75">
                          <Lang en={m.noteEn} ta={m.noteTa ?? m.noteEn} taClassName="font-tamil" />
                        </div>
                      ) : null}
                      <div className="mt-6 text-xs text-churchBlue/55">
                        <Lang
                          en={`Last updated: ${m.updatedIso}`}
                          ta={`கடைசியாக புதுப்பிக்கப்பட்டது: ${m.updatedIso}`}
                          taClassName="font-tamil"
                        />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function MetricRow({
  labelEn,
  labelTa,
  value,
}: {
  labelEn: string
  labelTa: string
  value: number
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="text-sm font-semibold text-churchBlue/80">
        <Lang en={labelEn} ta={labelTa} taClassName="font-tamil" />
      </div>
      <div className="text-lg font-semibold text-churchBlue">{formatNumber(value)}</div>
    </div>
  )
}

