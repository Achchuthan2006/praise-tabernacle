"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import { googleCalendarUrl, outlookCalendarUrl } from "@/lib/calendarLinks"
import { type Event, getNextMajorEvent, timeZone, toLocalDate } from "@/lib/events"

type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function formatDateTimeLabel(d: Date) {
  try {
    if (Number.isNaN(d.getTime())) return ""
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    }).format(d)
  } catch {
    return ""
  }
}

function diffParts(target: Date, now: Date): CountdownParts {
  const total = Math.max(0, target.getTime() - now.getTime())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { days, hours, minutes, seconds }
}

export default function MajorEventCountdown() {
  const [event, setEvent] = useState<Event | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setHydrated(true)
    setEvent(getNextMajorEvent(new Date()))
  }, [])

  useEffect(() => {
    if (!event?.startAtLocal) return
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [event?.startAtLocal])

  if (!event?.startAtLocal) return null
  const start = toLocalDate(event.startAtLocal)
  if (Number.isNaN(start.getTime())) return null
  const parts = now ? diffParts(start, now) : null
  const countdownItems: Array<{ label: string; value: number }> = [
    { label: "Days", value: parts?.days ?? 0 },
    { label: "Hours", value: parts?.hours ?? 0 },
    { label: "Minutes", value: parts?.minutes ?? 0 },
    { label: "Seconds", value: parts?.seconds ?? 0 },
  ]
  const end = event.endAtLocal ? toLocalDate(event.endAtLocal) : new Date(start.getTime() + 60 * 60 * 1000)
  const calendarLinks = event.startAtLocal
    ? {
        google: googleCalendarUrl({
          title: event.title,
          details: event.description,
          location: event.location.name,
          startLocal: start,
          endLocal: end,
          timeZone,
        }),
        outlook: outlookCalendarUrl({
          title: event.title,
          body: event.description,
          location: event.location.name,
          startLocal: start,
          endLocal: end,
        }),
      }
    : null

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="blob-background blob-left" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="section-kicker">
                <Lang en="Next Major Event" ta="à®…à®Ÿà¯à®¤à¯à®¤ à®®à¯à®•à¯à®•à®¿à®¯ à®¨à®¿à®•à®´à¯à®µà¯" taClassName="font-tamil" />
              </div>
              <h2 className="section-heading">
                <Lang en={event.title} ta={event.title} taClassName="font-tamil" />
              </h2>
              <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">{event.description}</p>
              <div className="mt-3 text-xs font-semibold tracking-wide text-churchBlue/60">
                {formatDateTimeLabel(start)}
              </div>
            </div>

            <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 text-center sm:p-5">
              <div className="countdown-container" role="group" aria-label="Event countdown">
              {countdownItems.map((item) => (
                <div key={item.label} className="countdown-item">
                  <div
                    key={`${item.label}-${hydrated && parts ? item.value : "placeholder"}`}
                    className="countdown-number"
                    suppressHydrationWarning
                  >
                    {hydrated && parts ? item.value : "—"}
                  </div>
                  <div className="countdown-label">{item.label}</div>
                </div>
              ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link href={`/events/${event.slug}`} className="btn btn-md btn-primary w-full">
              <Lang en="View event details" ta="à®¨à®¿à®•à®´à¯à®µà¯ à®µà®¿à®µà®°à®™à¯à®•à®³à¯" taClassName="font-tamil" />
            </Link>
            <a href={`/events/${event.slug}/calendar`} className="btn btn-md btn-secondary w-full">
              <Lang en="Download iCal (.ics)" ta="iCal (.ics) à®ªà®¤à®¿à®µà®¿à®±à®•à¯à®•à®µà¯à®®à¯" taClassName="font-tamil" />
            </a>
            {calendarLinks ? (
              <>
                <a href={calendarLinks.google} target="_blank" rel="noreferrer" className="btn btn-md btn-secondary w-full">
                  <Lang en="Add to Google Calendar" ta="Google Calendar-à®²à¯ à®šà¯‡à®°à¯" taClassName="font-tamil" />
                </a>
                <a href={calendarLinks.outlook} target="_blank" rel="noreferrer" className="btn btn-md btn-secondary w-full">
                  <Lang en="Add to Outlook" ta="Outlook-à®²à¯ à®šà¯‡à®°à¯" taClassName="font-tamil" />
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

