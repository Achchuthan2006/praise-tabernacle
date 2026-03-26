export type PromiseKind = "month" | "year"

export type PromiseVideo = {
  kind: PromiseKind
  titleEn: string
  titleTa: string
  dateIso?: string
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
    verseRefEn: "Psalm 23:1",
    verseRefTa: "சங்கீதம் 23:1",
    verseTextEn: "The LORD is my shepherd; I shall not want.",
    verseTextTa: "கர்த்தர் என் மேய்ப்பர்; எனக்குக் குறைவில்லாது.",
    descriptionEn:
      "A short teaching on the monthly promise verse to encourage your faith and strengthen your walk with Christ.",
    descriptionTa:
      "மாதத்தின் வாக்குத்தத்த வசனத்தை அடிப்படையாகக் கொண்டு, உங்கள் விசுவாசத்தை உறுதிப்படுத்தவும் கிறிஸ்துவோடு நடப்பை பலப்படுத்தவும் உதவும் குறும் தியானம்.",
    youtubeVideoId: "jVQiZbMsxio",
    graphicSrc: "/verse-1.webp",
  },
  {
    kind: "year",
    titleEn: "Promise of the Year",
    titleTa: "ஆண்டின் வாக்குத்தத்தம்",
    verseRefEn: "Jeremiah 29:11",
    verseRefTa: "எரேமியா 29:11",
    verseTextEn:
      "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
    verseTextTa:
      "நான் உங்களுக்காக நினைக்கும் நினைவுகளை அறிந்திருக்கிறேன் என்று கர்த்தர் சொல்லுகிறார்; அவை தீமைக்கல்ல, சமாதானத்திற்கே, உங்களுக்கு எதிர்காலமும் நம்பிக்கையும் கொடுக்கவே.",
    descriptionEn:
      "A dedicated message for the year's promise verse, with notes and a simple transcript section.",
    descriptionTa:
      "ஆண்டின் வாக்குத்தத்த வசனத்திற்கான சிறப்பு செய்தி, குறிப்புகள் மற்றும் எளிய உரை வடிவத்துடன்.",
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
      "சமாதானத்தை உங்களுக்குத் தந்து வைக்கிறேன்; என் சமாதானத்தை உங்களுக்குக் கொடுக்கிறேன். உங்கள் இருதயம் கலங்காதிருப்பதாக; பயப்படாதிருப்பதாக.",
    descriptionEn: "A 2-3 minute devotional on peace for today.",
    descriptionTa: "இன்றைக்கான சமாதானத்தைப் பற்றிய 2-3 நிமிட குறும் தியானம்.",
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
    descriptionEn: "A short devotional on God's help and strength.",
    descriptionTa: "தேவனின் உதவி மற்றும் வலிமையைப் பற்றிய குறும் தியானம்.",
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
      "நீ நடக்க வேண்டிய வழியை உனக்குப் போதித்து உனக்குக் கற்றுக்கொடுப்பேன்; உன் மேல் என் கண் இருக்கும்; உனக்கு ஆலோசனை தருவேன்.",
    descriptionEn: "A 2-3 minute devotional on guidance for your day.",
    descriptionTa: "உங்கள் நாளுக்கான வழிகாட்டுதலைப் பற்றிய 2-3 நிமிட குறும் தியானம்.",
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
