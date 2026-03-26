import type { Metadata } from "next"
import Link from "next/link"
import { Suspense, type ReactNode } from "react"

import BlogPreviewSection from "@/components/BlogPreviewSection"
import CurrentSeriesSection from "@/components/CurrentSeriesSection"
import EventCard from "@/components/EventCard"
import FeaturedBanner from "@/components/FeaturedBanner"
import FaqSection from "@/components/FaqSection"
import GetInvolvedSection from "@/components/GetInvolvedSection"
import Hero from "@/components/Hero"
import ImpactStatsSection from "@/components/ImpactStatsSection"
import LatestSermonsPlaylist from "@/components/LatestSermonsPlaylist"
import MagazinePreviewSection from "@/components/MagazinePreviewSection"
import MajorEventCountdownClientOnly from "@/components/MajorEventCountdownClientOnly"
import MissionStatementSection from "@/components/MissionStatementSection"
import MissionsShowcaseSection from "@/components/MissionsShowcaseSection"
import NewsletterSignupSection from "@/components/NewsletterSignupSection"
import PhotosMediaLazy from "@/components/PhotosMediaLazy"
import ReadBibleNKJV from "@/components/ReadBibleNKJV"
import SermonHighlights from "@/components/SermonHighlights"
import StickyScrollNextSteps from "@/components/StickyScrollNextSteps"
import TestimonySection from "@/components/TestimonySection"
import VerseOfTheDay from "@/components/VerseOfTheDay"
import Lang from "@/components/language/Lang"
import SocialMediaLazy from "@/components/lazy/SocialMediaLazy"
import Container from "@/components/ui/Container"
import Magnetic from "@/components/ui/Magnetic"
import Tilt from "@/components/ui/Tilt"
import { type Event, getUpcomingEvents, toLocalDate } from "@/lib/events"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Tamil & English Church in Mississauga",
  description:
    "Praise Tabernacle is a welcoming Tamil & English church family in Mississauga. Watch sermons, plan your visit, and get connected.",
  path: "/",
})

const HOME_UPCOMING_EVENT_LIMIT = 3
const HOME_EVENT_SKELETON_COUNT = 3

type UpcomingEventsLoadState = "loading" | "ready" | "empty" | "error"

type UpcomingEventsResult = {
  state: UpcomingEventsLoadState
  events: Event[]
}

function isRenderableUpcomingEvent(event: Event) {
  if (!event.slug || !event.title || !event.startAtLocal) return false
  const start = toLocalDate(event.startAtLocal)
  return !Number.isNaN(start.getTime())
}

function loadUpcomingEvents(limit: number): UpcomingEventsResult {
  try {
    const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.floor(limit)) : HOME_UPCOMING_EVENT_LIMIT
    const events = getUpcomingEvents()
    const uniqueEvents: Event[] = []
    const seenSlugs = new Set<string>()

    for (const event of events) {
      if (!isRenderableUpcomingEvent(event)) continue
      if (seenSlugs.has(event.slug)) continue
      seenSlugs.add(event.slug)
      uniqueEvents.push(event)
      if (uniqueEvents.length >= safeLimit) break
    }

    if (uniqueEvents.length === 0) return { state: "empty", events: [] }
    return { state: "ready", events: uniqueEvents }
  } catch (error) {
    console.error("[home] failed to load upcoming events", error)
    return { state: "error", events: [] }
  }
}

function ActionLink({
  href,
  children,
  variant = "secondary",
  size = "sm",
  className,
}: {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary" | "secondary-soft"
  size?: "sm" | "md"
  className?: string
}) {
  const variantClass =
    variant === "primary" ? "btn-primary" : variant === "secondary-soft" ? "btn-secondary-soft" : "btn-secondary"
  const sizeClass = size === "md" ? "btn-md" : "btn-sm"

  return (
    <Link
      href={href}
      className={["btn", sizeClass, variantClass, "focus-ring inline-flex items-center justify-center", className ?? ""].join(" ").trim()}
    >
      {children}
    </Link>
  )
}

