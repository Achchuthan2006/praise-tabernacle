export function parseIsoDateUtcNoon(dateIso: string) {
  // dateIso is expected to be YYYY-MM-DD, but we also tolerate
  // YYYY-MM-DDTHH:mm (and similar) by extracting the date portion.
  const raw = String(dateIso ?? "").trim()
  const datePart = raw.length >= 10 ? raw.slice(0, 10) : raw
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return new Date(Number.NaN)

  // Use noon UTC to avoid crossing date boundaries in most time zones.
  return new Date(`${datePart}T12:00:00Z`)
}

export function formatIsoDate(
  dateIso: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) {
  const date = parseIsoDateUtcNoon(dateIso)
  if (Number.isNaN(date.getTime())) return dateIso
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(date)
}
