import Link from "next/link"
import Image from "next/image"

import type { Event } from "@/lib/events"
import { computeSpotsLabel, getEventImageSrc, isOneOffEvent, nextOccurrenceLocal, toLocalDate } from "@/lib/events"
import { normalizeBullets } from "@/lib/text"

function CategoryIcon({ category }: { category: Event["category"] }) {
  if (category === "prayer") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21c5-3.2 7.5-7.2 7.5-11.3A4.7 4.7 0 0 0 12 6.3 4.7 4.7 0 0 0 4.5 9.7C4.5 13.8 7 17.8 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 9v6m-3-3h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (category === "teaching") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4.5 6.5h13A2 2 0 0 1 19.5 8.5v10a2 2 0 0 0-2-2h-13v-10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 16.5h13a2 2 0 0 1 2 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (category === "youth") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l2.3 6.6H21l-5.3 3.9 2 6.5L12 15.6 6.3 19l2-6.5L3 8.6h6.7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (category === "family") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 21v-7a5 5 0 0 1 10 0v7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 10a3 3 0 1 1 6 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 21h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (category === "community") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M16 11a4 4 0 1 0-8 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4.5 21a7.5 7.5 0 0 1 15 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v3m0 12v3M3 12h3m12 0h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 7l2 2m6 6 2 2M17 7l-2 2M9 15l-2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { month: "short", day: "2-digit" }).format(date)
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit" }).format(date)
}

function whenText(event: Event) {
  if (isOneOffEvent(event) && event.startAtLocal) {
    const start = toLocalDate(event.startAtLocal)
    return `${formatDate(start)} • ${formatTime(start)}`
  }
  if (event.recurrence) {
    const next = nextOccurrenceLocal(event.recurrence)
    return `Next: ${formatDate(next)} • ${formatTime(next)}`
  }
  return ""
}

export default function EventCard({ event }: { event: Event }) {
  const spots = computeSpotsLabel(event)
  const hasInternalRegistrationUrl = Boolean(event.registrationUrl && event.registrationUrl.startsWith("/"))
  const locationText =
    event.location.name.toLowerCase().includes("online") || event.location.name.toLowerCase().includes("livestream")
      ? "Online"
      : event.location.name
  const imageSrc = getEventImageSrc(event)

  return (
    <article className="event-card card group" data-accent={event.category}>
      <div className="event-image-wrapper relative h-40 sm:h-44">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="event-image object-cover object-center"
          priority={event.isMajor}
        />
      </div>
      <div className="card-content p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
              <span className="text-sm font-semibold text-churchBlue">
                {isOneOffEvent(event) && event.startAtLocal
                  ? formatDate(toLocalDate(event.startAtLocal))
                  : "•"}
              </span>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="card-icon icon" aria-hidden="true">
                  <CategoryIcon category={event.category} />
                </span>
                <h3 className="text-base font-semibold text-churchBlue">{event.title}</h3>
              </div>
              <div className="mt-1 text-sm text-churchBlue/70">{normalizeBullets(whenText(event))}</div>
              <div className="mt-1 text-xs font-semibold text-churchBlue/60">{locationText}</div>
            </div>
          </div>

          {spots ? (
            <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-2.5 py-1 text-xs font-semibold text-churchBlue/80">
              {spots}
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-sm text-churchBlue/75">{event.description}</p>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {event.registrationUrl ? (
            hasInternalRegistrationUrl ? (
              <Link href={event.registrationUrl} className="btn btn-sm btn-primary w-full">
                {event.registrationLabel ?? "Register"}
              </Link>
            ) : (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-primary w-full"
              >
                {event.registrationLabel ?? "Register"}
              </a>
            )
          ) : (
            <Link href={`/events/${event.slug}`} className="btn btn-sm btn-primary w-full">
              View details
            </Link>
          )}

          <Link href={`/events/${event.slug}`} className="btn btn-sm btn-secondary w-full">
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
