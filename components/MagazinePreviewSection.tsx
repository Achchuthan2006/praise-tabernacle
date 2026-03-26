import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { formatMonthIso } from "@/lib/dates"
import { hasPublicAsset, listMagazineIssuesNewestFirst } from "@/lib/magazine"

export default function MagazinePreviewSection() {
  const latest = listMagazineIssuesNewestFirst()[0]
  if (!latest) return null

  const href = `/magazine/${latest.slug}`
  const cover = (latest.coverImageSrc ?? "").trim()
  const pdfReady = hasPublicAsset(latest.pdfHref)

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
                    en="Pastor's message, upcoming events, testimonies, and teaching articles in one place."
                    ta="போதகரின் செய்தி, வரவிருக்கும் நிகழ்வுகள், சாட்சிகள், மற்றும் போதனை கட்டுரைகள் அனைத்தும் ஒரே இடத்தில்."
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
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-5/12">
                    <Link href={href} className="group block focus-ring" aria-label={latest.titleEn}>
                      <div className="relative aspect-[4/3] w-full bg-churchBlueSoft">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={`${latest.titleEn} magazine cover`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                            quality={75}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.18),transparent_60%)]" />
                        )}
                      </div>
                    </Link>
                  </div>

                  <div className="md:w-7/12">
                    <div className="card-content p-8">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        {formatMonthIso(latest.monthIso)}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                        <Lang en={latest.titleEn} ta={latest.titleTa} taClassName="font-tamil" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang
                          en={pdfReady ? "Open the issue online or download the PDF for offline reading." : "The issue page is ready. Add the PDF file to enable online reading and download."}
                          ta={pdfReady ? "ஆன்லைனில் இதழை திறக்கலாம் அல்லது ஆஃப்லைனில் படிக்க PDF-ஐ பதிவிறக்கம் செய்யலாம்." : "இதழ் பக்கம் தயாராக உள்ளது. ஆன்லைன் பார்வையும் பதிவிறக்கமும் செயல்பட PDF கோப்பை சேர்க்கவும்."}
                          taClassName="font-tamil"
                        />
                      </p>

                      <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Link href={href} className="btn btn-md btn-primary w-full">
                          <Lang en="Open issue" ta="இதழை திறக்க" taClassName="font-tamil" />
                        </Link>
                        {pdfReady ? (
                          <a href={latest.pdfHref} download className="btn btn-md btn-secondary w-full">
                            <Lang en="Download PDF" ta="PDF பதிவிறக்கம்" taClassName="font-tamil" />
                          </a>
                        ) : (
                          <span className="btn btn-md btn-secondary-soft w-full cursor-default opacity-80">
                            <Lang en="PDF coming soon" ta="PDF விரைவில் வரும்" taClassName="font-tamil" />
                          </span>
                        )}
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
