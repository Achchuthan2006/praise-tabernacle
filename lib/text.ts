const BULLET = "\u2022"
const BULLET_MOJIBAKE_1 = "\u00e2\u20ac\u00a2" // â€¢
const BULLET_MOJIBAKE_2 = "\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00a2" // Ã¢â‚¬Â¢
const APOSTROPHE_MOJIBAKE_1 = "\u00e2\u20ac\u2122" // â€™
const APOSTROPHE_MOJIBAKE_2 = "\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u201e\u00a2" // Ã¢â‚¬â„¢
const EM_DASH_MOJIBAKE_1 = "\u00e2\u20ac\u201d" // â€”
const EN_DASH_MOJIBAKE_1 = "\u00e2\u20ac\u201c" // â€“
const LEFT_ARROW_MOJIBAKE_1 = "\u00e2\u2020\u0090" // â†
const RIGHT_ARROW_MOJIBAKE_1 = "\u00e2\u2020\u2019" // â†’
const CHECK_MOJIBAKE_1 = "\u00e2\u0153\u201c" // âœ“

function decodeLatin1Mojibake(value: string) {
  if (!/[Ãâà]/.test(value)) return value

  try {
    const bytes = new Uint8Array(Array.from(value, (char) => char.charCodeAt(0) & 0xff))
    const decoded = new TextDecoder("utf-8", { fatal: false }).decode(bytes)
    if (!decoded || decoded.includes("\uFFFD")) return value
    return decoded
  } catch {
    return value
  }
}

export function fixMojibakeText(value: string) {
  const decoded = decodeLatin1Mojibake(value)

  return decoded
    .replaceAll(BULLET_MOJIBAKE_2, BULLET)
    .replaceAll(BULLET_MOJIBAKE_1, BULLET)
    .replaceAll(APOSTROPHE_MOJIBAKE_2, "'")
    .replaceAll(APOSTROPHE_MOJIBAKE_1, "'")
    .replaceAll(EM_DASH_MOJIBAKE_1, "\u2014")
    .replaceAll(EN_DASH_MOJIBAKE_1, "\u2013")
    .replaceAll(LEFT_ARROW_MOJIBAKE_1, "\u2190")
    .replaceAll(RIGHT_ARROW_MOJIBAKE_1, "\u2192")
    .replaceAll(CHECK_MOJIBAKE_1, "\u2713")
}

export function normalizeBullets(value: string) {
  return fixMojibakeText(value)
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
