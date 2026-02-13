import { NextResponse } from "next/server"

import { sendEmail } from "@/lib/email"
import { getEventBySlug, isPastEvent } from "@/lib/events"
import { buildRsvpAdminNotificationEmail, buildRsvpConfirmationEmail } from "@/lib/rsvpEmails"
import { getReservedSeats, listRsvpsForEvent, upsertRsvpDetailed } from "@/lib/rsvpStore"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"
import { siteConfig } from "@/lib/site"

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 })
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim()
}

function normalizeEmail(value: unknown) {
  return normalizeText(value).toLowerCase()
}

export async function POST(request: Request) {
  const originCheck = enforceSameOrigin(request)
  if (!originCheck.ok) return originCheck.response
  const csrfCheck = validateCsrf(request)
  if (!csrfCheck.ok) return csrfCheck.response

  const ip = getClientIp(request)
  const rl = rateLimit({ key: `rsvp:${ip}`, max: 10, windowMs: 5 * 60_000 })
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again." }, { status: 429 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return badRequest("Invalid JSON.")
  }

  const eventSlug = normalizeText(body.eventSlug)
  const name = normalizeText(body.name)
  const email = normalizeEmail(body.email)
  const seats = Number(body.seats ?? 1)
  const honeypot = normalizeText(body.website)
  if (honeypot) return NextResponse.json({ ok: true, rsvp: null, capacity: null, remaining: null })

  if (!eventSlug) return badRequest("Missing event.")
  if (!name) return badRequest("Missing name.")
  if (!email || !email.includes("@")) return badRequest("Invalid email.")
  if (!Number.isFinite(seats) || seats < 1 || seats > 10) return badRequest("Invalid seats.")

  const event = getEventBySlug(eventSlug)
  if (!event) return badRequest("Event not found.")
  if (isPastEvent(event)) return badRequest("This event has already ended.")

  if (event.capacity) {
    const rsvps = await listRsvpsForEvent(eventSlug)
    const existingSeats = rsvps.find((r) => r.email.toLowerCase() === email)?.seats ?? 0
    const reservedBefore = rsvps.reduce((sum, r) => sum + (Number.isFinite(r.seats) ? r.seats : 0), 0)
    const reservedExcludingExisting = Math.max(0, reservedBefore - existingSeats)
    const remaining = Math.max(0, event.capacity - reservedExcludingExisting)
    if (seats > remaining) {
      return NextResponse.json(
        { ok: false, message: remaining === 0 ? "Event is full." : `Only ${remaining} spot(s) left.` },
        { status: 409 },
      )
    }
  }

  const upsert = await upsertRsvpDetailed({ eventSlug, name, email, seats })
  const rsvp = upsert.rsvp

  const reservedAfter = await getReservedSeats(eventSlug)
  const remainingAfter = event.capacity ? Math.max(0, event.capacity - reservedAfter) : null

  const notifyTo = process.env.RSVP_NOTIFY_EMAIL || siteConfig.email

  const confirmation = buildRsvpConfirmationEmail({ event, rsvp })
  const admin = buildRsvpAdminNotificationEmail({ event, rsvp, kind: upsert.kind })

  const confirmationResult = await sendEmail({ to: rsvp.email, ...confirmation })
  const notifyResult = notifyTo ? await sendEmail({ to: notifyTo, ...admin }) : { ok: false as const, message: "No notify email configured." }

  return NextResponse.json({
    ok: true,
    rsvp: { id: rsvp.id, eventSlug: rsvp.eventSlug, name: rsvp.name, email: rsvp.email, seats: rsvp.seats },
    capacity: event.capacity ?? null,
    remaining: remainingAfter,
    email: {
      confirmationSent: confirmationResult.ok,
      notifySent: notifyResult.ok,
      providerConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RSVP_FROM_EMAIL),
      message: confirmationResult.ok ? undefined : confirmationResult.message,
    },
  })
}
