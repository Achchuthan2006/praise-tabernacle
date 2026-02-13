import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { listDevotionalsNewestFirst } from "@/lib/devotionals"
import { formatIsoDate } from "@/lib/dates"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Devotionals",
  description: "Short devotionals with Scripture and encouragement in Tamil and English.",
  path: "/devotionals",
})

function formatDate(dateIso: string, locale: string) {
  return formatIsoDate(dateIso, locale, { year: "numeric", month: "short", day: "2-digit" })
}

export default function DevotionalsPage() {
  const devotionals = listDevotionalsNewestFirst()

  return (
    <>
      <PageHeader
        titleEn="Devotionals"
        titleTa="தியானங்கள்"
        descriptionEn="Short devotionals with Scripture and encouragement in Tamil and English."
        descriptionTa="தமிழ் மற்றும் ஆங்கிலத்தில் வேதாகம வசனத்துடன் கூடிய குறும் தியானங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {devotionals.map((d, idx) => (
                <Reveal key={d.slug} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                  <article className="card">
                    <div className="card-content p-7">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang
                          en={formatDate(d.dateIso, "en-CA")}
                          ta={formatDate(d.dateIso, "ta-IN")}
                          taClassName="font-tamil"
                        />{" "}
                        • {d.verseRef}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-churchBlue">
                        <Lang en={d.titleEn} ta={d.titleTa} taClassName="font-tamil" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75">
                        <Lang en={d.summaryEn} ta={d.summaryTa} taClassName="font-tamil" />
                      </p>
                      <div className="mt-6">
                        <Link href={`/devotionals/${d.slug}`} className="btn btn-sm btn-primary w-full">
                          <Lang en="Read devotional" ta="தியானம் படிக்க" taClassName="font-tamil" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {devotionals.length === 0 ? (
              <div className="mt-10 card">
                <div className="card-content p-8">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="No devotionals yet" ta="தியானங்கள் இல்லை" taClassName="font-tamil" />
                  </div>
                  <p className="mt-2 text-sm text-churchBlue/70">
                    <Lang
                      en="Add devotionals in lib/devotionals.ts."
                      ta="`lib/devotionals.ts`-இல் தியானங்களைச் சேர்க்கவும்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  )
}

