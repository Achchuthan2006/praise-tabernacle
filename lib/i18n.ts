export type Language = "en" | "ta"

export const DEFAULT_LANGUAGE: Language = "en"
export const LANGUAGE_STORAGE_KEY = "pt_lang"

export function isLanguage(value: string): value is Language {
  return value === "en" || value === "ta"
}

export const ui = {
  nav: {
    home: { en: "Home", ta: "முகப்பு" },
    about: { en: "About", ta: "எங்களைப் பற்றி" },
    pastor: { en: "Pastor", ta: "போதகர்" },
    sermons: { en: "Sermons", ta: "பிரசங்கங்கள்" },
    events: { en: "Events", ta: "நிகழ்வுகள்" },
    ministries: { en: "Ministries", ta: "சேவைகள்" },
    give: { en: "Give", ta: "கொடுங்கள்" },
    contact: { en: "Contact", ta: "தொடர்பு" },
  },
  cta: {
    watchOnline: { en: "Watch Online", ta: "ஆன்லைனில் பாருங்கள்" },
    planVisit: { en: "Plan Your Visit", ta: "வருகையை திட்டமிடுங்கள்" },
  },
} as const

export function t<T extends { en: string; ta: string }>(value: T, lang: Language) {
  return value[lang]
}

