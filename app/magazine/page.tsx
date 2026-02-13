import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { listMagazineIssuesNewestFirst } from "@/lib/magazine"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Magazine",
  description: "Monthly digital magazine (PDF) with pastor’s message, events, testimonies, and teaching articles.",
  path: "/magazine",
})

function formatMonth(monthIso: string) {
  const [y, m] = monthIso.split("-").map((v) => Number(v))
  if (!y || !m) return monthIso
  const d = new Date(Date.UTC(y, m - 1, 1))
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" }).format(d)
}

export default function MagazinePage() {
  const issues = listMagazineIssuesNewestFirst()

  return (
    <>
      <PageHeader
        titleEn="Digital Magazine"
        titleTa="டிஜிட்டல் இதழ்"
        descriptionEn="Monthly PDF magazine featuring pastor’s message, events, testimonies, and teaching articles."
        descriptionTa="மாதாந்திர PDF இதழ்: போதகரின் செய்தி, நிகழ்வுகள், சாட்சிகள், போதனை கட்டுரைகள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-7 shadow-glow md:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                  <Lang en="New each month" ta="மாதம் தோறும் புதியது" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Download the PDF to read offline or share with friends and family."
                    ta="PDF-ஐ பதிவிறக்கம் செய்து ஆஃப்லைனில் படிக்கவும் அல்லது பகிரவும்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue, idx) => {
                const href = `/magazine/${issue.slug}`
                const cover = (issue.coverImageSrc ?? "").trim()
                return (
                  <Reveal key={issue.slug} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                    <article className="card overflow-hidden">
                      <div className="card-image">
                        <Link href={href} className="group block focus-ring" aria-label={issue.titleEn}>
                          <div className="relative aspect-[4/3] w-full bg-churchBlueSoft">
                            {cover ? (
                              <Image
                                src={cover}
                                alt={issue.titleEn}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                                quality={85}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.18),transparent_60%)]" />
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="card-content p-6">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          {formatMonth(issue.monthIso)}
                        </div>
                        <h3 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                          <Lang en={issue.titleEn} ta={issue.titleTa} taClassName="font-tamil" />
                        </h3>
                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          <Link href={href} className="btn btn-sm btn-primary w-full">
                            <Lang en="Open issue" ta="இதழை திறக்க" taClassName="font-tamil" />
                          </Link>
                          <a href={issue.pdfHref} download className="btn btn-sm btn-secondary w-full">
                            <Lang en="Download PDF" ta="PDF பதிவிறக்கம்" taClassName="font-tamil" />
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

