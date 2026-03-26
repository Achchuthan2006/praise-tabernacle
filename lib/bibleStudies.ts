export type BibleStudy = {
  slug: string
  titleEn: string
  titleTa: string
  descriptionEn?: string
  descriptionTa?: string
  dateIso?: string
  speaker?: string
  youtubeVideoId: string
  language?: "en" | "ta" | "mixed"
  topicsEn?: string[]
  topicsTa?: string[]
}

export const bibleStudies: BibleStudy[] = [
  {
    slug: "when-you-feel-weary",
    titleEn: "When You Feel Weary: Biblical Causes, Impact & God's Help",
    titleTa: "நீங்கள் சோர்வாக உணரும்போது: வேதாகம காரணங்கள், விளைவு, மற்றும் தேவனின் உதவி",
    descriptionEn: "A Bible study on spiritual weariness and God's strength for tired hearts.",
    descriptionTa: "ஆவிக்குரிய சோர்வு மற்றும் களைப்பான இதயங்களுக்கு தேவன் தரும் பலத்தைப் பற்றிய வேதாகமப் பாடம்.",
    youtubeVideoId: "x8RrPXleHp8",
    language: "ta",
    topicsEn: ["Bible Study", "Encouragement"],
    topicsTa: ["வேதாகமப் பாடம்", "உற்சாகம்"],
  },
  {
    slug: "waiting-for-gods-timing",
    titleEn: "Waiting for God's Timing",
    titleTa: "தேவனின் நேரத்திற்காக காத்திருத்தல்",
    descriptionEn: "Learning patience, trust, and hope while waiting on the Lord.",
    descriptionTa: "கர்த்தருக்காக காத்திருக்கும் நேரத்தில் பொறுமை, நம்பிக்கை, மற்றும் எதிர்பார்ப்பை கற்பிக்கும் பாடம்.",
    youtubeVideoId: "F03_Qc5NBZ8",
    language: "mixed",
    topicsEn: ["Bible Study", "Faith", "Patience"],
    topicsTa: ["வேதாகமப் பாடம்", "விசுவாசம்", "பொறுமை"],
  },
  {
    slug: "forgive-and-let-go",
    titleEn: "Forgive and Let Go!",
    titleTa: "மன்னித்து விடுங்கள்!",
    descriptionEn: "A study on forgiveness, freedom, and healing in Christ.",
    descriptionTa: "மன்னிப்பு, விடுதலை, மற்றும் கிறிஸ்துவில் உள்ள சுகமடைதலைப் பற்றிய வேதாகமப் பாடம்.",
    youtubeVideoId: "RvtSXAJju1c",
    language: "ta",
    topicsEn: ["Bible Study", "Forgiveness"],
    topicsTa: ["வேதாகமப் பாடம்", "மன்னிப்பு"],
  },
  {
    slug: "he-knows-it",
    titleEn: "He Knows It",
    titleTa: "அவர் அதனை அறிவார்",
    descriptionEn: "God knows every detail of our lives and walks with us through it all.",
    descriptionTa: "நம் வாழ்க்கையின் எல்லா விவரங்களையும் தேவன் அறிந்திருக்கிறார்; அனைத்திலும் நம்முடன் நடக்கிறார்.",
    dateIso: "2022-07-01",
    youtubeVideoId: "V3UIzCsfS6g",
    language: "ta",
    topicsEn: ["Bible Study", "Faith"],
    topicsTa: ["வேதாகமப் பாடம்", "விசுவாசம்"],
  },
  {
    slug: "loneliness-tanimai",
    titleEn: "Loneliness",
    titleTa: "தனிமை",
    descriptionEn: "Finding God's presence and hope in seasons of loneliness.",
    descriptionTa: "தனிமையின் காலங்களில் தேவனின் சந்நிதியையும் நம்பிக்கையையும் காண உதவும் போதனை.",
    youtubeVideoId: "EGTb8V22Uw4",
    language: "mixed",
    topicsEn: ["Bible Study", "Encouragement"],
    topicsTa: ["வேதாகமப் பாடம்", "உற்சாகம்"],
  },
  {
    slug: "put-god-first",
    titleEn: "Put God First",
    titleTa: "தேவனை முன்வையுங்கள்",
    descriptionEn: "A practical Bible study on surrender, priorities, and discipleship.",
    descriptionTa: "ஒப்புக்கொடுத்தல், முன்னுரிமைகள், மற்றும் சீடத்துவத்தைப் பற்றிய நடைமுறை வேதாகமப் பாடம்.",
    youtubeVideoId: "twe5t3AWz9k",
    language: "mixed",
    topicsEn: ["Bible Study", "Discipleship"],
    topicsTa: ["வேதாகமப் பாடம்", "சீடத்துவம்"],
  },
  {
    slug: "debt-prison",
    titleEn: "Debt Prison",
    titleTa: "கடன் சிறை",
    descriptionEn: "Biblical wisdom for debt, stewardship, and financial freedom.",
    descriptionTa: "கடன், பரிபாலனம், மற்றும் நிதி விடுதலை பற்றிய வேதாகம ஞானம்.",
    youtubeVideoId: "m3cfWrnUrbo",
    language: "en",
    topicsEn: ["Bible Study", "Stewardship"],
    topicsTa: ["வேதாகமப் பாடம்", "பரிபாலனம்"],
  },
  {
    slug: "lessons-from-the-storm",
    titleEn: "Lessons from the Storm",
    titleTa: "புயலிலிருந்து கிடைக்கும் பாடங்கள்",
    descriptionEn: "What storms teach us about trust, obedience, and God's peace.",
    descriptionTa: "புயல்கள் நம்பிக்கை, கீழ்ப்படிதல், மற்றும் தேவனின் சமாதானம் பற்றி எதை கற்பிக்கின்றன என்பதைப் பற்றிய பாடம்.",
    youtubeVideoId: "kAJGVCn0VJ4",
    language: "en",
    topicsEn: ["Bible Study", "Faith", "Trials"],
    topicsTa: ["வேதாகமப் பாடம்", "விசுவாசம்", "சோதனைகள்"],
  },
  {
    slug: "treachery-durogam",
    titleEn: "Treachery",
    titleTa: "துரோகம்",
    descriptionEn: "Responding to betrayal with truth, wisdom, and grace.",
    descriptionTa: "துரோகத்திற்கு உண்மை, ஞானம், மற்றும் கிருபையுடன் பதிலளிப்பதைப் பற்றிய போதனை.",
    youtubeVideoId: "RDDJFOS9jng",
    language: "mixed",
    topicsEn: ["Bible Study", "Character", "Forgiveness"],
    topicsTa: ["வேதாகமப் பாடம்", "குணநலம்", "மன்னிப்பு"],
  },
  {
    slug: "overcome-accusation",
    titleEn: "How to Overcome Accusation?",
    titleTa: "குற்றச்சாட்டை மேற்கொள்வது எப்படி?",
    descriptionEn: "A Bible study on identity, spiritual warfare, and standing in grace.",
    descriptionTa: "அடையாளம், ஆவிக்குரிய போராட்டம், மற்றும் கிருபையில் நிலைத்திருப்பதைப் பற்றிய வேதாகமப் பாடம்.",
    youtubeVideoId: "KivtnrSduiM",
    language: "mixed",
    topicsEn: ["Bible Study", "Spiritual Warfare", "Identity"],
    topicsTa: ["வேதாகமப் பாடம்", "ஆவிக்குரிய போராட்டம்", "அடையாளம்"],
  },
  {
    slug: "cleanse-inside-and-out",
    titleEn: "Cleansed Inside and Out",
    titleTa: "உள்ளும் புறமும் சுத்திகரிக்கப்படுதல்",
    descriptionEn: "Holiness begins in the heart and shapes the whole life.",
    descriptionTa: "பரிசுத்தம் இதயத்தில் தொடங்கி முழு வாழ்வையும் மாற்றுகிறது.",
    youtubeVideoId: "_Oh3EI1Nifk",
    language: "ta",
    topicsEn: ["Bible Study", "Holiness"],
    topicsTa: ["வேதாகமப் பாடம்", "பரிசுத்தம்"],
  },
  {
    slug: "lessons-from-job",
    titleEn: "Lessons from the Book of Job",
    titleTa: "யோபு புத்தகத்திலிருந்து பாடங்கள்",
    descriptionEn: "Learning endurance, trust, and worship through suffering.",
    descriptionTa: "துன்பத்தின் வழியாக நிலைத்திருத்தல், நம்பிக்கை, மற்றும் ஆராதனையை கற்பிக்கும் பாடம்.",
    youtubeVideoId: "Kma-rkzK-V4",
    language: "en",
    topicsEn: ["Bible Study", "Suffering", "Faith"],
    topicsTa: ["வேதாகமப் பாடம்", "துன்பம்", "விசுவாசம்"],
  },
  {
    slug: "marriage-bond-bible-study",
    titleEn: "The Bond of Marriage",
    titleTa: "திருமணம் என்னும் பந்தம்",
    descriptionEn: "Biblical teaching on covenant, love, and unity in marriage.",
    descriptionTa: "உடன்படிக்கை, அன்பு, மற்றும் திருமண ஒற்றுமையைப் பற்றிய வேதாகம போதனை.",
    youtubeVideoId: "g_IzHTUDfIU",
    language: "ta",
    topicsEn: ["Bible Study", "Marriage"],
    topicsTa: ["வேதாகமப் பாடம்", "திருமணம்"],
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
