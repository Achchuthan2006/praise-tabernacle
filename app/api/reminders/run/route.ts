import { NextResponse } from "next/server"

import { sendEmail } from "@/lib/email"
import { events, isOneOffEvent, nextOccurrenceLocal, toLocalDate } from "@/lib/events"
import { listAllRsvps, markReminderSent } from "@/lib/rsvpStore"
import { siteConfig } from "@/lib/site"

function upcomingStart(event: (typeof events)[number]) {
  if (isOneOffEvent(event) && event.startAtLocal) return toLocalDate(event.startAtLocal)
  if (event.recurrence) return nextOccurrenceLocal(event.recurrence)
  return null
}

export async function POST(request: Request) {
  const secret = process.env.REMINDERS_SECRET
  const provided = request.headers.get("x-reminders-secret") ?? ""
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 })
  }

  const lookaheadHours = Math.max(1, Math.min(72, Number(process.env.REMINDERS_LOOKAHEAD_HOURS ?? "24") || 24))
  const now = new Date()
  const cutoff = new Date(now.getTime() + lookaheadHours * 60 * 60 * 1000)

  const bySlug = new Map(events.map((e) => [e.slug, e]))
  const rsvps = await listAllRsvps()

  let attempted = 0
  let sent = 0
  let skipped = 0

  for (const r of rsvps) {
    if (r.reminderSentAtIso) {
      skipped += 1
      continue
    }

    const event = bySlug.get(r.eventSlug)
    if (!event) {
      skipped += 1
      continue
    }

    const start = upcomingStart(event)
    if (!start || start <= now || start > cutoff) {
      skipped += 1
      continue
    }

    attempted += 1

    const when = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    }).format(start)

    const subject = `Reminder: ${event.title} • ${when}`
    const text =
      `Hi ${r.name},\n\n` +
      `Reminder for: ${event.title}\n` +
      `When: ${when}\n` +
      `Seats: ${r.seats}\n\n` +
      `Event details: ${siteConfig.siteUrl}/events/${event.slug}\n\n` +
      `If you need help, reply to this email.\n`

    const result = await sendEmail({ to: r.email, subject, text })
    if (result.ok) {
      await markReminderSent(r.id)
      sent += 1
    }
  }

  return NextResponse.json({ ok: true, attempted, sent, skipped, lookaheadHours })
}
