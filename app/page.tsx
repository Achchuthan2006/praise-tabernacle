import type { Metadata } from "next"
import Link from "next/link"

import BlogPreviewSection from "@/components/BlogPreviewSection"
import EventCard from "@/components/EventCard"
import GetInvolvedSection from "@/components/GetInvolvedSection"
import Hero from "@/components/Hero"
import FeaturedBanner from "@/components/FeaturedBanner"
import LatestSermonsPlaylist from "@/components/LatestSermonsPlaylist"
import CurrentSeriesSection from "@/components/CurrentSeriesSection"
import MissionStatementSection from "@/components/MissionStatementSection"
import NewsletterSignupSection from "@/components/NewsletterSignupSection"
import ReadBibleNKJV from "@/components/ReadBibleNKJV"
import VerseOfTheDay from "@/components/VerseOfTheDay"
import TestimonySection from "@/components/TestimonySection"
import SermonHighlights from "@/components/SermonHighlights"
import ImpactStatsSection from "@/components/ImpactStatsSection"
import PhotosMediaLazy from "@/components/PhotosMediaLazy"
import MagazinePreviewSection from "@/components/MagazinePreviewSection"
import StickyScrollNextSteps from "@/components/StickyScrollNextSteps"
import SocialMediaSection from "@/components/SocialMediaSection"
import MajorEventCountdownClientOnly from "@/components/MajorEventCountdownClientOnly"
import FaqSection from "@/components/FaqSection"
import MissionsShowcaseSection from "@/components/MissionsShowcaseSection"
import Container from "@/components/ui/Container"
import Lang from "@/components/language/Lang"
import Magnetic from "@/components/ui/Magnetic"
import Tilt from "@/components/ui/Tilt"
import { getUpcomingEvents } from "@/lib/events"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Tamil & English Church in Mississauga",
  description:
    "Praise Tabernacle is a welcoming Tamil & English church family in Mississauga. Watch sermons, plan your visit, and get connected.",
  path: "/",
})

export default function Home() {
  const upcomingEvents = getUpcomingEvents()
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
      <SocialMediaSection />
      <MagazinePreviewSection />
      <SermonHighlights />

      <section className="relative bg-churchBlueSoft">
        <Container className="section-padding">
          <div className="neomorphism-card rounded-3xl p-8 md:p-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">
                <Lang en="Calendar" ta="நாட்காட்டி" />
              </div>
              <h2 className="section-heading">
                <Lang en="Upcoming Events" ta="வரவிருக்கும் நிகழ்வுகள்" />
              </h2>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <p className="text-sm text-churchBlue/70">
                <Lang en="Stay connected this month." ta="இந்த மாதம் இணைந்திருங்கள்." />
              </p>
              <Link href="/events" className="btn btn-sm btn-secondary">
                <Lang en="View all events" ta="அனைத்து நிகழ்வுகளையும் பார்க்கவும்" />
              </Link>
            </div>
          </div>

            <div className="mt-6">
              <div className="section-divider" aria-hidden="true" />
            </div>

            <div className="event-carousel mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <Tilt key={event.slug}>
                  <EventCard event={event} />
                </Tilt>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-churchBlueSoft">
        <Container className="section-padding">
          <div className="neomorphism-card rounded-3xl p-8 md:p-12 fade-up">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                <Lang
                  en="Join a growing, vibrant, Christ-centred community."
                  ta="வளரும், உயிரோட்டமுள்ள, கிறிஸ்துவை மையமாகக் கொண்ட சமூகத்தில் சேருங்கள்."
                />
              </h2>
              <p className="mt-3 text-sm text-churchBlue/75 sm:text-base">
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
                />
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <Link href="/visit" className="btn btn-md btn-primary">
                  <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/sermons" className="btn btn-md btn-secondary-soft">
                  <Lang en="Latest Sermons" ta="சமீப பிரசங்கங்கள்" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSignupSection />

      <FaqSection />

      <PhotosMediaLazy />
      <TestimonySection />
      <VerseOfTheDay />
      <ReadBibleNKJV />
    </>
  )
}
