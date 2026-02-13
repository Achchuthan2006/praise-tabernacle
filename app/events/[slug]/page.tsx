import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"

import EventRsvpForm from "@/components/lazy/EventRsvpFormLazy"
import GalleryGrid from "@/components/lazy/GalleryGridLazy"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { googleCalendarUrl, outlookCalendarUrl } from "@/lib/calendarLinks"
import EventCard from "@/components/EventCard"
import {
  computeSpotsLabel,
  embedMapUrlForLocation,
  events,
  getAllEventSlugs,
  getEventBySlug,
  getEventImageSrc,
  isPastEvent,
  mapLinkForLocation,
  nextOccurrenceLocal,
  timeZone,
  toLocalDate,
} from "@/lib/events"
import { getReservedSeats } from "@/lib/rsvpStore"
import { eventJsonLd, pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { normalizeBullets } from "@/lib/text"

function formatDateTime(date: Date) {
  const datePart = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long", day: "2-digit" }).format(date)
  const timePart = new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit" }).format(date)
  return `${datePart} • ${timePart}`
}

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEventBySlug(params.slug)
  if (!event) return { title: "Event" }
  return pageMetadata({
    title: event.title,
    description: event.description,
    path: `/events/${event.slug}`,
    image: getEventImageSrc(event),
  })
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()

  const reservedSeats = event.capacity ? await getReservedSeats(event.slug) : 0
  const remainingSeats = event.capacity ? Math.max(0, event.capacity - reservedSeats) : undefined
  const eventWithLiveSpots = event.capacity ? { ...event, spotsRemaining: remainingSeats } : event

  const startLocal = event.startAtLocal
    ? toLocalDate(event.startAtLocal)
    : event.recurrence
      ? nextOccurrenceLocal(event.recurrence)
      : null
  const endLocal = event.endAtLocal
    ? toLocalDate(event.endAtLocal)
    : startLocal
      ? new Date(startLocal.getTime() + 60 * 60 * 1000)
      : null

  const spots = computeSpotsLabel(eventWithLiveSpots)
  const mapLink = mapLinkForLocation(event.location)
  const mapEmbed = embedMapUrlForLocation(event.location)

  const calendarLinks =
    startLocal && endLocal
      ? {
          google: googleCalendarUrl({
            title: event.title,
            details: event.description,
            location: event.location.mapQuery,
            startLocal,
            endLocal,
            timeZone,
          }),
          outlook: outlookCalendarUrl({
            title: event.title,
            body: event.description,
            location: event.location.mapQuery,
            startLocal,
            endLocal,
          }),
        }
      : null

  const related = events
    .filter((e) => e.slug !== event.slug)
    .filter((e) => e.category === event.category)
    .filter((e) => !isPastEvent(e))
    .slice(0, 3)

  const heroImageSrc = getEventImageSrc(event)
  const jsonLdEvent = eventJsonLd(event, {
    startIso: startLocal ? startLocal.toISOString() : undefined,
    endIso: endLocal ? endLocal.toISOString() : undefined,
  })

  return (
    <>
      <Script
        id={`schema-org-event-${event.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <PageHeader
        titleEn={event.title}
        titleTa="நிகழ்வு"
        descriptionEn={
          startLocal ? `${normalizeBullets(formatDateTime(startLocal))} • ${timeZone}` : "Event details"
        }
        descriptionTa=""
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="card">
                <div className="card-content p-6 sm:p-8">
                    <div className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                      <div className="relative aspect-[16/7] w-full">
                        <Image
                          src={heroImageSrc}
                          alt={event.title}
                          fill
                          sizes="(min-width: 1024px) 960px, 100vw"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>

                  <div className="mt-7 grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <div className="text-sm font-semibold tracking-wide text-churchBlue/60">
                        {startLocal ? formatDateTime(startLocal) : "Schedule"}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        {event.description}
                      </p>

                      {spots ? (
                        <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-5 py-4">
                          <div className="text-xs font-semibold text-churchBlue/60">Capacity</div>
                          <div className="mt-1 text-sm font-semibold text-churchBlue">{spots}</div>
                        </div>
                      ) : null}

                      <div className="mt-8 grid gap-2 sm:grid-cols-2">
                        {event.registrationUrl ? (
                          <a
                            href={event.registrationUrl}
                            target={event.registrationUrl.startsWith("/") ? undefined : "_blank"}
                            rel={event.registrationUrl.startsWith("/") ? undefined : "noreferrer"}
                            className="btn btn-md btn-primary"
                          >
                            {event.registrationLabel ?? "Register"}
                          </a>
                        ) : (
                          <Link href="/contact" className="btn btn-md btn-primary">
                            Contact for details
                          </Link>
                        )}

                        <a href={`/events/${event.slug}/calendar`} className="btn btn-md btn-secondary">
                          Download iCal (.ics)
                        </a>
                      </div>

                      {calendarLinks ? (
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <a href={calendarLinks.google} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                            Add to Google Calendar
                          </a>
                          <a
                            href={calendarLinks.outlook}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary"
                          >
                            Add to Outlook
                          </a>
                        </div>
                      ) : null}

                  {event.contact ? (
                        <div className="mt-10 border-t border-churchBlue/10 pt-8">
                          <div className="text-sm font-semibold text-churchBlue">Contact</div>
                          <div className="mt-4 flex items-start gap-4">
                            {event.contact.photoSrc ? (
                              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                                <Image
                                  src={event.contact.photoSrc}
                                  alt={event.contact.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-churchBlue/10 bg-churchBlueSoft text-sm font-semibold text-churchBlue">
                                {event.contact.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((p) => p[0])
                                  .join("")}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-churchBlue">{event.contact.name}</div>
                              {event.contact.role ? (
                                <div className="mt-1 text-sm text-churchBlue/70">{event.contact.role}</div>
                              ) : null}
                              {event.contact.email ? (
                                <a
                                  className="mt-2 block text-sm text-churchBlue/75 underline underline-offset-2"
                                  href={`mailto:${event.contact.email}?subject=${encodeURIComponent(event.title)}`}
                                >
                                  {event.contact.email}
                                </a>
                              ) : null}
                            </div>
                          </div>
                        </div>
                  ) : null}
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                      <div id="rsvp" className="scroll-mt-24">
                        <EventRsvpForm
                          eventSlug={event.slug}
                          eventTitle={event.title}
                          capacity={event.capacity ?? null}
                          initialRemaining={remainingSeats ?? null}
                        />
                      </div>

                      <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                        <div className="text-sm font-semibold text-churchBlue">Location</div>
                        <div className="mt-2 text-sm text-churchBlue/75">
                          {event.location.name}
                          <div className="mt-2 space-y-1">
                            {event.location.addressLines.map((line) => (
                              <div key={line}>{line}</div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-5">
                          <a href={mapLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                            Open map
                          </a>
                        </div>
                        <div className="mt-5 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                          <iframe
                            title="Map"
                            src={mapEmbed}
                            className="h-64 w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </div>

                      <div className="mt-6 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                        <div className="text-sm font-semibold text-churchBlue">
                          {isPastEvent(event) ? "Past event" : "Need help?"}
                        </div>
                        <p className="mt-2 text-sm text-churchBlue/70">
                          Questions about registration, timing, or accessibility? Send us a note and we’ll help.
                        </p>
                        <div className="mt-5">
                          <Link href="/contact" className="btn btn-sm btn-primary w-full">
                            Contact us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {event.galleryImageSrcs?.length ? (
                    <div className="mt-10 border-t border-churchBlue/10 pt-8">
                      <div className="text-sm font-semibold text-churchBlue">Photo gallery</div>
                      <GalleryGrid images={event.galleryImageSrcs} />
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>

            {related.length ? (
              <Reveal delay={1} className="mt-10">
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                      Related events
                    </h2>
                    <Link href="/events" className="btn btn-sm btn-secondary">
                      View all events
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {related.map((e) => (
                      <EventCard key={e.slug} event={e} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={1} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/events" className="btn btn-md btn-secondary">
                  Back to events
                </Link>
                <Link href="/sermons" className="btn btn-md btn-secondary">
                  Watch latest service
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
