function pad2(value: number) {
  return String(value).padStart(2, "0")
}

function formatGoogleLocal(date: Date) {
  return (
    `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}` +
    `T${pad2(date.getHours())}${pad2(date.getMinutes())}00`
  )
}

function formatOutlookIso(date: Date) {
  return (
    `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}` +
    `T${pad2(date.getHours())}:${pad2(date.getMinutes())}:00`
  )
}

export function googleCalendarUrl({
  title,
  details,
  location,
  startLocal,
  endLocal,
  timeZone,
}: {
  title: string
  details?: string
  location?: string
  startLocal: Date
  endLocal: Date
  timeZone: string
}) {
  const url = new URL("https://calendar.google.com/calendar/render")
  url.searchParams.set("action", "TEMPLATE")
  url.searchParams.set("text", title)
  url.searchParams.set("dates", `${formatGoogleLocal(startLocal)}/${formatGoogleLocal(endLocal)}`)
  url.searchParams.set("ctz", timeZone)
  if (details) url.searchParams.set("details", details)
  if (location) url.searchParams.set("location", location)
  return url.toString()
}

export function outlookCalendarUrl({
  title,
  body,
  location,
  startLocal,
  endLocal,
}: {
  title: string
  body?: string
  location?: string
  startLocal: Date
  endLocal: Date
}) {
  const url = new URL("https://outlook.office.com/calendar/0/deeplink/compose")
  url.searchParams.set("path", "/calendar/action/compose")
  url.searchParams.set("subject", title)
  url.searchParams.set("startdt", formatOutlookIso(startLocal))
  url.searchParams.set("enddt", formatOutlookIso(endLocal))
  if (body) url.searchParams.set("body", body)
  if (location) url.searchParams.set("location", location)
  return url.toString()
}

