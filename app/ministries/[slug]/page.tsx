import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import Lang from "@/components/language/Lang"
import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import MinistryRegistrationForm from "@/components/MinistryRegistrationForm"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { ministryBySlug } from "@/lib/ministries"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { joinWithBullet, normalizeBullets } from "@/lib/text"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return Array.from(ministryBySlug.keys()).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ministry = ministryBySlug.get(params.slug)
  if (!ministry) return { title: "Ministry" }
  return pageMetadata({
    title: ministry.nameEn,
    description: ministry.summaryEn,
    path: `/ministries/${ministry.slug}`,
  })
}

export default function MinistryPage({ params }: { params: { slug: string } }) {
  const ministry = ministryBySlug.get(params.slug)
  if (!ministry) notFound()

  const videoId = (ministry.youtubeVideoId ?? "").trim()
  const playlistId = (ministry.youtubePlaylistId ?? "").trim()
  const programOptions =
    ministry.programs?.map((p) => ({ labelEn: p.titleEn, labelTa: p.titleTa })) ?? []
  const hasPrograms = Boolean(ministry.programs?.length)
  const hasSafety = Boolean(ministry.safetyNotesEn?.length)
  const hasPhotos = Boolean(ministry.gallery?.length)
  const hasRegistration = Boolean(programOptions.length)

  return (
    <>
      <PageHeader
        titleEn={ministry.nameEn}
        titleTa={ministry.nameTa}
        descriptionEn={ministry.summaryEn}
        descriptionTa={ministry.summaryTa}
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-10">
                <div className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                  <div className="relative aspect-[16/7] w-full">
                    <Image
                      src={ministry.photoSrc ?? "/event-teaching.svg"}
                      alt={ministry.nameEn}
                      width={1600}
                      height={700}
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {ministry.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en={ministry.detailsEn ?? ministry.summaryEn}
                    ta={ministry.detailsTa ?? ministry.summaryTa}
                    taClassName="font-tamil"
                  />
                </div>

                {videoId || playlistId ? (
                  <div className="mt-8 overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                    <div className="aspect-video w-full bg-churchBlueSoft">
                      {videoId ? (
                        <YouTubeLiteEmbed
                          kind="video"
                          videoId={videoId}
                          title={`${ministry.nameEn} - Praise Tabernacle`}
                          load="click"
                          posterQuality="hq"
                        />
                      ) : (
                        <YouTubeLiteEmbed
                          kind="playlist"
                          playlistId={playlistId}
                          title={`${ministry.nameEn} - Playlist`}
                          load="click"
                        />
                      )}
                    </div>
                  </div>
                ) : null}

                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Meeting time" ta="நேரம்" taClassName="font-tamil" />
                    </dt>
                    <dd className="mt-2 text-sm text-churchBlue/80">{ministry.meetingTimeEn}</dd>
                    <dd className="mt-1 text-sm text-churchBlue/70 font-tamil">
                      {ministry.meetingTimeTa}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Location" ta="இடம்" taClassName="font-tamil" />
                    </dt>
                    <dd className="mt-2 text-sm text-churchBlue/80">{ministry.locationEn}</dd>
                    <dd className="mt-1 text-sm text-churchBlue/70 font-tamil">
                      {ministry.locationTa}
                    </dd>
                  </div>
                </dl>

                {hasPrograms || hasSafety || hasPhotos || hasRegistration ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {hasPrograms ? (
                      <a href="#programs" className="btn btn-sm btn-secondary">
                        <Lang en="Programs" ta="திட்டங்கள்" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    {hasSafety ? (
                      <a href="#safety" className="btn btn-sm btn-secondary">
                        <Lang en="Safety" ta="பாதுகாப்பு" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    {hasPhotos ? (
                      <a href="#photos" className="btn btn-sm btn-secondary">
                        <Lang en="Photos" ta="புகைப்படங்கள்" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    {hasRegistration ? (
                      <a href="#register" className="btn btn-sm btn-primary">
                        <Lang en="Register" ta="பதிவு" taClassName="font-tamil" />
                      </a>
                    ) : null}
                  </div>
                ) : null}

                {ministry.programs?.length ? (
                  <div id="programs" className="mt-8 scroll-mt-24">
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang en="Age-specific programs" ta="வயது சார்ந்த திட்டங்கள்" taClassName="font-tamil" />
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {ministry.programs.map((p) => (
                        <div key={p.titleEn} className="rounded-2xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-churchBlue">
                                <Lang en={p.titleEn} ta={p.titleTa} taClassName="font-tamil" />
                              </div>
                              <div className="mt-1 text-xs font-semibold text-churchBlue/60">
                                <Lang en={p.ageRangeEn} ta={p.ageRangeTa} taClassName="font-tamil" />
                              </div>
                            </div>
                            <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                              <Lang en={p.timeEn} ta={p.timeTa} taClassName="font-tamil" />
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-churchBlue/75">
                            <Lang en={p.descriptionEn} ta={p.descriptionTa} taClassName="font-tamil" />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {ministry.safetyNotesEn?.length ? (
                  <div id="safety" className="mt-8 scroll-mt-24 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang en="Safety & care" ta="பாதுகாப்பு & கவனம்" taClassName="font-tamil" />
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                      {ministry.safetyNotesEn.map((item, idx) => (
                        <li key={item}>
                          <Lang en={item} ta={ministry.safetyNotesTa?.[idx] ?? ""} taClassName="font-tamil" />
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-churchBlue/60">
                      <Lang
                        en="Read our full children & youth safety policy."
                        ta="முழு குழந்தைகள் & இளையோர் பாதுகாப்பு கொள்கையை படிக்கவும்."
                        taClassName="font-tamil"
                      />{" "}
                      <Link href="/learn/community-safety" className="underline underline-offset-2">
                        <Lang en="Community safety" ta="Community safety" />
                      </Link>
                    </p>
                  </div>
                ) : null}

                {ministry.gallery?.length ? (
                  <div id="photos" className="mt-8 scroll-mt-24">
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang en="Recent photos" ta="சமீபத்திய புகைப்படங்கள்" taClassName="font-tamil" />
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {ministry.gallery.map((photo) => (
                        <div key={photo.src} className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-white shadow-glow">
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 220px"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {programOptions.length ? (
                  <div id="register" className="mt-10 scroll-mt-24">
                    <MinistryRegistrationForm
                      ministryNameEn={ministry.nameEn}
                      ministryNameTa={ministry.nameTa}
                      programOptions={programOptions}
                    />
                  </div>
                ) : null}

                {ministry.whatToExpectEn?.length ? (
                  <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang en="What to expect" ta="எதை எதிர்பார்க்கலாம்" taClassName="font-tamil" />
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                      {ministry.whatToExpectEn.map((item, idx) => (
                        <li key={item}>
                          <Lang en={item} ta={ministry.whatToExpectTa?.[idx] ?? ""} taClassName="font-tamil" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {ministry.nextStepsEn?.length ? (
                  <div className="mt-6 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang en="Simple next steps" ta="எளிய அடுத்த படிகள்" taClassName="font-tamil" />
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                      {ministry.nextStepsEn.map((item, idx) => (
                        <li key={item}>
                          <Lang en={item} ta={ministry.nextStepsTa?.[idx] ?? ""} taClassName="font-tamil" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 border-t border-churchBlue/10 pt-8">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="Contact" ta="தொடர்பு" taClassName="font-tamil" />
                  </div>
                  <p className="mt-2 text-sm text-churchBlue/75">
                    {ministry.contactName} •{" "}
                    <a
                      className="underline underline-offset-2"
                      href={`mailto:${ministry.contactEmail}?subject=${encodeURIComponent(
                        `${ministry.nameEn} - Connect`,
                      )}`}
                    >
                      {ministry.contactEmail}
                    </a>
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn btn-md btn-primary">
                    <Lang en="Request to join" ta="சேர கோருங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/events" className="btn btn-md btn-secondary">
                    <Lang en="View upcoming events" ta="வரவிருக்கும் நிகழ்வுகள்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={1} className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow">
                <h2 className="text-xl font-semibold tracking-tight text-churchBlue">New here?</h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  If you&apos;re visiting for the first time, we&apos;d love to welcome you. Service
                  times:{" "}
                  {joinWithBullet(siteConfig.serviceTimes.map((s) => normalizeBullets(s.time)))}.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/visit" className="btn btn-md btn-primary">
                    Plan Your Visit
                  </Link>
                  <Link href="/sermons" className="btn btn-md btn-secondary">
                    Watch Online
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
