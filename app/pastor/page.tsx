import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import Lang from "@/components/language/Lang"
import PastorProfileImage from "@/components/PastorProfileImage"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import { pastorProfile } from "@/lib/pastor"
import { pageMetadata, pastorJsonLd } from "@/lib/seo"
import { publicSermons } from "@/lib/sermons"

export const metadata: Metadata = pageMetadata({
  title: "Pastor",
  description: "Meet our pastor and leadership at Praise Tabernacle.",
  path: "/pastor",
})

function getSermonThumb(videoId?: string) {
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "/sermons/series-welcome.svg"
}

export default function PastorPage() {
  const hasEducation = pastorProfile.educationEn.length > 0
  const hasCredentials = pastorProfile.credentialsEn.length > 0
  const hasYearsOfService = Boolean(pastorProfile.yearsOfServiceEn || pastorProfile.yearsOfServiceTa)
  const recentSermons = publicSermons.slice(0, 3)
  const pastorSchema = pastorJsonLd(pastorProfile)

  return (
    <>
      <Script
        id="schema-org-pastor"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pastorSchema) }}
      />
      <PageHeader
        titleEn="Pastor"
        titleTa="போதகர்"
        descriptionEn="Pastoral care with a calm, respectful, and family-friendly heart."
        descriptionTa="அமைதி, மரியாதை, மற்றும் குடும்ப அக்கறையுடன் கூடிய மேய்ப்புப் பராமரிப்பு."
      />

      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
            <div>
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                  <div className="relative aspect-[4/5] w-full bg-churchBlueSoft">
                    <PastorProfileImage
                      src={pastorProfile.photoSrc}
                      fallbackSrc={pastorProfile.photoFallbackSrc}
                      alt={pastorProfile.nameEn}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={1} className="mt-6">
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                  <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                    <Lang en="Contact & availability" ta="தொடர்பு மற்றும் கிடைப்புத் தகவல்" taClassName="font-tamil" />
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Email</div>
                      <a
                        href={`mailto:${pastorProfile.contactEmail}`}
                        className="mt-1 inline-flex text-sm font-semibold text-churchBlue underline underline-offset-2"
                      >
                        {pastorProfile.contactEmail}
                      </a>
                    </div>

                    <div className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Appointments" ta="சந்திப்பு" taClassName="font-tamil" />
                      </div>
                      <div className="mt-1 text-sm text-churchBlue/75">
                        <Lang
                          en={pastorProfile.officeHoursEn ?? ""}
                          ta={pastorProfile.officeHoursTa ?? ""}
                          taClassName="font-tamil"
                        />
                      </div>
                    </div>

                    {hasYearsOfService ? (
                      <div className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          <Lang en="Years of service" ta="சேவை ஆண்டுகள்" taClassName="font-tamil" />
                        </div>
                        <div className="mt-1 text-sm font-semibold text-churchBlue">
                          <Lang
                            en={pastorProfile.yearsOfServiceEn ?? ""}
                            ta={pastorProfile.yearsOfServiceTa ?? ""}
                            taClassName="font-tamil"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                    <Lang en={pastorProfile.nameEn} ta={pastorProfile.nameTa} taClassName="font-tamil" />
                  </h2>
                  <div className="mt-2 text-sm font-semibold text-churchBlue/70">
                    <Lang en={pastorProfile.roleEn} ta={pastorProfile.roleTa} taClassName="font-tamil" />
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-churchBlue/75 sm:text-base">
                    {pastorProfile.bioEn.map((p, idx) => (
                      <p key={idx}>
                        <Lang en={p} ta={pastorProfile.bioTa[idx] ?? ""} taClassName="font-tamil" />
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="btn btn-md btn-primary">
                      <Lang en="Message the pastor" ta="போதகருக்கு செய்தி அனுப்புங்கள்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/sermons" className="btn btn-md btn-secondary">
                      <Lang en="Browse sermons" ta="பிரசங்கங்களைப் பாருங்கள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={1} className="mt-8">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                  <h3 className="text-base font-semibold text-churchBlue">
                    <Lang en="Ministry focus" ta="ஊழியத்தின் கவனம்" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-4 grid gap-3 text-sm text-churchBlue/75 sm:grid-cols-2">
                    {pastorProfile.ministryFocusEn.map((item, idx) => (
                      <li key={item} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                        <Lang en={item} ta={pastorProfile.ministryFocusTa[idx] ?? ""} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {pastorProfile.introVideoId ? (
                <Reveal delay={2} className="mt-8">
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <h3 className="text-base font-semibold text-churchBlue">
                      <Lang en="Pastor introduction" ta="போதகர் அறிமுகம்" taClassName="font-tamil" />
                    </h3>
                    <div className="mt-4 overflow-hidden rounded-3xl border border-churchBlue/10 bg-churchBlueSoft">
                      <div className="aspect-video w-full">
                        <YouTubeLiteEmbed
                          kind="video"
                          videoId={pastorProfile.introVideoId}
                          title={`${pastorProfile.nameEn} introduction`}
                          load="visible"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={2} className="mt-8">
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Recent messages" ta="சமீபத்திய செய்திகள்" taClassName="font-tamil" />
                      </div>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-churchBlue">
                        <Lang en="Latest sermons from our church pulpit" ta="எங்கள் சபையின் சமீபத்திய பிரசங்கங்கள்" taClassName="font-tamil" />
                      </h3>
                    </div>
                    <Link href="/sermons" className="btn btn-sm btn-secondary">
                      <Lang en="Open sermon archive" ta="பிரசங்க களஞ்சியத்தைத் திற" taClassName="font-tamil" />
                    </Link>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {recentSermons.map((sermon) => (
                      <article key={sermon.slug} className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-white shadow-glow">
                        <Link href={`/sermons/${sermon.slug}`} className="block">
                          <div className="relative aspect-video w-full bg-churchBlueSoft">
                            <Image
                              src={getSermonThumb(sermon.youtubeVideoId)}
                              alt={sermon.title}
                              fill
                              sizes="(min-width: 768px) 30vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div className="p-4">
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{sermon.dateIso}</div>
                          <h4 className="mt-2 text-sm font-semibold text-churchBlue">
                            <Link href={`/sermons/${sermon.slug}`} className="focus-ring rounded-lg">
                              {sermon.title}
                            </Link>
                          </h4>
                          <div className="mt-3">
                            <Link href={`/sermons/${sermon.slug}`} className="btn btn-sm btn-secondary w-full">
                              <Lang en="Watch sermon" ta="பிரசங்கத்தைப் பாருங்கள்" taClassName="font-tamil" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>

              {hasEducation || hasCredentials ? (
                <Reveal delay={3} className="mt-8">
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <h3 className="text-base font-semibold text-churchBlue">
                      <Lang en="Credentials & background" ta="தகுதிகள் மற்றும் பின்னணி" taClassName="font-tamil" />
                    </h3>
                    <div className="mt-4 grid gap-6 sm:grid-cols-2">
                      {hasEducation ? (
                        <div>
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                            <Lang en="Education" ta="கல்வி" taClassName="font-tamil" />
                          </div>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                            {pastorProfile.educationEn.map((item, idx) => (
                              <li key={item}>
                                <Lang en={item} ta={pastorProfile.educationTa[idx] ?? ""} taClassName="font-tamil" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {hasCredentials ? (
                        <div>
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                            <Lang en="Credentials" ta="தகுதிகள்" taClassName="font-tamil" />
                          </div>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                            {pastorProfile.credentialsEn.map((item, idx) => (
                              <li key={item}>
                                <Lang en={item} ta={pastorProfile.credentialsTa[idx] ?? ""} taClassName="font-tamil" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
