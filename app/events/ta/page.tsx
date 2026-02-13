import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"

import EventsArchive from "@/components/EventsArchive"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { events } from "@/lib/events"
import { getReservedSeatsBySlug } from "@/lib/rsvpStore"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Events (Tamil)",
  description: "Upcoming events and gatherings (Tamil) at Praise Tabernacle.",
  path: "/events/ta",
})

export default async function EventsTamilPage() {
  const base = events.filter((e) => e.language === "ta" || e.language === "bilingual")

  const eventsWithCapacity = base.filter((e) => e.capacity)
  const reservedBySlug = await getReservedSeatsBySlug(eventsWithCapacity.map((e) => e.slug))
  const remainingBySlug = Object.fromEntries(
    eventsWithCapacity.map((e) => [
      e.slug,
      Math.max(0, (e.capacity ?? 0) - (reservedBySlug[e.slug] ?? 0)),
    ]),
  ) as Record<string, number>
  const eventsWithLiveSpots = base.map((e) =>
    e.capacity ? { ...e, spotsRemaining: remainingBySlug[e.slug] ?? e.spotsRemaining } : e,
  )

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praise Tabernacle Events (Tamil)",
    itemListElement: base.slice(0, 50).map((event, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: event.title,
      url: `${siteConfig.siteUrl}/events/${event.slug}`,
    })),
  }

  return (
    <>
      <Script
        id="schema-org-events-list-ta"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <PageHeader
        titleEn="Events (Tamil)"
        titleTa="நிகழ்வுகள் (தமிழ்)"
        descriptionEn="Prayer times, youth gatherings, family events, and community connections (Tamil)."
        descriptionTa="ஜெப நேரங்கள், இளைஞர் கூடுகைகள், குடும்ப நிகழ்வுகள், சமூக இணைப்பு (தமிழ்)."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/events" className="btn btn-sm btn-secondary">
              <Lang en="All events" ta="அனைத்து நிகழ்வுகள்" taClassName="font-tamil" />
            </Link>
            <Link href="/events/en" className="btn btn-sm btn-secondary">
              <Lang en="English" ta="ஆங்கிலம்" taClassName="font-tamil" />
            </Link>
            <Link href="/events/ta" className="btn btn-sm btn-primary">
              <Lang en="Tamil" ta="தமிழ்" taClassName="font-tamil" />
            </Link>
            <Link href="/events/calendar" className="btn btn-sm btn-secondary">
              Subscribe calendar (iCal)
            </Link>
            <a
              href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-secondary"
              title="Add by URL in Google Calendar, then paste the /events/calendar link"
            >
              Google Calendar subscribe
            </a>
          </div>

          <EventsArchive events={eventsWithLiveSpots} />
        </Container>
      </section>
    </>
  )
}

