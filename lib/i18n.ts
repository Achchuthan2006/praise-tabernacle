export type Language = "en" | "ta"

export const DEFAULT_LANGUAGE: Language = "en"
export const LANGUAGE_STORAGE_KEY = "pt_lang"

export function isLanguage(value: string): value is Language {
  return value === "en" || value === "ta"
}

export const ui = {
  nav: {
    home: { en: "Home", ta: "முகப்பு" },
    imNew: { en: "I'm New", ta: "நான் புதிது" },
    visit: { en: "Visit", ta: "வருகை" },
    about: { en: "About", ta: "எங்களைப் பற்றி" },
    pastor: { en: "Pastor", ta: "போதகர்" },
    sermons: { en: "Sermons", ta: "பிரசங்கங்கள்" },
    bibleStudies: { en: "Bible Studies", ta: "Bible Studies" },
    bible: { en: "Bible", ta: "வேதாகமம்" },
    promises: { en: "Promises", ta: "வாக்குத்தத்தங்கள்" },
    magazine: { en: "Magazine", ta: "இதழ்" },
    bookstore: { en: "Bookstore", ta: "புத்தகக் கடை" },
    communion: { en: "Communion", ta: "திருவிருந்து" },
    photos: { en: "Photos", ta: "புகைப்படங்கள்" },
    events: { en: "Events", ta: "நிகழ்வுகள்" },
    calendar: { en: "Calendar", ta: "நாட்காட்டி" },
    ministries: { en: "Ministries", ta: "சேவைகள்" },
    care: { en: "Request Care", ta: "அக்கறை" },
    prayer: { en: "Prayer", ta: "ஜெபம்" },
    groups: { en: "Small Groups", ta: "சிறு குழுக்கள்" },
    serve: { en: "Serve", ta: "சேவை" },
    membership: { en: "Membership", ta: "உறுப்பினர்" },
    missions: { en: "Missions", ta: "மிஷன்" },
    partnership: { en: "Partnership", ta: "கூட்டாண்மை" },
    bookings: { en: "Bookings", ta: "முன்பதிவு" },
    ministriesAll: { en: "All Ministries", ta: "அனைத்து சேவைகள்" },
    ministriesKids: { en: "Kids", ta: "குழந்தைகள்" },
    ministriesYouth: { en: "Youth", ta: "இளைஞர்கள்" },
    ministriesPrayerCare: { en: "Prayer & Care", ta: "ஜெபம் & அக்கறை" },
    ministriesOutreach: { en: "Outreach", ta: "சமூக சேவை" },
    ministriesMen: { en: "Men", ta: "ஆண்கள்" },
    ministriesWomen: { en: "Women", ta: "பெண்கள்" },
    ministriesMissions: { en: "Missions", ta: "மிஷன்" },
    ministriesMembership: { en: "Membership Class", ta: "உறுப்பினர் வகுப்பு" },
    give: { en: "Give", ta: "கொடுங்கள்" },
    blog: { en: "Blog", ta: "செய்திகள்" },
    devotionals: { en: "Devotionals", ta: "தியானங்கள்" },
    contact: { en: "Contact", ta: "தொடர்பு" },
  },
  navGroups: {
    ourChurch: { en: "Our Church", ta: "எங்கள் சபை" },
    getInvolved: { en: "Get Involved", ta: "ஈடுபடுங்கள்" },
  },
  cta: {
    watchOnline: {
      en: "Watch Online",
      ta: "ஆன்லைனில் பாருங்கள்",
    },
    planVisit: {
      en: "Plan Your Visit",
      ta: "வருகையை திட்டமிடுங்கள்",
    },
    requestPrayer: { en: "Request Prayer", ta: "ஜெப வேண்டுகோள்" },
    requestCare: { en: "Request Care", ta: "அக்கறை வேண்டுகோள்" },
    offerings: { en: "Offerings", ta: "கொடைகள்" },
  },
} as const

export function t<T extends { en: string; ta: string }>(value: T | null | undefined, lang: Language): string {
  if (!value) return ""
  return value[lang] ?? value.en ?? ""
}
