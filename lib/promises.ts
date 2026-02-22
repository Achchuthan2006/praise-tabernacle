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
    titleTa: "à®®à®¾à®¤à®¤à¯à®¤à®¿à®©à¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤à®®à¯",
    dateIso: "2025-11-01",
    verseRefEn: "Psalm 23:1",
    verseRefTa: "சங்கீதம் 23:1",
    verseTextEn: "The LORD is my shepherd; I shall not want.",
    verseTextTa: "கர்த்தர் என் மேய்ப்பர்; எனக்குக் குறைவில்லாது.",
    descriptionEn:
      "A short teaching on the monthly promise verse to encourage your faith and strengthen your walk with Christ.",
    descriptionTa:
      "à®®à®¾à®¤à®¤à¯à®¤à®¿à®©à¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤ à®µà®šà®©à®¤à¯à®¤à¯ˆ à®…à®Ÿà®¿à®ªà¯à®ªà®Ÿà¯ˆà®¯à®¾à®•à®•à¯ à®•à¯Šà®£à¯à®Ÿà¯, à®µà®¿à®šà¯à®µà®¾à®šà®¤à¯à®¤à¯ˆ à®Šà®•à¯à®•à®ªà¯à®ªà®Ÿà¯à®¤à¯à®¤à¯à®®à¯ à®®à®±à¯à®±à¯à®®à¯ à®µà®¾à®´à¯à®•à¯à®•à¯ˆà®ªà¯ à®ªà®¯à®£à®¤à¯à®¤à¯ˆ à®ªà®²à®ªà¯à®ªà®Ÿà¯à®¤à¯à®¤à¯à®®à¯ à®•à¯à®±à¯à®¨à¯à®¤à¯â€‹à®¤à®¿à®¯à®¾à®©à®®à¯.",
    // Reuse the existing seed sermon video (edit anytime).
    youtubeVideoId: "jVQiZbMsxio",
    graphicSrc: "/verse-1.webp",
  },
  {
    kind: "year",
    titleEn: "Promise of the Year",
    titleTa: "à®†à®£à¯à®Ÿà®¿à®©à¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤à®®à¯",
    verseRefEn: "Jeremiah 29:11",
    verseRefTa: "எரேமியா 29:11",
    verseTextEn: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
    verseTextTa: "நான் உங்களுக்காக நினைக்கும் நினைவுகளை அறிந்திருக்கிறேன் என்று கர்த்தர் சொல்லுகிறார்; அவை தீமைக்கல்ல, சமாதானத்திற்கே, உங்களுக்கு எதிர்காலமும் நம்பிக்கையும் கொடுக்கவே.",
    descriptionEn:
      "A dedicated message for the yearâ€™s promise verse, with notes and a simple transcript section.",
    descriptionTa:
      "à®†à®£à¯à®Ÿà®¿à®©à¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤ à®µà®šà®©à®¤à¯à®¤à®¿à®±à¯à®•à®¾à®© à®šà®¿à®±à®ªà¯à®ªà¯ à®šà¯†à®¯à¯à®¤à®¿ â€” à®•à¯à®±à®¿à®ªà¯à®ªà¯à®•à®³à¯ à®®à®±à¯à®±à¯à®®à¯ à®Žà®³à®¿à®¯ à®‰à®°à¯ˆ (transcript) à®ªà®•à¯à®¤à®¿à®¯à¯à®Ÿà®©à¯.",
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
    titleTa: "à®‡à®©à¯à®±à¯ˆà®¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤à®®à¯",
    verseRefEn: "John 14:27",
    verseRefTa: "à®¯à¯‹à®µà®¾à®©à¯ 14:27",
    verseTextEn:
      "Peace I leave with you; my peace I give to you. Let not your heart be troubled, neither let it be afraid.",
    verseTextTa:
      "à®šà®®à®¾à®¤à®¾à®©à®¤à¯à®¤à¯ˆ à®‰à®™à¯à®•à®³à¯à®•à¯à®•à¯à®¤à¯ à®¤à®¨à¯à®¤à¯ à®µà¯ˆà®•à¯à®•à®¿à®±à¯‡à®©à¯; à®Žà®©à¯ à®šà®®à®¾à®¤à®¾à®©à®¤à¯à®¤à¯ˆ à®‰à®™à¯à®•à®³à¯à®•à¯à®•à¯ à®…à®³à®¿à®•à¯à®•à®¿à®±à¯‡à®©à¯. à®‰à®™à¯à®•à®³à¯ à®‡à®°à¯à®¤à®¯à®®à¯ à®•à®²à®™à¯à®•à®¾à®¤à®¿à®°à¯à®ªà¯à®ªà®¤à®¾à®•; à®ªà®¯à®ªà¯à®ªà®Ÿà®¾à®¤à®¿à®°à¯à®ªà¯à®ªà®¤à®¾à®•.",
    descriptionEn: "A 2â€“3 minute devotional on peace for today.",
    descriptionTa: "à®‡à®©à¯à®±à¯ˆà®•à¯à®•à®¾à®© à®šà®®à®¾à®¤à®¾à®©à®®à¯ à®•à¯à®±à®¿à®¤à¯à®¤à¯ 2â€“3 à®¨à®¿à®®à®¿à®Ÿ à®¤à®¿à®¯à®¾à®©à®®à¯.",
    youtubeVideoId: "",
    graphicSrc: "/verse-3.webp",
  },
  {
    id: "strength",
    titleEn: "Today's Promise",
    titleTa: "à®‡à®©à¯à®±à¯ˆà®¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤à®®à¯",
    verseRefEn: "Isaiah 41:10",
    verseRefTa: "à®Žà®šà®¾à®¯à®¾ 41:10",
    verseTextEn:
      "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.",
    verseTextTa:
      "à®ªà®¯à®ªà¯à®ªà®Ÿà®¾à®¤à¯‡; à®¨à®¾à®©à¯ à®‰à®©à¯à®©à¯‹à®Ÿà®¿à®°à¯à®•à¯à®•à®¿à®±à¯‡à®©à¯. à®•à®²à®™à¯à®•à®¾à®¤à¯‡; à®¨à®¾à®©à¯ à®‰à®©à¯ à®¤à¯‡à®µà®©à¯. à®¨à®¾à®©à¯ à®‰à®©à¯à®©à¯ˆ à®µà®²à®¿à®®à¯ˆà®ªà¯à®ªà®Ÿà¯à®¤à¯à®¤à®¿ à®‰à®¤à®µà®¿ à®šà¯†à®¯à¯à®µà¯‡à®©à¯.",
    descriptionEn: "A short devotional on Godâ€™s help and strength.",
    descriptionTa: "à®¤à¯‡à®µà®©à®¿à®©à¯ à®‰à®¤à®µà®¿ à®®à®±à¯à®±à¯à®®à¯ à®µà®²à®¿à®®à¯ˆ à®•à¯à®±à®¿à®¤à¯à®¤à¯ à®•à¯à®±à¯à®¨à¯ à®¤à®¿à®¯à®¾à®©à®®à¯.",
    youtubeVideoId: "",
    graphicSrc: "/verse-4.webp",
  },
  {
    id: "guidance",
    titleEn: "Today's Promise",
    titleTa: "à®‡à®©à¯à®±à¯ˆà®¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤à®®à¯",
    verseRefEn: "Psalm 32:8",
    verseRefTa: "à®šà®™à¯à®•à¯€à®¤à®®à¯ 32:8",
    verseTextEn:
      "I will instruct you and teach you in the way you should go; I will counsel you with my eye upon you.",
    verseTextTa:
      "à®¨à¯€ à®¨à®Ÿà®•à¯à®• à®µà¯‡à®£à¯à®Ÿà®¿à®¯ à®µà®´à®¿à®¯à¯ˆ à®‰à®©à®•à¯à®•à¯à®ªà¯ à®ªà¯‹à®¤à®¿à®¤à¯à®¤à¯ à®‰à®©à®•à¯à®•à¯à®•à¯ à®•à®±à¯à®±à¯à®•à¯à®•à¯Šà®Ÿà¯à®ªà¯à®ªà¯‡à®©à¯; à®‰à®©à¯ à®®à¯‡à®²à¯ à®Žà®©à¯ à®•à®£à¯ à®‡à®°à¯à®•à¯à®•à¯à®®à¯; à®‰à®©à®•à¯à®•à¯à®•à¯ à®†à®²à¯‹à®šà®©à¯ˆ à®¤à®°à¯à®µà¯‡à®©à¯.",
    descriptionEn: "A 2â€“3 minute devotional on guidance for your day.",
    descriptionTa: "à®‰à®™à¯à®•à®³à¯ à®¨à®¾à®³à¯à®•à¯à®•à®¾à®© à®µà®´à®¿à®•à®¾à®Ÿà¯à®Ÿà¯à®¤à®²à¯ à®•à¯à®±à®¿à®¤à¯à®¤à¯ 2â€“3 à®¨à®¿à®®à®¿à®Ÿ à®¤à®¿à®¯à®¾à®©à®®à¯.",
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
        titleTa: "à®‡à®©à¯à®±à¯ˆà®¯ à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤à®®à¯",
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

