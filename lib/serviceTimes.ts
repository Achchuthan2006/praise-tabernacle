export type ParsedWeeklyTime = {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  hour24: number
  minute: number
}

const dayOfWeekByName: Array<{ key: string; dayOfWeek: ParsedWeeklyTime["dayOfWeek"] }> = [
  { key: "sunday", dayOfWeek: 0 },
  { key: "monday", dayOfWeek: 1 },
  { key: "tuesday", dayOfWeek: 2 },
  { key: "wednesday", dayOfWeek: 3 },
  { key: "thursday", dayOfWeek: 4 },
  { key: "friday", dayOfWeek: 5 },
  { key: "saturday", dayOfWeek: 6 },
]

export function parseWeeklyTimeText(text: string): ParsedWeeklyTime | null {
  const lower = text.toLowerCase()
  const day = dayOfWeekByName.find((d) => lower.includes(d.key) || lower.includes(`${d.key}s`))?.dayOfWeek
  if (day === undefined) return null

  const m = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/)
  if (!m) return null
  const hh = Number(m[1])
  const mm = Number(m[2] ?? "0")
  const mer = m[3]
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null
  if (hh < 1 || hh > 12 || mm < 0 || mm > 59) return null

  const hour24 = mer === "pm" ? (hh % 12) + 12 : hh % 12
  return { dayOfWeek: day, hour24, minute: mm }
}

export function nextWeeklyOccurrence({ dayOfWeek, hour24, minute }: ParsedWeeklyTime, now = new Date()) {
  const base = new Date(now.getTime())
  base.setSeconds(0, 0)

  const currentDow = base.getDay()
  let deltaDays = (dayOfWeek - currentDow + 7) % 7

  const candidate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), hour24, minute, 0, 0)
  if (deltaDays === 0 && candidate <= base) deltaDays = 7

  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + deltaDays, hour24, minute, 0, 0)
}

