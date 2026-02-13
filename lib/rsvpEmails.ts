import "server-only"

import type { Event } from "@/lib/events"
import { isOneOffEvent, nextOccurrenceLocal, timeZone, toLocalDate } from "@/lib/events"
import type { RsvpRecord } from "@/lib/rsvpStore"
import { siteConfig } from "@/lib/site"

function formatWhen(start: Date) {
  const datePart = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(start)
  const timePart = new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit" }).format(start)
  return `${datePart} - ${timePart} (${timeZone})`
}

function eventStart(event: Event) {
  if (isOneOffEvent(event) && event.startAtLocal) return toLocalDate(event.startAtLocal)
  if (event.recurrence) return nextOccurrenceLocal(event.recurrence)
  return null
}

export function buildRsvpConfirmationEmail(input: { event: Event; rsvp: RsvpRecord }) {
  const start = eventStart(input.event)
  const when = start ? formatWhen(start) : null
  const detailsUrl = `${siteConfig.siteUrl}/events/${input.event.slug}#rsvp`

  const subject = `RSVP confirmed: ${input.event.title}`

  const text =
    `Hi ${input.rsvp.name},\n\n` +
    `Your RSVP is confirmed.\n\n` +
    `Event: ${input.event.title}\n` +
    (when ? `When: ${when}\n` : "") +
    `Seats: ${input.rsvp.seats}\n\n` +
    `Event details: ${detailsUrl}\n\n` +
    `Need to update or cancel? Visit the event page and use the RSVP form (use this email address).\n\n` +
    `- ${siteConfig.nameEn}\n`

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b1f3a">
      <h2 style="margin:0 0 12px 0">RSVP confirmed</h2>
      <p style="margin:0 0 16px 0">Hi ${escapeHtml(input.rsvp.name)},</p>
      <p style="margin:0 0 16px 0">Your RSVP is confirmed.</p>
      <div style="border:1px solid rgba(11,31,58,0.12);border-radius:14px;padding:14px 16px;background:#ffffff">
        <div><strong>Event:</strong> ${escapeHtml(input.event.title)}</div>
        ${when ? `<div><strong>When:</strong> ${escapeHtml(when)}</div>` : ""}
        <div><strong>Seats:</strong> ${input.rsvp.seats}</div>
      </div>
      <p style="margin:16px 0">
        <a href="${detailsUrl}" style="display:inline-block;background:#1557ff;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:12px;font-weight:600">
          View event details
        </a>
      </p>
      <p style="margin:0;color:rgba(11,31,58,0.75)">
        Need to update or cancel? Visit the event page and use the RSVP form (use this email address).
      </p>
      <p style="margin:16px 0 0 0;color:rgba(11,31,58,0.6)">- ${escapeHtml(siteConfig.nameEn)}</p>
    </div>
  `.trim()

  return { subject, text, html }
}

export function buildRsvpAdminNotificationEmail(input: { event: Event; rsvp: RsvpRecord; kind: "created" | "updated" }) {
  const start = eventStart(input.event)
  const when = start ? formatWhen(start) : null
  const detailsUrl = `${siteConfig.siteUrl}/events/${input.event.slug}`

  const subject = `RSVP ${input.kind}: ${input.event.title} (${input.rsvp.seats} seat${input.rsvp.seats === 1 ? "" : "s"})`

  const text =
    `RSVP ${input.kind.toUpperCase()}\n\n` +
    `Event: ${input.event.title}\n` +
    (when ? `When: ${when}\n` : "") +
    `Name: ${input.rsvp.name}\n` +
    `Email: ${input.rsvp.email}\n` +
    `Seats: ${input.rsvp.seats}\n\n` +
    `Event details: ${detailsUrl}\n`

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b1f3a">
      <h2 style="margin:0 0 12px 0">RSVP ${escapeHtml(input.kind)}</h2>
      <div style="border:1px solid rgba(11,31,58,0.12);border-radius:14px;padding:14px 16px;background:#ffffff">
        <div><strong>Event:</strong> ${escapeHtml(input.event.title)}</div>
        ${when ? `<div><strong>When:</strong> ${escapeHtml(when)}</div>` : ""}
        <div><strong>Name:</strong> ${escapeHtml(input.rsvp.name)}</div>
        <div><strong>Email:</strong> ${escapeHtml(input.rsvp.email)}</div>
        <div><strong>Seats:</strong> ${input.rsvp.seats}</div>
      </div>
      <p style="margin:16px 0">
        <a href="${detailsUrl}" style="color:#1557ff;text-decoration:underline">Open event page</a>
      </p>
    </div>
  `.trim()

  return { subject, text, html }
}

