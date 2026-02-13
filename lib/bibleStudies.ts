export type BibleStudy = {
  slug: string
  title: string
  dateIso?: string
  speaker?: string
  youtubeVideoId: string
  language?: "en" | "ta" | "mixed"
  topics?: string[]
}

// Add Bible study videos here (YouTube video IDs). These are shown on /bible-studies.
export const bibleStudies: BibleStudy[] = [
  {
    slug: "when-you-feel-weary",
    title: "When You Feel Weary: Biblical Causes, Impact & God’s Help",
    youtubeVideoId: "x8RrPXleHp8",
    language: "ta",
    topics: ["Bible Study", "Encouragement"],
  },
  {
    slug: "waiting-for-gods-timing",
    title: "Waiting for God's Timing - தேவனின் நேரத்திற்காய் காத்திருத்தல்",
    youtubeVideoId: "F03_Qc5NBZ8",
    language: "mixed",
    topics: ["Bible Study", "Faith", "Patience"],
  },
  {
    slug: "forgive-and-let-go",
    title: "மன்னித்து விடுங்கள்!",
    youtubeVideoId: "RvtSXAJju1c",
    language: "ta",
    topics: ["Bible Study", "Forgiveness"],
  },
  {
    slug: "he-knows-it",
    title: "அவர் அதனை அறிவார்",
    dateIso: "2022-07-01",
    youtubeVideoId: "V3UIzCsfS6g",
    language: "ta",
    topics: ["Bible Study", "Faith"],
  },
  {
    slug: "loneliness-tanimai",
    title: "Loneliness - தனிமை",
    youtubeVideoId: "EGTb8V22Uw4",
    language: "mixed",
    topics: ["Bible Study", "Encouragement"],
  },
  {
    slug: "put-god-first",
    title: "PUT GOD FIRST - தேவனை முன்வையுங்கள்",
    youtubeVideoId: "twe5t3AWz9k",
    language: "mixed",
    topics: ["Bible Study", "Discipleship"],
  },
  {
    slug: "debt-prison",
    title: "DEBT PRISON",
    youtubeVideoId: "m3cfWrnUrbo",
    language: "en",
    topics: ["Bible Study", "Stewardship"],
  },
  {
    slug: "lessons-from-the-storm",
    title: "Lessons from the Storm",
    youtubeVideoId: "kAJGVCn0VJ4",
    language: "en",
    topics: ["Bible Study", "Faith", "Trials"],
  },
  {
    slug: "treachery-durogam",
    title: "துரோகம் - Treachery",
    youtubeVideoId: "RDDJFOS9jng",
    language: "mixed",
    topics: ["Bible Study", "Character", "Forgiveness"],
  },
  {
    slug: "overcome-accusation",
    title: "How to Overcome Accusation? குற்றச்சாட்டை மேற்கொள்ளுவதெப்படி?",
    youtubeVideoId: "KivtnrSduiM",
    language: "mixed",
    topics: ["Bible Study", "Spiritual Warfare", "Identity"],
  },
  {
    slug: "cleanse-inside-and-out",
    title: "உள்ளும் புறமும் சுத்திகரிக்கப்படாவிட்டால் நீங்கள் உதவாத பாத்திரம் தான்!",
    youtubeVideoId: "_Oh3EI1Nifk",
    language: "ta",
    topics: ["Bible Study", "Holiness"],
  },
  {
    slug: "lessons-from-job",
    title: "Lessons from the Book of Job",
    youtubeVideoId: "Kma-rkzK-V4",
    language: "en",
    topics: ["Bible Study", "Suffering", "Faith"],
  },
  {
    slug: "marriage-bond-bible-study",
    title: "திருமணம் என்னும் பந்தம் - Bible study",
    youtubeVideoId: "g_IzHTUDfIU",
    language: "ta",
    topics: ["Bible Study", "Marriage"],
  },
]

export function getAllBibleStudySlugs() {
  return bibleStudies.map((s) => s.slug)
}

function normalizeStudySlug(value: unknown) {
  if (typeof value !== "string") return ""
  const trimmed = value.trim()
  const withoutQuery = trimmed.split("?")[0]?.split("#")[0] ?? trimmed
  try {
    return decodeURIComponent(withoutQuery).toLowerCase()
  } catch {
    return withoutQuery.toLowerCase()
  }
}

export function getBibleStudyBySlug(slug: string | undefined | null) {
  const normalized = normalizeStudySlug(slug)
  return bibleStudies.find((s) => s.slug.toLowerCase() === normalized) ?? null
}
