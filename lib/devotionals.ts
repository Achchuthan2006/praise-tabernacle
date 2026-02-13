export type Devotional = {
  slug: string
  dateIso: string // YYYY-MM-DD
  titleEn: string
  titleTa: string
  verseRef: string
  verseEn: string
  verseTa: string
  summaryEn: string
  summaryTa: string
  contentEn: string[]
  contentTa: string[]
  youtubeVideoId?: string
}

export const devotionals: Devotional[] = [
  {
    slug: "fear-not-god-is-with-you",
    dateIso: "2026-02-05",
    titleEn: "Devotional: Fear Not — God Is With You",
    titleTa: "தியானம்: பயப்படாதே — தேவன் உங்களோடு இருக்கிறார்",
    verseRef: "Isaiah 41:10",
    verseEn:
      "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you.",
    verseTa:
      "பயப்படாதே, நான் உன்னோடு இருக்கிறேன்; கலங்காதே, நான் உன் தேவன்; நான் உன்னை பலப்படுத்துவேன்; உனக்கு உதவி செய்வேன்.",
    summaryEn: "A short reminder that God strengthens and helps us in every season.",
    summaryTa: "எல்லா காலத்திலும் தேவன் நம்மை பலப்படுத்தி உதவுகிறார் என்ற நினைவூட்டல்.",
    contentEn: [
      "Some days feel heavy — concerns, uncertainty, and fear can quietly build up in our hearts.",
      "God’s promise is not that we will never face challenges, but that we will never face them alone.",
      "Today, speak Isaiah 41:10 aloud. Ask God for strength, and take one small step forward in faith.",
    ],
    contentTa: [
      "சில நாட்கள் கடினமாக தோன்றலாம் — கவலை, உறுதியின்மை, பயம் ஆகியவை மனத்தில் மெதுவாக பெருகலாம்.",
      "தேவனுடைய வாக்குத்தத்தம்: சோதனைகள் வராது அல்ல; ஆனால் அவற்றை நாம் தனியாக எதிர்கொள்வதில்லை.",
      "இன்று எசாயா 41:10-ஐ ஓசையுடன் வாசித்து/சொல்லுங்கள். தேவனிடம் பலத்தை கேட்டு, விசுவாசத்தில் ஒரு சிறிய படி எடுங்கள்.",
    ],
  },
]

export function listDevotionalsNewestFirst() {
  return devotionals.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
}

export function getDevotionalBySlug(slug: string) {
  return devotionals.find((d) => d.slug === slug) ?? null
}

export function getAllDevotionalSlugs() {
  return devotionals.map((d) => d.slug)
}

