export type PromiseKind = "month" | "year"

export type PromiseVideo = {
  kind: PromiseKind
  titleEn: string
  titleTa: string
  dateIso?: string // YYYY-MM-DD
  verseRefEn: string
  verseRefTa: string
  verseTextEn: string
  verseTextTa: string
  descriptionEn: string
  descriptionTa: string
  youtubeVideoId?: string
  transcriptText?: string
  graphicSrc?: string
}

export const promiseVideos: PromiseVideo[] = [
  {
    kind: "month",
    titleEn: "Promise of the Month",
    titleTa: "மாதத்தின் வாக்குத்தத்தம்",
    dateIso: "2025-11-01",
    verseRefEn: "Update this verse reference",
    verseRefTa: "இந்த வசன குறிப்பை புதுப்பிக்கவும்",
    verseTextEn: "Add the promise verse text here.",
    verseTextTa: "வாக்குத்தத்த வசனத்தை இங்கே சேர்க்கவும்.",
    descriptionEn:
      "A short teaching on the monthly promise verse to encourage your faith and strengthen your walk with Christ.",
    descriptionTa:
      "மாதத்தின் வாக்குத்தத்த வசனத்தை அடிப்படையாகக் கொண்டு, விசுவாசத்தை ஊக்கப்படுத்தும் மற்றும் வாழ்க்கைப் பயணத்தை பலப்படுத்தும் குறுந்த்​தியானம்.",
    // Reuse the existing seed sermon video (edit anytime).
    youtubeVideoId: "jVQiZbMsxio",
    graphicSrc: "/verse-1.webp",
  },
  {
    kind: "year",
    titleEn: "Promise of the Year",
    titleTa: "ஆண்டின் வாக்குத்தத்தம்",
    verseRefEn: "Update this verse reference",
    verseRefTa: "இந்த வசன குறிப்பை புதுப்பிக்கவும்",
    verseTextEn: "Add the promise verse text here.",
    verseTextTa: "வாக்குத்தத்த வசனத்தை இங்கே சேர்க்கவும்.",
    descriptionEn:
      "A dedicated message for the year’s promise verse, with notes and a simple transcript section.",
    descriptionTa:
      "ஆண்டின் வாக்குத்தத்த வசனத்திற்கான சிறப்பு செய்தி — குறிப்புகள் மற்றும் எளிய உரை (transcript) பகுதியுடன்.",
    // Add the YouTube video id when available.
    youtubeVideoId: "",
    graphicSrc: "/verse-2.webp",
  },
]

export function getPromiseVideo(kind: PromiseKind) {
  return promiseVideos.find((p) => p.kind === kind) ?? null
}

export type DailyPromise = {
  id: string
  titleEn: string
  titleTa: string
  verseRefEn: string
  verseRefTa: string
  verseTextEn: string
  verseTextTa: string
  descriptionEn: string
  descriptionTa: string
  youtubeVideoId?: string
  graphicSrc?: string
}

// Seed daily promises (add as many as you'd like).
// Rotation: we pick one per day based on day-of-year (America/Toronto).
export const dailyPromises: DailyPromise[] = [
  {
    id: "peace",
    titleEn: "Today's Promise",
    titleTa: "இன்றைய வாக்குத்தத்தம்",
    verseRefEn: "John 14:27",
    verseRefTa: "யோவான் 14:27",
    verseTextEn:
      "Peace I leave with you; my peace I give to you. Let not your heart be troubled, neither let it be afraid.",
    verseTextTa:
      "சமாதானத்தை உங்களுக்குத் தந்து வைக்கிறேன்; என் சமாதானத்தை உங்களுக்கு அளிக்கிறேன். உங்கள் இருதயம் கலங்காதிருப்பதாக; பயப்படாதிருப்பதாக.",
    descriptionEn: "A 2–3 minute devotional on peace for today.",
    descriptionTa: "இன்றைக்கான சமாதானம் குறித்து 2–3 நிமிட தியானம்.",
    youtubeVideoId: "",
    graphicSrc: "/verse-3.webp",
  },
  {
    id: "strength",
    titleEn: "Today's Promise",
    titleTa: "இன்றைய வாக்குத்தத்தம்",
    verseRefEn: "Isaiah 41:10",
    verseRefTa: "எசாயா 41:10",
    verseTextEn:
      "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.",
    verseTextTa:
      "பயப்படாதே; நான் உன்னோடிருக்கிறேன். கலங்காதே; நான் உன் தேவன். நான் உன்னை வலிமைப்படுத்தி உதவி செய்வேன்.",
    descriptionEn: "A short devotional on God’s help and strength.",
    descriptionTa: "தேவனின் உதவி மற்றும் வலிமை குறித்து குறுந் தியானம்.",
    youtubeVideoId: "",
    graphicSrc: "/verse-4.webp",
  },
  {
    id: "guidance",
    titleEn: "Today's Promise",
    titleTa: "இன்றைய வாக்குத்தத்தம்",
    verseRefEn: "Psalm 32:8",
    verseRefTa: "சங்கீதம் 32:8",
    verseTextEn:
      "I will instruct you and teach you in the way you should go; I will counsel you with my eye upon you.",
    verseTextTa:
      "நீ நடக்க வேண்டிய வழியை உனக்குப் போதித்து உனக்குக் கற்றுக்கொடுப்பேன்; உன் மேல் என் கண் இருக்கும்; உனக்குக் ஆலோசனை தருவேன்.",
    descriptionEn: "A 2–3 minute devotional on guidance for your day.",
    descriptionTa: "உங்கள் நாளுக்கான வழிகாட்டுதல் குறித்து 2–3 நிமிட தியானம்.",
    youtubeVideoId: "",
  },
]

export const PROMISES_TIMEZONE = "America/Toronto"

export function getIsoDateInTimeZone(date: Date, timeZone = PROMISES_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date)
  const year = parts.find((p) => p.type === "year")?.value ?? ""
  const month = parts.find((p) => p.type === "month")?.value ?? ""
  const day = parts.find((p) => p.type === "day")?.value ?? ""
  if (!year || !month || !day) return ""
  return `${year}-${month}-${day}`
}

export function dayOfYearFromIsoDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map((v) => Number(v))
  if (!y || !m || !d) return 1
  const utc = Date.UTC(y, m - 1, d)
  const start = Date.UTC(y, 0, 1)
  return Math.floor((utc - start) / 86_400_000) + 1
}

export function getDailyPromiseForIsoDate(isoDate: string): { promise: DailyPromise; index: number } {
  const list = dailyPromises.length ? dailyPromises : []
  if (!list.length) {
    return {
      promise: {
        id: "daily",
        titleEn: "Today's Promise",
        titleTa: "இன்றைய வாக்குத்தத்தம்",
        verseRefEn: "",
        verseRefTa: "",
        verseTextEn: "",
        verseTextTa: "",
        descriptionEn: "",
        descriptionTa: "",
      },
      index: 0,
    }
  }
  const doy = dayOfYearFromIsoDate(isoDate)
  const index = (Math.max(1, doy) - 1) % list.length
  return { promise: list[index]!, index }
}

export function getDailyPromiseForDate(date: Date, timeZone = PROMISES_TIMEZONE) {
  const iso = getIsoDateInTimeZone(date, timeZone)
  const { promise, index } = getDailyPromiseForIsoDate(iso || "1970-01-01")
  return { isoDate: iso, promise, index }
}