export function buildRsvpCancellationEmail(input: { event: Event; rsvp: RsvpRecord }) {
  const start = eventStart(input.event)
  const when = start ? formatWhen(start) : null
  const detailsUrl = `${siteConfig.siteUrl}/events/${input.event.slug}#rsvp`

  const subject = `RSVP canceled: ${input.event.title}`

  const text =
    `Hi ${input.rsvp.name},\n\n` +
    `Your RSVP has been canceled.\n\n` +
    `Event: ${input.event.title}\n` +
    (when ? `When: ${when}\n` : "") +
    `Seats: ${input.rsvp.seats}\n\n` +
    `If this was a mistake, you can RSVP again here: ${detailsUrl}\n\n` +
    `- ${siteConfig.nameEn}\n`

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b1f3a">
      <h2 style="margin:0 0 12px 0">RSVP canceled</h2>
      <p style="margin:0 0 16px 0">Hi ${escapeHtml(input.rsvp.name)},</p>
      <p style="margin:0 0 16px 0">Your RSVP has been canceled.</p>
      <div style="border:1px solid rgba(11,31,58,0.12);border-radius:14px;padding:14px 16px;background:#ffffff">
        <div><strong>Event:</strong> ${escapeHtml(input.event.title)}</div>
        ${when ? `<div><strong>When:</strong> ${escapeHtml(when)}</div>` : ""}
        <div><strong>Seats:</strong> ${input.rsvp.seats}</div>
      </div>
      <p style="margin:16px 0">
        <a href="${detailsUrl}" style="color:#1557ff;text-decoration:underline">RSVP again</a>
      </p>
      <p style="margin:16px 0 0 0;color:rgba(11,31,58,0.6)">- ${escapeHtml(siteConfig.nameEn)}</p>
    </div>
  `.trim()

  return { subject, text, html }
}

export function buildRsvpAdminCancellationEmail(input: { event: Event; rsvp: RsvpRecord }) {
  const start = eventStart(input.event)
  const when = start ? formatWhen(start) : null
  const detailsUrl = `${siteConfig.siteUrl}/events/${input.event.slug}`

  const subject = `RSVP canceled: ${input.event.title} (${input.rsvp.seats} seat${input.rsvp.seats === 1 ? "" : "s"})`

  const text =
    `RSVP CANCELED\n\n` +
    `Event: ${input.event.title}\n` +
    (when ? `When: ${when}\n` : "") +
    `Name: ${input.rsvp.name}\n` +
    `Email: ${input.rsvp.email}\n` +
    `Seats: ${input.rsvp.seats}\n\n` +
    `Event details: ${detailsUrl}\n`

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b1f3a">
      <h2 style="margin:0 0 12px 0">RSVP canceled</h2>
      <div style="border:1px solid rgba(11,31,58,0.12);border-radius:14px;padding:14px 16px;background:#ffffff">
        <div><strong>Event:</strong> ${escapeHtml(input.event.title)}</div>
        ${when ? `<div><strong>When:</strong> ${escapeHtml(when)}</div>` : ""}
        <div><strong>Name:</strong> ${escapeHtml(input.rsvp.name)}</div>
        <div><strong>Email:</strong> ${escapeHtml(input.rsvp.email)}</div>
        <div><strong>Seats:</strong> ${input.rsvp.seats}</div>
      </div>
      <p style="margin:16px 0">
        <a href="${detailsUrl}" style="color:#1557ff;text-decoration:underline">Open event page</a>
      </p>
    </div>
  `.trim()

  return { subject, text, html }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
