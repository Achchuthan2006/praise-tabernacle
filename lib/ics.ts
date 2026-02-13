function pad2(value: number) {
  return String(value).padStart(2, "0")
}

function formatIcsLocal(date: Date) {
  return (
    `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}` +
    `T${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(date.getSeconds())}`
  )
}

function buildVeventLines({
  uid,
  title,
  description,
  location,
  startLocal,
  endLocal,
  timeZone,
  url,
  rrule,
}: {
  uid: string
  title: string
  description?: string
  location?: string
  startLocal: Date
  endLocal: Date
  timeZone: string
  url?: string
  rrule?: string
}) {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsLocal(new Date())}Z`,
    `DTSTART;TZID=${timeZone}:${formatIcsLocal(startLocal)}`,
    `DTEND;TZID=${timeZone}:${formatIcsLocal(endLocal)}`,
    `SUMMARY:${escapeIcsText(title)}`,
  ]

  if (description) lines.push(`DESCRIPTION:${escapeIcsText(description)}`)
  if (location) lines.push(`LOCATION:${escapeIcsText(location)}`)
  if (url) lines.push(`URL:${escapeIcsText(url)}`)
  if (rrule) lines.push(`RRULE:${rrule}`)

  lines.push("END:VEVENT")
  return lines
}

export function buildIcsEvent({
  uid,
  title,
  description,
  location,
  startLocal,
  endLocal,
  timeZone,
  url,
}: {
  uid: string
  title: string
  description?: string
  location?: string
  startLocal: Date
  endLocal: Date
  timeZone: string
  url?: string
}) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Praise Tabernacle//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...buildVeventLines({ uid, title, description, location, startLocal, endLocal, timeZone, url }),
    "END:VCALENDAR",
  ]
  return lines.join("\r\n")
}

export function buildIcsCalendar({
  name,
  timeZone,
  events,
}: {
  name: string
  timeZone: string
  events: Array<{
    uid: string
    title: string
    description?: string
    location?: string
    startLocal: Date
    endLocal: Date
    url?: string
    rrule?: string
  }>
}) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Praise Tabernacle//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(name)}`,
    `X-WR-TIMEZONE:${timeZone}`,
  ]

  for (const event of events) {
    lines.push(
      ...buildVeventLines({
        uid: event.uid,
        title: event.title,
        description: event.description,
        location: event.location,
        startLocal: event.startLocal,
        endLocal: event.endLocal,
        timeZone,
        url: event.url,
        rrule: event.rrule,
      }),
    )
  }

  lines.push("END:VCALENDAR")
  return lines.join("\r\n")
}

function escapeIcsText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;")
}
