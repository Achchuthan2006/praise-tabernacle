import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { formatMonthIso } from "@/lib/dates"
import { getAllMagazineIssueSlugs, getMagazineIssueBySlug, hasPublicAsset } from "@/lib/magazine"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

function languageLabel(lang: "en" | "ta" | "both") {
  if (lang === "both") return "EN + TA"
  return lang.toUpperCase()
}

export function generateStaticParams() {
  return getAllMagazineIssueSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const issue = getMagazineIssueBySlug(params.slug)
  if (!issue) return { title: "Magazine" }

  return pageMetadata({
    title: issue.titleEn,
    description: `Digital magazine for ${formatMonthIso(issue.monthIso)}.`,
    path: `/magazine/${issue.slug}`,
    image: issue.coverImageSrc ?? siteConfig.branding.logoEnBgSrc,
  })
}

export default function MagazineIssuePage({ params }: { params: { slug: string } }) {
  const issue = getMagazineIssueBySlug(params.slug)
  if (!issue) notFound()

  const cover = (issue.coverImageSrc ?? "").trim()
  const monthLabel = formatMonthIso(issue.monthIso)
  const pdfReady = hasPublicAsset(issue.pdfHref)

  return (
    <>
      <PageHeader
        titleEn={issue.titleEn}
        titleTa={issue.titleTa}
        descriptionEn={`${monthLabel} • ${languageLabel(issue.language)}`}
        descriptionTa={`${monthLabel} • ${languageLabel(issue.language)}`}
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <article className="card overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/9] w-full bg-churchBlueSoft">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={issue.titleEn}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover"
                          quality={80}
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(32rem_20rem_at_15%_0%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(26rem_18rem_at_85%_90%,rgba(var(--accent-gold),0.18),transparent_60%)]" />
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="card-content p-8">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{monthLabel}</div>
                      <div className="mt-2 inline-flex items-center rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                        {languageLabel(issue.language)}
                      </div>

                      <div className="mt-6 grid gap-2">
                        {pdfReady ? (
                          <>
                            <a
                              href={issue.pdfHref}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-md btn-primary w-full"
                            >
                              <Lang en="Open PDF" ta="PDF திறக்க" taClassName="font-tamil" />
                            </a>
                            <a href={issue.pdfHref} download className="btn btn-md btn-secondary w-full">
                              <Lang en="Download PDF" ta="PDF பதிவிறக்கம்" taClassName="font-tamil" />
                            </a>
                          </>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-churchBlue/20 bg-churchBlueSoft/50 p-4 text-sm text-churchBlue/75">
                            <Lang
                              en="The issue page is ready, but the PDF file has not been added to public/magazine yet."
                              ta="இதழ் பக்கம் தயாராக உள்ளது, ஆனால் PDF கோப்பு இன்னும் public/magazine உள்ளே சேர்க்கப்படவில்லை."
                              taClassName="font-tamil"
                            />
                          </div>
                        )}
                        <Link href="/magazine" className="btn btn-md btn-secondary-soft w-full">
                          <Lang en="All issues" ta="அனைத்து இதழ்கள்" taClassName="font-tamil" />
                        </Link>
                      </div>

                      <div className="mt-8 space-y-3 text-sm text-churchBlue/75">
                        <div className="font-semibold text-churchBlue">
                          <Lang en="Quick links" ta="விரைவு இணைப்புகள்" taClassName="font-tamil" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Link href="/events" className="btn btn-sm btn-secondary">
                            <Lang en="Events" ta="நிகழ்வுகள்" taClassName="font-tamil" />
                          </Link>
                          <Link href="/testimonies" className="btn btn-sm btn-secondary">
                            <Lang en="Testimonies" ta="சாட்சிகள்" taClassName="font-tamil" />
                          </Link>
                          <Link href="/blog" className="btn btn-sm btn-secondary">
                            <Lang en="Teaching" ta="போதனை" taClassName="font-tamil" />
                          </Link>
                          <Link href="/sermons" className="btn btn-sm btn-secondary">
                            <Lang en="Sermons" ta="பிரசங்கங்கள்" taClassName="font-tamil" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            {pdfReady ? (
              <div className="mt-10">
                <Reveal>
                  <div className="card overflow-hidden">
                    <div className="card-content p-0">
                      <div className="flex items-center justify-between border-b border-churchBlue/10 px-6 py-4">
                        <div>
                          <div className="text-lg font-semibold tracking-tight text-churchBlue">
                            <Lang en="Read online" ta="ஆன்லைனில் படிக்க" taClassName="font-tamil" />
                          </div>
                          <p className="mt-1 text-sm text-churchBlue/70">
                            <Lang en="Viewer for this month's issue." ta="இந்த மாத இதழுக்கான பார்வையாளர்." taClassName="font-tamil" />
                          </p>
                        </div>
                        <a href={issue.pdfHref} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                          <Lang en="Open in new tab" ta="புதிய தாவலில் திறக்க" taClassName="font-tamil" />
                        </a>
                      </div>
                      <iframe
                        title={`${issue.titleEn} PDF viewer`}
                        src={`${issue.pdfHref}#view=FitH`}
                        className="h-[72vh] w-full"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            ) : null}

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="card">
                    <div className="card-content p-8">
                      <h2 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                        <Lang
                          en={issue.pastorMessageTitleEn ?? "Pastor's message"}
                          ta={issue.pastorMessageTitleTa ?? "போதகரின் செய்தி"}
                          taClassName="font-tamil"
                        />
                      </h2>

                      <div className="mt-4 space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        {issue.pastorMessageEn || issue.pastorMessageTa ? (
                          <>
                            {issue.pastorMessageEn ? <p>{issue.pastorMessageEn}</p> : null}
                            {issue.pastorMessageTa ? <p className="font-tamil">{issue.pastorMessageTa}</p> : null}
                          </>
                        ) : (
                          <p>
                            <Lang
                              en="This issue is ready to download. Add a short pastor's message in lib/magazine.ts to show it here."
                              ta="இந்த இதழுக்கான சிறிய போதகரின் செய்தியை lib/magazine.ts-இல் சேர்த்தால் இங்கே காட்டப்படும்."
                              taClassName="font-tamil"
                            />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={1}>
                  <div className="card">
                    <div className="card-content p-8">
                      <h2 className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="Inside this issue" ta="இந்த இதழில்" taClassName="font-tamil" />
                      </h2>

                      {issue.highlightsEn?.length || issue.highlightsTa?.length ? (
                        <div className="mt-4 space-y-4">
                          {issue.highlightsEn?.length ? (
                            <ul className="list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                              {issue.highlightsEn.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                          {issue.highlightsTa?.length ? (
                            <ul className="list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base font-tamil">
                              {issue.highlightsTa.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-churchBlue/70 sm:text-base">
                          <Lang
                            en="Add highlights in lib/magazine.ts to list what's included each month."
                            ta="ஒவ்வொரு மாதமும் இதில் என்ன உள்ளது என்பதை காண lib/magazine.ts-இல் highlights சேர்க்கலாம்."
                            taClassName="font-tamil"
                          />
                        </p>
                      )}

                      {(issue.teachingArticles?.length || issue.testimonies?.length) && (
                        <div className="mt-8 border-t border-churchBlue/10 pt-6">
                          <div className="grid gap-5 sm:grid-cols-2">
                            {issue.teachingArticles?.length ? (
                              <div>
                                <div className="text-sm font-semibold text-churchBlue">
                                  <Lang en="Teaching" ta="போதனை" taClassName="font-tamil" />
                                </div>
                                <div className="mt-3 flex flex-col gap-2">
                                  {issue.teachingArticles.map((a) => (
                                    <Link key={a.href} href={a.href} className="btn btn-sm btn-secondary">
                                      {a.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            {issue.testimonies?.length ? (
                              <div>
                                <div className="text-sm font-semibold text-churchBlue">
                                  <Lang en="Testimonies" ta="சாட்சிகள்" taClassName="font-tamil" />
                                </div>
                                <div className="mt-3 flex flex-col gap-2">
                                  {issue.testimonies.map((t) => (
                                    <Link key={t.href} href={t.href} className="btn btn-sm btn-secondary">
                                      {t.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
