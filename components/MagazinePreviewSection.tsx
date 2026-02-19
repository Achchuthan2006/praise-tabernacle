import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { listMagazineIssuesNewestFirst } from "@/lib/magazine"

function formatMonth(monthIso: string) {
  const [y, m] = monthIso.split("-").map((v) => Number(v))
  if (!y || !m) return monthIso
  const d = new Date(Date.UTC(y, m - 1, 1))
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" }).format(d)
}

export default function MagazinePreviewSection() {
  const latest = listMagazineIssuesNewestFirst()[0]
  if (!latest) return null

  const href = `/magazine/${latest.slug}`
  const cover = (latest.coverImageSrc ?? "").trim()

  return (
    <section className="bg-churchBlueSoft">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Magazine" ta="இதழ்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en="Monthly digital magazine" ta="மாதாந்திர டிஜிட்டல் இதழ்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Pastor’s message, upcoming events, testimonies, and teaching articles — in one PDF."
                    ta="போதகரின் செய்தி, நிகழ்வுகள், சாட்சிகள், போதனை கட்டுரைகள் — ஒரே PDF-இல்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>

              <Link href="/magazine" className="btn btn-sm btn-secondary">
                <Lang en="All issues" ta="அனைத்து இதழ்கள்" taClassName="font-tamil" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10">
            <Reveal>
              <article className="card overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <Link href={href} className="group block focus-ring" aria-label={latest.titleEn}>
                      <div className="relative aspect-[4/3] w-full bg-churchBlueSoft">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={latest.titleEn}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                            quality={85}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.18),transparent_60%)]" />
                        )}
                      </div>
                    </Link>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="card-content p-8">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        {formatMonth(latest.monthIso)}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                        <Lang en={latest.titleEn} ta={latest.titleTa} taClassName="font-tamil" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang
                          en="Download the PDF for offline reading and easy sharing."
                          ta="ஆஃப்லைனில் படிக்கவும் எளிதில் பகிரவும் PDF-ஐ பதிவிறக்கம் செய்யுங்கள்."
                          taClassName="font-tamil"
                        />
                      </p>

                      <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Link href={href} className="btn btn-md btn-primary w-full">
                          <Lang en="Open issue" ta="இதழை திறக்க" taClassName="font-tamil" />
                        </Link>
                        <a href={latest.pdfHref} download className="btn btn-md btn-secondary w-full">
                          <Lang en="Download PDF" ta="PDF பதிவிறக்கம்" taClassName="font-tamil" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
