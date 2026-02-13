const BULLET = "\u2022"
const BULLET_MOJIBAKE_1 = "\u00e2\u20ac\u00a2" // â€¢
const BULLET_MOJIBAKE_2 = "\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00a2" // Ã¢â‚¬Â¢

export function normalizeBullets(value: string) {
  return value
    .replaceAll(BULLET_MOJIBAKE_2, BULLET)
    .replaceAll(BULLET_MOJIBAKE_1, BULLET)
}

export function splitDayTime(value: string) {
  const normalized = normalizeBullets(value)
  const parts = normalized
    .split(BULLET)
    .map((p) => p.trim())
    .filter(Boolean)

  if (parts.length >= 2) return { day: parts[0], time: parts.slice(1).join(` ${BULLET} `) }
  return { day: "Sunday", time: normalized }
}

export function joinWithBullet(values: string[]) {
  return values.filter(Boolean).join(` ${BULLET} `)
}

