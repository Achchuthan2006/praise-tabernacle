export type MagazineLanguage = "en" | "ta" | "both"

export type MagazineIssue = {
  slug: string
  monthIso: string // YYYY-MM
  titleEn: string
  titleTa: string
  language: MagazineLanguage

  // Canva-exported PDF placed under /public (ex: /public/magazine/2026-02-en.pdf).
  pdfHref: string

  // Optional cover image placed under /public (ex: /public/magazine/2026-02-cover.webp).
  coverImageSrc?: string

  // Optional content blocks shown on the issue page.
  pastorMessageTitleEn?: string
  pastorMessageTitleTa?: string
  pastorMessageEn?: string
  pastorMessageTa?: string

  highlightsEn?: string[]
  highlightsTa?: string[]

  teachingArticles?: Array<{ title: string; href: string }>
  testimonies?: Array<{ title: string; href: string }>
}

export const magazineIssues: MagazineIssue[] = [
  {
    slug: "2026-02",
    monthIso: "2026-02",
    titleEn: "February 2026 Magazine",
    titleTa: "பிப்ரவரி 2026 இதழ்",
    language: "both",
    pdfHref: "/magazine/2026-02.pdf",
    coverImageSrc: "/magazine/2026-02-cover.webp",
    pastorMessageTitleEn: "Pastor’s message",
    pastorMessageTitleTa: "போதகரின் செய்தி",
    pastorMessageEn:
      "Welcome to this month’s magazine. Here you’ll find a short message, upcoming events, testimonies, and teaching resources to help you grow in Christ.",
    pastorMessageTa:
      "இந்த மாத இதழுக்கு வரவேற்கிறோம். இதில் ஒரு குறும் செய்தி, வரவிருக்கும் நிகழ்வுகள், சாட்சிகள், மற்றும் போதனை வளங்கள் உள்ளன.",
    highlightsEn: [
      "Upcoming events + service times",
      "A short teaching article",
      "Community testimonies",
      "Ways to get involved and serve",
    ],
    highlightsTa: [
      "வரவிருக்கும் நிகழ்வுகள் + ஆராதனை நேரங்கள்",
      "ஒரு குறும் போதனை கட்டுரை",
      "சமூக சாட்சிகள்",
      "சேவையில் ஈடுபடும் வழிகள்",
    ],
    teachingArticles: [
      { title: "Read our latest blog articles", href: "/blog" },
      { title: "Browse sermon library", href: "/sermons" },
    ],
    testimonies: [{ title: "Watch testimonies", href: "/testimonies" }],
  },
]

export function listMagazineIssuesNewestFirst() {
  return magazineIssues.slice().sort((a, b) => b.monthIso.localeCompare(a.monthIso))
}

export function getMagazineIssueBySlug(slug: string) {
  return magazineIssues.find((m) => m.slug === slug) ?? null
}

export function getAllMagazineIssueSlugs() {
  return magazineIssues.map((m) => m.slug)
}

