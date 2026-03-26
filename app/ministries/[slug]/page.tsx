import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Lang from "@/components/language/Lang"
import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import MinistryRegistrationForm from "@/components/MinistryRegistrationForm"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { ministryBySlug } from "@/lib/ministries"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { joinWithBullet, normalizeBullets } from "@/lib/text"

const ministrySlugAliases = new Map([
  ["children", "kids"],
  ["prayer", "prayer-care"],
  ["care", "prayer-care"],
  ["women", "womens"],
  ["men", "mens"],
])

const ministryDetailEnhancements = {
  outreach: {
    locationDetailsEn: [
      "Most outreach teams meet first in the church lobby for prayer and assignments.",
      "Serve locations vary across Mississauga depending on the project and partner organization.",
      "Volunteers receive the exact meetup address and arrival details before each outreach day.",
    ],
    locationDetailsTa: [
      "சமூக சேவை குழுக்கள் பொதுவாக முதலில் சபை லாபியில் ஜெபத்திற்கும் ஒழுங்கமைப்பிற்கும் கூடுகின்றன.",
      "சேவை இடங்கள் திட்டத்திற்கும் கூட்டாண்மை அமைப்பிற்கும் ஏற்ப மிசிசாகா முழுவதும் மாறுபடும்.",
      "ஒவ்வொரு சேவை நாளுக்கும் முன் துல்லியமான சந்திப்பு முகவரியும் வருகை விவரங்களும் அனுப்பப்படும்.",
    ],
    teamMembers: [
      {
        name: "Outreach Coordinator",
        roleEn: "Schedules projects and community partnerships",
        roleTa: "சேவை திட்டங்களும் சமூக கூட்டாண்மைகளும் ஒருங்கிணைப்பு",
        photoSrc: "/photos/home/church-front.webp",
        email: siteConfig.email,
      },
      {
        name: "Community Support Volunteers",
        roleEn: "Food support, visits, and practical care",
        roleTa: "உணவு உதவி, வீட்டு வருகைகள் மற்றும் நடைமுறை பராமரிப்பு",
        photoSrc: "/photos/home/adults-fellowship.webp",
        email: siteConfig.email,
      },
      {
        name: "Hospitality & Follow-up Team",
        roleEn: "Welcome, registration, and follow-up connection",
        roleTa: "வரவேற்பு, பதிவு மற்றும் பிந்தொடர்பு இணைப்பு",
        photoSrc: "/photos/home/church-life.webp",
        email: siteConfig.email,
      },
    ],
  },
  missions: {
    locationDetailsEn: [
      "Quarterly briefings are usually hosted on campus with online attendance available.",
      "Mission updates are shared during services and through dedicated prayer gatherings.",
      "Project-specific meeting points are provided when local mission trips or serve days are organized.",
    ],
    locationDetailsTa: [
      "காலாண்டு மிஷன் சந்திப்புகள் பொதுவாக சபை வளாகத்தில் நடைபெறும்; ஆன்லைனிலும் இணையும் வாய்ப்பு உள்ளது.",
      "மிஷன் செய்திகள் ஆராதனைகளிலும் தனிப்பட்ட ஜெப நேரங்களிலும் பகிரப்படுகின்றன.",
      "உள்ளூர் மிஷன் பயணங்கள் அல்லது சேவை நாட்கள் ஏற்பாடு செய்யப்படும் போது துல்லியமான சந்திப்பு விவரங்கள் வழங்கப்படும்.",
    ],
    teamMembers: [
      {
        name: "Missions Team",
        roleEn: "Mission prayer, planning, and partner communication",
        roleTa: "மிஷன் ஜெபம், திட்டமிடல் மற்றும் கூட்டாளர் தொடர்பு",
        photoSrc: "/photos/home/church-life.webp",
        email: siteConfig.email,
      },
      {
        name: "Prayer Partner Coordinators",
        roleEn: "Share updates and organize focused intercession",
        roleTa: "புதுப்பிப்புகளை பகிர்ந்து குறிக்கோள் ஜெபத்தை ஒருங்கிணைத்தல்",
        photoSrc: "/photos/home/church-front-2.webp",
        email: siteConfig.email,
      },
      {
        name: "Support & Communications",
        roleEn: "Giving communication and project follow-up",
        roleTa: "கொடையளிப்பு தகவல் பகிர்வு மற்றும் திட்ட பிந்தொடர்பு",
        photoSrc: "/photos/home/adults-fellowship.webp",
        email: siteConfig.email,
      },
    ],
  },
} as const

async function resolveSlug(params: Promise<{ slug: string }> | { slug: string }) {
  const value = await params
  return ministrySlugAliases.get(value.slug) ?? value.slug
}

