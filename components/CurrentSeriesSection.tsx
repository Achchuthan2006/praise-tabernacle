import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import { getCurrentSeries, getSermonsBySeries } from "@/lib/sermons"

export default function CurrentSeriesSection() {
  const series = getCurrentSeries()
  if (!series) return null

  const sermonsInSeries = getSermonsBySeries(series.id)
  const latest = sermonsInSeries[0] ?? null

  return (
    <section className="bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">
                <Lang en="Series" ta="தொடர்" taClassName="font-tamil" />
              </div>
              <h2 className="section-heading">
                <Lang en="Current Series" ta="தற்போதைய தொடர்" taClassName="font-tamil" />
              </h2>
              <p className="mt-1 text-sm text-churchBlue/70">
                <Lang
                  en="Sermon series highlights, notes, and discussion questions."
                  ta="பிரசங்கத் தொடர் குறிப்புகள், சுருக்கங்கள், மற்றும் கலந்துரையாடல் கேள்விகள்."
                  taClassName="font-tamil"
                />
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link href="/sermons" className="btn btn-sm btn-secondary">
                <Lang en="Browse archive" ta="காப்பகத்தைப் பாருங்கள்" taClassName="font-tamil" />
              </Link>
              {latest ? (
                <Link href={`/sermons/${latest.slug}`} className="btn btn-sm btn-primary">
                  <Lang en="Watch latest" ta="சமீபத்தியதைப் பாருங்கள்" taClassName="font-tamil" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:mt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="card">
                <div className="card-content p-8">
                  <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                    <Lang
                      en={`${sermonsInSeries.length} sermons`}
                      ta={`${sermonsInSeries.length} பிரசங்கங்கள்`}
                      taClassName="font-tamil"
                    />
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                    {series.title}
                  </h3>
                  {series.summary ? (
                    <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      {series.summary}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card">
                <div className="card-content p-8">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="Small group questions" ta="சிறுகுழு கேள்விகள்" taClassName="font-tamil" />
                  </div>
                  <p className="mt-2 text-sm text-churchBlue/70">
                    <Lang
                      en="Each sermon page includes discussion questions for small groups."
                      ta="ஒவ்வொரு பிரசங்கப் பக்கத்திலும் சிறுகுழுக்களுக்கு உரையாடல் கேள்விகள் உள்ளன."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-6">
                    <Link href="/groups" className="btn btn-md btn-primary w-full">
                      <Lang en="Find a group" ta="ஒரு குழுவைக் கண்டுபிடிக்க" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
