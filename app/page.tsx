import type { Metadata } from "next"
import { Suspense } from "react"

import BlogPreviewSection from "@/components/BlogPreviewSection"
import CurrentSeriesSection from "@/components/CurrentSeriesSection"
import FeaturedBanner from "@/components/FeaturedBanner"
import FaqSection from "@/components/FaqSection"
import Hero from "@/components/Hero"
import ImpactStatsSection from "@/components/ImpactStatsSection"
import LatestSermonsPlaylist from "@/components/LatestSermonsPlaylist"
import MagazinePreviewSection from "@/components/MagazinePreviewSection"
import MajorEventCountdownClientOnly from "@/components/MajorEventCountdownClientOnly"
import MissionsShowcaseSection from "@/components/MissionsShowcaseSection"
import NewsletterSignupSection from "@/components/NewsletterSignupSection"
import ReadBibleNKJV from "@/components/ReadBibleNKJV"
import SermonHighlights from "@/components/SermonHighlights"
import StickyScrollNextSteps from "@/components/StickyScrollNextSteps"
import TestimonySection from "@/components/TestimonySection"
import VerseOfTheDay from "@/components/VerseOfTheDay"
import SocialMediaLazy from "@/components/lazy/SocialMediaLazy"
import {
  HomeAboutSection,
  HomeContactSection,
  HomeEventsSection,
  HomeGallerySection,
  HomeMinistriesSection,
} from "@/components/sections/home"
import { type Event, getUpcomingEvents, toLocalDate } from "@/lib/events"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Tamil & English Church in Mississauga",
  description:
    "Praise Tabernacle is a welcoming Tamil & English church family in Mississauga. Watch sermons, plan your visit, and get connected.",
  path: "/",
})

const HOME_UPCOMING_EVENT_LIMIT = 3

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

async function UpcomingEventsSectionData() {
  const result = await Promise.resolve(loadUpcomingEvents(HOME_UPCOMING_EVENT_LIMIT))
  return <HomeEventsSection state={result.state} events={result.events} />
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBanner />
      <MajorEventCountdownClientOnly />
      <HomeAboutSection />
      <StickyScrollNextSteps />
      <LatestSermonsPlaylist variant="home" />
      <CurrentSeriesSection />
      <HomeMinistriesSection />
      <ImpactStatsSection />
      <MissionsShowcaseSection />
      <BlogPreviewSection />
      <SocialMediaLazy />
      <MagazinePreviewSection />
      <SermonHighlights />
      <Suspense fallback={<HomeEventsSection state="loading" events={[]} />}>
        <UpcomingEventsSectionData />
      </Suspense>
      <HomeContactSection />
      <NewsletterSignupSection />
      <FaqSection />
      <HomeGallerySection />
      <TestimonySection />
      <VerseOfTheDay />
      <ReadBibleNKJV />
    </>
  )
}
