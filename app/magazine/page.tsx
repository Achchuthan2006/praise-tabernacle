import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { formatMonthIso } from "@/lib/dates"
import { hasPublicAsset, listMagazineIssuesNewestFirst } from "@/lib/magazine"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Magazine",
  description: "Monthly digital magazine with pastor's message, events, testimonies, and teaching articles.",
  path: "/magazine",
})

export default function MagazinePage() {
  const issues = listMagazineIssuesNewestFirst()

  return (
    <>
      <PageHeader
        titleEn="Digital Magazine"
        titleTa="டிஜிட்டல் இதழ்"
        descriptionEn="Monthly magazine with pastor's message, events, testimonies, and teaching articles."
        descriptionTa="போதகரின் செய்தி, நிகழ்வுகள், சாட்சிகள், மற்றும் போதனை கட்டுரைகளுடன் மாதாந்திர டிஜிட்டல் இதழ்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-7 shadow-glow md:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                  <Lang en="New each month" ta="ஒவ்வொரு மாதமும் புதிய இதழ்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Read online when a viewer is available, or download the PDF to keep and share."
                    ta="ஆன்லைன் பார்வையாளர் இருந்தால் இங்கேயே படிக்கலாம்; இல்லையெனில் PDF-ஐ பதிவிறக்கம் செய்து சேமிக்கவும் பகிரவும் முடியும்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue, idx) => {
                const href = `/magazine/${issue.slug}`
                const cover = (issue.coverImageSrc ?? "").trim()
                const pdfReady = hasPublicAsset(issue.pdfHref)

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
                                quality={75}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.18),transparent_60%)]" />
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="card-content p-6">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          {formatMonthIso(issue.monthIso)}
                        </div>
                        <h3 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                          <Lang en={issue.titleEn} ta={issue.titleTa} taClassName="font-tamil" />
                        </h3>
                        <p className="mt-3 text-sm text-churchBlue/70">
                          <Lang
                            en={pdfReady ? "Viewer and PDF download available." : "Issue page is ready. Add the PDF file to enable viewing and downloads."}
                            ta={pdfReady ? "ஆன்லைன் பார்வையும் PDF பதிவிறக்கமும் தயாராக உள்ளன." : "இதழ் பக்கம் தயாராக உள்ளது. பார்வையும் பதிவிறக்கமும் செயல்பட PDF கோப்பை சேர்க்கவும்."}
                            taClassName="font-tamil"
                          />
                        </p>
                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          <Link href={href} className="btn btn-sm btn-primary w-full">
                            <Lang en="Open issue" ta="இதழை திறக்க" taClassName="font-tamil" />
                          </Link>
                          {pdfReady ? (
                            <a href={issue.pdfHref} download className="btn btn-sm btn-secondary w-full">
                              <Lang en="Download PDF" ta="PDF பதிவிறக்கம்" taClassName="font-tamil" />
                            </a>
                          ) : (
                            <span className="btn btn-sm btn-secondary-soft w-full cursor-default opacity-80">
                              <Lang en="PDF coming soon" ta="PDF விரைவில் வரும்" taClassName="font-tamil" />
                            </span>
                          )}
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