function UpcomingEventsSection({ state, events }: UpcomingEventsResult) {
  const isLoading = state === "loading"
  const isError = state === "error"
  const isEmpty = state === "empty"
  const isReady = state === "ready"

  return (
    <section className="section-soft-stage" aria-live="polite" aria-busy={isLoading}>
      <Container className="section-padding">
        <div className="content-shell-wide premium-surface p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="section-kicker">
                <Lang en="Calendar" ta="நாட்காட்டி" taClassName="font-tamil" />
              </div>
              <h2 className="section-heading">
                <Lang en="Upcoming Events" ta="வரவிருக்கும் நிகழ்வுகள்" taClassName="font-tamil" />
              </h2>
              <p className="section-lead mt-4 max-w-2xl">
                <Lang
                  en="Plan ahead for church gatherings, community moments, and special services happening soon."
                  ta="சமீபத்தில் நடைபெறவிருக்கும் சபை கூடுகைகள், சமூக நிகழ்வுகள், மற்றும் சிறப்பு ஆராதனைகளுக்காக முன்கூட்டியே திட்டமிடுங்கள்."
                  taClassName="font-tamil"
                />
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="info-pill">
                <span className="h-2.5 w-2.5 rounded-full bg-churchBlue" aria-hidden="true" />
                <Lang en="Stay connected this month." ta="இந்த மாதம் இணைந்திருங்கள்." taClassName="font-tamil" />
              </div>
              <ActionLink href="/events" variant="secondary" size="sm" className="shadow-[0_16px_28px_rgb(18_27_62_/_0.06)]">
                <Lang en="View all events" ta="அனைத்து நிகழ்வுகளையும் பார்க்கவும்" taClassName="font-tamil" />
              </ActionLink>
            </div>
          </div>

          <div className="mt-6">
            <div className="section-divider" aria-hidden="true" />
          </div>

          {isLoading ? (
            <div className="event-carousel mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading events">
              {Array.from({ length: HOME_EVENT_SKELETON_COUNT }, (_, idx) => (
                <div
                  key={`event-skeleton-${idx}`}
                  className="h-64 animate-pulse rounded-2xl border border-churchBlue/10 bg-white"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : null}

          {isReady ? (
            <div className="event-carousel mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Tilt key={event.slug}>
                  <EventCard event={event} />
                </Tilt>
              ))}
            </div>
          ) : null}

          {isError ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
              <p>
                <Lang
                  en="We couldn't load upcoming events right now. Please try again from the full events page."
                  ta="வரவிருக்கும் நிகழ்வுகளை இப்போது ஏற்ற முடியவில்லை. முழு நிகழ்வு பக்கத்தில் மீண்டும் முயற்சிக்கவும்."
                  taClassName="font-tamil"
                />
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <ActionLink href="/events" variant="secondary" size="sm">
                  <Lang en="Open events page" ta="நிகழ்வு பக்கத்தைத் திற" taClassName="font-tamil" />
                </ActionLink>
                <ActionLink href="/calendar" variant="secondary" size="sm">
                  <Lang en="Open calendar" ta="நாட்காட்டியைத் திற" taClassName="font-tamil" />
                </ActionLink>
              </div>
            </div>
          ) : null}

          {isEmpty ? (
            <div className="mt-8 rounded-2xl border border-churchBlue/10 bg-white p-5 text-sm text-churchBlue/75">
              <Lang
                en="No upcoming one-time events are scheduled right now. Check the full events page for recurring gatherings."
                ta="இப்போது முன்பதிவு செய்யக்கூடிய ஒருமுறை நிகழ்வுகள் இல்லை. தொடரும் கூடுகைகளுக்கு முழு நிகழ்வு பக்கத்தை பாருங்கள்."
                taClassName="font-tamil"
              />
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <ActionLink href="/events" variant="secondary" size="sm">
                  <Lang en="Browse all events" ta="அனைத்து நிகழ்வுகளையும் பார்க்க" taClassName="font-tamil" />
                </ActionLink>
                <ActionLink href="/calendar" variant="secondary" size="sm">
                  <Lang en="Open calendar" ta="நாட்காட்டியைத் திற" taClassName="font-tamil" />
                </ActionLink>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

function JoinChurchSection() {
  return (
    <section className="section-soft-stage">
      <Container className="section-padding">
        <div className="content-shell premium-surface fade-up p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="section-kicker">
                <Lang en="Church family" ta="சபை குடும்பம்" taClassName="font-tamil" />
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                <Lang
                  en="Join a growing, vibrant, Christ-centred community."
                  ta="வளரும், உயிரோட்டமுள்ள, கிறிஸ்துவை மையமாகக் கொண்ட சமூகத்தில் சேருங்கள்."
                  taClassName="font-tamil"
                />
              </h2>
              <p className="section-lead mt-4">
                <Lang
                  en={
                    <>
                      Whether you&apos;re exploring faith, returning to church, or looking for a Tamil
                      &amp; English church family - we&apos;d love to meet you.
                    </>
                  }
                  ta={
                    <>
                      விசுவாசத்தை அறிய விரும்பினாலும், மீண்டும் சபைக்கு வருகிறவராக இருந்தாலும், தமிழ்
                      &amp; ஆங்கில சபைக் குடும்பத்தைத் தேடினாலும் - உங்களை சந்திக்க விரும்புகிறோம்.
                    </>
                  }
                  taClassName="font-tamil"
                />
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <ActionLink href="/visit" variant="primary" size="md">
                    <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
                  </ActionLink>
                </Magnetic>
                <Magnetic>
                  <ActionLink href="/sermons" variant="secondary-soft" size="md">
                    <Lang en="Latest Sermons" ta="சமீப பிரசங்கங்கள்" taClassName="font-tamil" />
                  </ActionLink>
                </Magnetic>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="info-pill">
                <span className="h-2.5 w-2.5 rounded-full bg-churchGold" aria-hidden="true" />
                <Lang en="Warm welcome for first-time visitors" ta="முதல் வருகையாளர்களுக்கான அன்பான வரவேற்பு" taClassName="font-tamil" />
              </div>
              <div className="info-pill">
                <span className="h-2.5 w-2.5 rounded-full bg-churchBlue" aria-hidden="true" />
                <Lang en="Tamil & English worship environment" ta="தமிழ் & ஆங்கில ஆராதனை சூழல்" taClassName="font-tamil" />
              </div>
              <div className="info-pill">
                <span className="h-2.5 w-2.5 rounded-full bg-churchBlueLight" aria-hidden="true" />
                <Lang en="Simple next steps to belong and serve" ta="சேரவும் சேவை செய்யவும் எளிய அடுத்த படிகள்" taClassName="font-tamil" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

async function UpcomingEventsSectionData() {
  const result = await Promise.resolve(loadUpcomingEvents(HOME_UPCOMING_EVENT_LIMIT))
  return <UpcomingEventsSection state={result.state} events={result.events} />
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBanner />
      <MajorEventCountdownClientOnly />

      <MissionStatementSection />
      <StickyScrollNextSteps />

      <LatestSermonsPlaylist variant="home" />
      <CurrentSeriesSection />
      <GetInvolvedSection />
      <ImpactStatsSection />
      <MissionsShowcaseSection />
      <BlogPreviewSection />
      <SocialMediaLazy />
      <MagazinePreviewSection />
      <SermonHighlights />

      <Suspense fallback={<UpcomingEventsSection state="loading" events={[]} />}>
        <UpcomingEventsSectionData />
      </Suspense>
      <JoinChurchSection />

      <NewsletterSignupSection />
      <FaqSection />
      <PhotosMediaLazy />
      <TestimonySection />
      <VerseOfTheDay />
      <ReadBibleNKJV />
    </>
  )
}
