import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { getAllMagazineIssueSlugs, getMagazineIssueBySlug } from "@/lib/magazine"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

function formatMonth(monthIso: string) {
  const [y, m] = monthIso.split("-").map((v) => Number(v))
  if (!y || !m) return monthIso
  const d = new Date(Date.UTC(y, m - 1, 1))
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" }).format(d)
}

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
    description: `Digital magazine for ${formatMonth(issue.monthIso)}.`,
    path: `/magazine/${issue.slug}`,
    image: issue.coverImageSrc ?? siteConfig.branding.logoEnBgSrc,
  })
}

export default function MagazineIssuePage({ params }: { params: { slug: string } }) {
  const issue = getMagazineIssueBySlug(params.slug)
  if (!issue) notFound()

  const cover = (issue.coverImageSrc ?? "").trim()
  const monthLabel = formatMonth(issue.monthIso)

  return (
    <>
      <PageHeader
        titleEn={issue.titleEn}
        titleTa={issue.titleTa}
        descriptionEn={`${monthLabel} • ${languageLabel(issue.language)}`}
        descriptionTa=""
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
                          quality={90}
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
                        <a
                          href={issue.pdfHref}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-md btn-primary w-full"
                        >
                          <Lang en="Open PDF" ta="PDF à®¤à®¿à®±à®•à¯à®•" taClassName="font-tamil" />
                        </a>
                        <a href={issue.pdfHref} download className="btn btn-md btn-secondary w-full">
                          <Lang en="Download PDF" ta="PDF à®ªà®¤à®¿à®µà®¿à®±à®•à¯à®•à®®à¯" taClassName="font-tamil" />
                        </a>
                        <Link href="/magazine" className="btn btn-md btn-secondary-soft w-full">
                          <Lang en="All issues" ta="à®…à®©à¯ˆà®¤à¯à®¤à¯ à®‡à®¤à®´à¯à®•à®³à¯" taClassName="font-tamil" />
                        </Link>
                      </div>

                      <div className="mt-8 space-y-3 text-sm text-churchBlue/75">
                        <div className="font-semibold text-churchBlue">
                          <Lang en="Quick links" ta="à®µà®¿à®°à¯ˆà®µà¯ à®‡à®£à¯ˆà®ªà¯à®ªà¯à®•à®³à¯" taClassName="font-tamil" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Link href="/events" className="btn btn-sm btn-secondary">
                            <Lang en="Events" ta="à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯" taClassName="font-tamil" />
                          </Link>
                          <Link href="/testimonies" className="btn btn-sm btn-secondary">
                            <Lang en="Testimonies" ta="à®šà®¾à®Ÿà¯à®šà®¿à®•à®³à¯" taClassName="font-tamil" />
                          </Link>
                          <Link href="/blog" className="btn btn-sm btn-secondary">
                            <Lang en="Teaching" ta="à®ªà¯‹à®¤à®©à¯ˆ" taClassName="font-tamil" />
                          </Link>
                          <Link href="/sermons" className="btn btn-sm btn-secondary">
                            <Lang en="Sermons" ta="à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="card">
                    <div className="card-content p-8">
                      <h2 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                        <Lang
                          en={issue.pastorMessageTitleEn ?? "Pastor’s message"}
                          ta={issue.pastorMessageTitleTa ?? "à®ªà¯‹à®¤à®•à®°à®¿à®©à¯ à®šà¯†à®¯à¯à®¤à®¿"}
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
                              en="This issue is ready to download. Add a short pastor’s message in lib/magazine.ts to show it here."
                              ta="à®‡à®¨à¯à®¤ à®‡à®¤à®´à¯ à®ªà®¤à®¿à®µà®¿à®±à®•à¯à®•à®®à¯ à®šà¯†à®¯à¯à®¯ à®¤à®¯à®¾à®°à®¾à®•à®¿à®°à¯à®•à¯à®•à®¿à®±à®¤à¯. à®‡à®™à¯à®•à¯‡ à®•à®¾à®£ `lib/magazine.ts` à®‡à®²à¯ à®•à¯à®±à¯à®®à¯ à®ªà¯‹à®¤à®•à®°à®¿à®©à¯ à®šà¯†à®¯à¯à®¤à®¿à®¯à¯ˆ à®šà¯‡à®°à¯à®•à®•à¯à®•à®µà¯à®®à¯."
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
                        <Lang en="Inside this issue" ta="à®‡à®¤à®¿à®²à¯" taClassName="font-tamil" />
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
                            en="Add highlights in lib/magazine.ts to list what’s included each month."
                            ta="à®®à®¾à®¤à®®à¯ à®¤à¯‹à®±à¯à®®à¯ à®‡à®¤à®¿à®²à¯ à®Žà®©à¯à®© à®‰à®³à¯à®³à®¤à¯ à®Žà®©à¯à®ªà®¤à¯ˆ à®•à®¾à®£ `lib/magazine.ts` à®‡à®²à¯ highlights à®šà¯‡à®°à¯à®•à¯à®•à®µà¯à®®à¯."
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
                                  <Lang en="Teaching" ta="à®ªà¯‹à®¤à®©à¯ˆ" taClassName="font-tamil" />
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
                                  <Lang en="Testimonies" ta="à®šà®¾à®Ÿà¯à®šà®¿à®•à®³à¯" taClassName="font-tamil" />
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

