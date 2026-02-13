import Link from "next/link"

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
              <div className="section-kicker">Series</div>
              <h2 className="section-heading">Current Series</h2>
              <p className="mt-1 text-sm text-churchBlue/70">
                Sermon series highlights, notes, and discussion questions.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link href="/sermons" className="btn btn-sm btn-secondary">
                Browse archive
              </Link>
              {latest ? (
                <Link href={`/sermons/${latest.slug}`} className="btn btn-sm btn-primary">
                  Watch latest
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="card">
                <div className="card-content p-8">
                  <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                    {sermonsInSeries.length} sermons
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
                  <div className="text-sm font-semibold text-churchBlue">Small group questions</div>
                  <p className="mt-2 text-sm text-churchBlue/70">
                    Each sermon page includes discussion questions for small groups.
                  </p>
                  <div className="mt-6">
                    <Link href="/groups" className="btn btn-md btn-primary w-full">
                      Find a group
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