export function generateStaticParams() {
  return Array.from(ministryBySlug.keys()).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = await resolveSlug(params)
  const ministry = ministryBySlug.get(slug)
  if (!ministry) return { title: "Ministry" }
  return pageMetadata({
    title: ministry.nameEn,
    description: ministry.summaryEn,
    path: `/ministries/${ministry.slug}`,
  })
}

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = await resolveSlug(params)
  const ministry = ministryBySlug.get(slug)
  if (!ministry) notFound()

  const videoId = (ministry.youtubeVideoId ?? "").trim()
  const playlistId = (ministry.youtubePlaylistId ?? "").trim()
  const programOptions =
    ministry.programs?.map((p) => ({ labelEn: p.titleEn, labelTa: p.titleTa })) ?? []
  const hasPrograms = Boolean(ministry.programs?.length)
  const hasSafety = Boolean(ministry.safetyNotesEn?.length)
  const hasPhotos = Boolean(ministry.gallery?.length)
  const hasRegistration = Boolean(programOptions.length)
  const enhancement = ministryDetailEnhancements[slug as keyof typeof ministryDetailEnhancements]
  const locationDetailsEn = ministry.locationDetailsEn ?? enhancement?.locationDetailsEn ?? []
  const locationDetailsTa = ministry.locationDetailsTa ?? enhancement?.locationDetailsTa ?? []
  const teamMembers = ministry.teamMembers ?? enhancement?.teamMembers ?? []
  const hasLocationDetails = Boolean(locationDetailsEn.length)
  const hasTeamMembers = Boolean(teamMembers.length)

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
            <Breadcrumbs
              className="mb-6"
              items={[
                { href: "/", labelEn: "Home", labelTa: "முகப்பு" },
                { href: "/ministries", labelEn: "Ministries", labelTa: "சேவைகள்" },
                { labelEn: ministry.nameEn, labelTa: ministry.nameTa },
              ]}
            />
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
                      quality={80}
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
                    <dd className="mt-1 text-sm font-tamil text-churchBlue/70">
                      {ministry.meetingTimeTa}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Location" ta="இடம்" taClassName="font-tamil" />
                    </dt>
                    <dd className="mt-2 text-sm text-churchBlue/80">{ministry.locationEn}</dd>
                    <dd className="mt-1 text-sm font-tamil text-churchBlue/70">
                      {ministry.locationTa}
                    </dd>
                  </div>
                </dl>

                {hasPrograms || hasSafety || hasPhotos || hasRegistration || hasLocationDetails || hasTeamMembers ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {hasLocationDetails ? (
                      <a href="#location-details" className="btn btn-sm btn-secondary">
                        <Lang en="Location details" ta="இட விவரங்கள்" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    {hasTeamMembers ? (
                      <a href="#team" className="btn btn-sm btn-secondary">
                        <Lang en="Ministry team" ta="சேவை குழு" taClassName="font-tamil" />
                      </a>
                    ) : null}
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

                {hasLocationDetails ? (
                  <div
                    id="location-details"
                    className="mt-8 scroll-mt-24 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6"
                  >
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang
                        en="Meeting location details"
                        ta="சந்திப்பு இட விவரங்கள்"
                        taClassName="font-tamil"
                      />
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                      {locationDetailsEn.map((item, idx) => (
                        <li key={item}>
                          <Lang en={item} ta={locationDetailsTa[idx] ?? ""} taClassName="font-tamil" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {hasTeamMembers ? (
                  <div id="team" className="mt-8 scroll-mt-24">
                    <h2 className="text-base font-semibold tracking-tight text-churchBlue">
                      <Lang
                        en="Meet the ministry team"
                        ta="சேவை குழுவை அறிந்து கொள்ளுங்கள்"
                        taClassName="font-tamil"
                      />
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {teamMembers.map((member) => (
                        <div
                          key={`${member.name}-${member.roleEn}`}
                          className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-white shadow-glow"
                        >
                          <div className="relative aspect-[4/3] w-full bg-churchBlueSoft">
                            <Image
                              src={member.photoSrc ?? ministry.photoSrc ?? "/event-teaching.svg"}
                              alt={member.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 280px"
                              className="object-cover"
                              quality={72}
                            />
                          </div>
                          <div className="p-5">
                            <div className="text-sm font-semibold text-churchBlue">{member.name}</div>
                            <p className="mt-2 text-sm text-churchBlue/75">
                              <Lang en={member.roleEn} ta={member.roleTa} taClassName="font-tamil" />
                            </p>
                            {member.email ? (
                              <a
                                className="mt-4 inline-flex text-sm font-semibold text-churchBlue underline underline-offset-2"
                                href={`mailto:${member.email}`}
                              >
                                {member.email}
                              </a>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
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
                      <Lang en="Safety & care" ta="பாதுகாப்பு மற்றும் கவனம்" taClassName="font-tamil" />
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
                        ta="முழு குழந்தைகள் மற்றும் இளையோர் பாதுகாப்புக் கொள்கையைப் படியுங்கள்."
                        taClassName="font-tamil"
                      />{" "}
                      <Link href="/learn/community-safety" className="underline underline-offset-2">
                        <Lang en="Community safety" ta="சமூக பாதுகாப்பு" taClassName="font-tamil" />
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
                              quality={72}
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
