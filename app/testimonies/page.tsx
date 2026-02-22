import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { listTestimonialsNewestFirst } from "@/lib/testimonials"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Testimonies",
  description: "Video and story testimonies from our church community.",
  path: "/testimonies",
})

export default function TestimoniesPage() {
  const items = listTestimonialsNewestFirst()
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Testimony")}`

  return (
    <>
      <PageHeader
        titleEn="Testimonies"
        titleTa="சாட்சிகள்"
        descriptionEn="Before/after stories and video testimonies from our community."
        descriptionTa="எங்கள் சமூகத்திலிருந்து முன்பு/பிறகு சாட்சிகளும் வீடியோ சாட்சிகளும்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-7 shadow-glow md:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                  <Lang en="Share what God has done" ta="தேவன் செய்ததை பகிருங்கள்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="If you’d like to share a testimony (written or video), email us. With your permission, we can add it here to encourage others."
                    ta="நீங்கள் ஒரு சாட்சியை (எழுத்து அல்லது வீடியோ) பகிர விரும்பினால் மின்னஞ்சல் செய்யுங்கள். உங்கள் அனுமதியுடன் அதை இங்கே சேர்க்கலாம்."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <a href={mailto} className="btn btn-md btn-primary">
                    <Lang en="Email us" ta="மின்னஞ்சல்" taClassName="font-tamil" />
                  </a>
                  <Link href="/prayer-wall" className="btn btn-md btn-secondary">
                    <Lang en="Prayer wall" ta="ஜெபச் சுவர்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t, idx) => (
                <Reveal key={t.slug} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                  <Link
                    href={t.youtubeVideoId ? `/testimonies/${t.slug}?play=1` : `/testimonies/${t.slug}`}
                    className="card group overflow-hidden focus-ring"
                  >
                    <div className="card-content p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        {t.categories.slice(0, 3).map((c) => (
                          <span
                            key={`${t.slug}-${c}`}
                            className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80"
                          >
                            {c}
                          </span>
                        ))}
                        {t.dateIso ? (
                          <span className="text-xs font-semibold tracking-wide text-churchBlue/55">{t.dateIso}</span>
                        ) : null}
                      </div>
                      <div className="mt-3 text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en={t.titleEn} ta={t.titleTa} taClassName="font-tamil" />
                      </div>
                      {t.quote ? (
                        <div className="mt-3 text-sm leading-relaxed text-churchBlue/75 line-clamp-3">
                          &ldquo;{t.quote}&rdquo;
                        </div>
                      ) : null}
                      {t.beforeEn || t.afterEn ? (
                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          <div className="rounded-2xl border border-churchBlue/10 bg-white p-3">
                            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                              <Lang en="Before" ta="முன்பு" taClassName="font-tamil" />
                            </div>
                            <div className="mt-1 text-sm text-churchBlue/75 line-clamp-2">
                              <Lang en={t.beforeEn ?? ""} ta={t.beforeTa ?? t.beforeEn ?? ""} taClassName="font-tamil" />
                            </div>
                          </div>
                          <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-3">
                            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                              <Lang en="After" ta="பிறகு" taClassName="font-tamil" />
                            </div>
                            <div className="mt-1 text-sm text-churchBlue/75 line-clamp-2">
                              <Lang en={t.afterEn ?? ""} ta={t.afterTa ?? t.afterEn ?? ""} taClassName="font-tamil" />
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-6">
                        <div className="btn btn-sm btn-primary w-full">
                          <Lang en={t.youtubeVideoId ? "Watch" : "Read"} ta={t.youtubeVideoId ? "பார்க்க" : "படிக்க"} taClassName="font-tamil" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
