import type { Metadata } from "next"

import EventCard from "@/components/EventCard"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { upcomingEvents } from "@/lib/content"

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and gatherings at Praise Tabernacle.",
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        titleEn="Events"
        titleTa="நிகழ்வுகள்"
        descriptionEn="A few simple ways to gather, pray, and connect as a church family."
        descriptionTa="சபைக் குடும்பமாக கூடவும், ஜெபிக்கவும், இணைந்திருக்கவும் சில எளிய வாய்ப்புகள்."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </>
  )
}

