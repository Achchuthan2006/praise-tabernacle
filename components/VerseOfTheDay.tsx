import Image from "next/image"

import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import VerseLink from "@/components/ui/VerseLink"
import { siteConfig } from "@/lib/site"
import { tamilBibleVerseHref } from "@/lib/tamilBible"

type Verse = {
  languageLabel: string
  excerpt: string
  reference: string
  query: string
  version?: string
  href: string
  ctaLabel: string
  tamil?: boolean
}

export default function VerseOfTheDay({
  title = "Verse of the Day",
  subtitle = "A short daily encouragement",
  verses = defaultVerses,
  imageSrcs = siteConfig.verseImageSrcs,
}: {
  title?: string
  subtitle?: string
  verses?: [Verse, Verse]
  imageSrcs?: readonly string[]
}) {
  return (
    <section className="bg-churchBlueSoft" id="verse-of-the-day">
      <Container className="section-padding">
        <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12 fade-up">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">Daily</div>
              <h2 className="section-heading votd-heading">{title}</h2>
              <p className="mt-1 text-sm text-churchBlue/70">{subtitle}</p>
            </div>
            <p className="text-xs text-churchBlue/60">
              Short excerpt only. Read the full verse on Bible.com (English) and TamilChristianSongs.in (Tamil).
            </p>
          </div>

          {imageSrcs.length ? (
            <>
              <div className="mt-8 sm:hidden">
                <Reveal>
                  <div className="votd-image-card verse-card group overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                    <div className="relative aspect-[16/9] w-full">
                      <div className="votd-image-sheen" aria-hidden="true" />
                      <Image
                        src={imageSrcs[0]}
                        alt="Verse of the Day featured background image"
                        fill
                        sizes="100vw"
                        className="votd-image object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2">
                {imageSrcs.map((src, idx) => (
                  <Reveal key={src} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                    <div className="votd-image-card verse-card group overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                      <div className="relative aspect-[16/9] w-full">
                        <div className="votd-image-sheen" aria-hidden="true" />
                        <Image
                          src={src}
                          alt="Verse of the Day background image"
                          fill
                          sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
                          className="votd-image object-cover"
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {verses.map((v, idx) => (
              <Reveal key={`${v.languageLabel}-${v.reference}`} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                <article className="votd-verse-card rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-7">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={[
                      "rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80",
                      v.tamil ? "font-tamil" : "",
                    ].join(" ")}
                  >
                    {v.languageLabel}
                  </span>
                  <VerseLink
                    query={v.query}
                    version={v.version}
                    href={v.href}
                    label={v.reference}
                    tamil={v.tamil}
                    aria-label={
                      v.tamil
                        ? `தமிழ் வசனத்தைத் திற: ${v.reference} (TamilChristianSongs.in)`
                        : `Open ${v.reference} on Bible.com`
                    }
                    title={v.tamil ? "தமிழில் திற (TamilChristianSongs.in)" : "Open on Bible.com"}
                  />
                </div>

                <p
                  className={[
                    "mt-5 text-base leading-relaxed text-churchBlue sm:text-[17px]",
                    v.tamil ? "font-tamil" : "",
                  ].join(" ")}
                >
                  {v.excerpt}
                </p>

                <a
                  href={v.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary mt-7 w-full"
                >
                  {v.ctaLabel}
                </a>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

const defaultVerses: [Verse, Verse] = [
  {
    languageLabel: "English",
    excerpt: "“For God so loved the world…”",
    reference: "John 3:16 (NIV)",
    query: "John 3:16",
    version: "NIV",
    href: "https://www.bible.com/search/bible?q=John%203%3A16&version=NIV",
    ctaLabel: "Read Full Verse (English)",
  },
  {
    languageLabel: "தமிழ்",
    excerpt: "“தேவன் உலகத்தை இவ்வளவாய் நேசித்தார்…”",
    reference: "யோவான் 3:16",
    query: "யோவான் 3:16",
    href: tamilBibleVerseHref("john", 3, 16),
    ctaLabel: "முழு வசனத்தை வாசிக்க",
    tamil: true,
  },
]
