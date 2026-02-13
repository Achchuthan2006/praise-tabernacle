type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type OfficeHours = {
  timeZone: string
  daysOfWeek: DayOfWeek[]
  startLocal: `${number}:${number}` // HH:MM
  endLocal: `${number}:${number}` // HH:MM
}

function getZonedParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  })
  const parts = fmt.formatToParts(date)
  const byType = new Map(parts.map((p) => [p.type, p.value]))
  const wd = (byType.get("weekday") ?? "").toLowerCase()
  const weekday: DayOfWeek =
    wd.startsWith("sun")
      ? 0
      : wd.startsWith("mon")
        ? 1
        : wd.startsWith("tue")
          ? 2
          : wd.startsWith("wed")
            ? 3
            : wd.startsWith("thu")
              ? 4
              : wd.startsWith("fri")
                ? 5
                : 6

  const hour = Number(byType.get("hour") ?? 0)
  const minute = Number(byType.get("minute") ?? 0)
  return { weekday, hour, minute }
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map((v) => Number(v))
  return Math.max(0, Math.min(23, h)) * 60 + Math.max(0, Math.min(59, m))
}

export function isWithinOfficeHours(now: Date, hours: OfficeHours) {
  const { weekday, hour, minute } = getZonedParts(now, hours.timeZone)
  if (!hours.daysOfWeek.includes(weekday)) return false

  const mins = hour * 60 + minute
  const start = toMinutes(hours.startLocal)
  const end = toMinutes(hours.endLocal)

  // Same-day window (assumes start < end).
  if (start === end) return false
  return mins >= start && mins < end
}

