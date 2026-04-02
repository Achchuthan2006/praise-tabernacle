export type SermonHighlight = {
  title: string
  date: string
  language: "en" | "ta"
  youtubeVideoId: string
}

export type ScheduleItem = {
  time: string
  titleEn: string
  titleTa: string
}

function readPublicEnv(key: string) {
  const value = process.env[key]?.trim()
  return value ? value : ""
}

function normalizeSiteUrl(value: string) {
  if (!value) return "https://praisetabernacle.org"
  return value.replace(/\/+$/, "")
}

const siteUrl = normalizeSiteUrl(readPublicEnv("NEXT_PUBLIC_SITE_URL"))
const instagramUrl = readPublicEnv("NEXT_PUBLIC_INSTAGRAM_URL")
const givingProcessorName = readPublicEnv("NEXT_PUBLIC_GIVING_PROCESSOR_NAME")
const onlineGivingUrl = readPublicEnv("NEXT_PUBLIC_GIVING_ONLINE_URL")
const recurringGivingUrl = readPublicEnv("NEXT_PUBLIC_GIVING_RECURRING_URL")
const textToGiveNumber = readPublicEnv("NEXT_PUBLIC_GIVING_TEXT_NUMBER")
const textToGiveKeyword = readPublicEnv("NEXT_PUBLIC_GIVING_TEXT_KEYWORD") || "GIVE"
const calendarGoogleEmbedUrl = readPublicEnv("NEXT_PUBLIC_CALENDAR_GOOGLE_EMBED_URL")
const calendarGoogleWebUrl = readPublicEnv("NEXT_PUBLIC_CALENDAR_GOOGLE_WEB_URL")
const calendarGoogleIcalUrl = readPublicEnv("NEXT_PUBLIC_CALENDAR_GOOGLE_ICAL_URL")
const calendarRoomBookingsEmbedUrl = readPublicEnv("NEXT_PUBLIC_CALENDAR_ROOM_BOOKINGS_EMBED_URL")
const calendarRoomBookingsWebUrl = readPublicEnv("NEXT_PUBLIC_CALENDAR_ROOM_BOOKINGS_WEB_URL")
const calendarRoomBookingsIcalUrl = readPublicEnv("NEXT_PUBLIC_CALENDAR_ROOM_BOOKINGS_ICAL_URL")
const googleAnalyticsId =
  readPublicEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID") || readPublicEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID")

export const siteConfig = {
  nameEn: "Praise Tabernacle",
  nameTa: "துதியின் கூடாரம்",
  locationShort: "Mississauga, Ontario",
  siteUrl,
  googleAnalyticsId,
  youtubeChannelUrl: "https://www.youtube.com/@MCFWCchurch",
  spotifyUrl: "",
  facebookUrl: "https://www.facebook.com/profile.php?id=100077559605644",
  instagramUrl,
  // Primary playlist used for embeds (services/sermons).
  youtubeServicesPlaylistUrl: "https://www.youtube.com/playlist?list=PL0BKlPGuSFky6lwfEDbZUVR6vjPBFkwHi",
  youtubeServicesPlaylistId: "PL0BKlPGuSFky6lwfEDbZUVR6vjPBFkwHi",
  // YouTube "Uploads" playlist for @MCFWCchurch (starts with "UU")
  youtubeUploadsPlaylistId: "UUBlRAgQw6-8oME_OTWDuDkQ",
  topBar: {
    enabled: true,
    watchLatestHref: "/watch",
    watchLatestLabelEn: "Watch Live",
    watchLatestLabelTa: "நேரலையை பாருங்கள்",
    announcementEn: "",
    announcementTa: "",
    announcementHref: "/events",
  },
  launchDates: {
    biblePlans: {
      oneYear: "2026-03-01",
      ninetyDay: "2026-03-15",
      topicalPrayer: "2026-03-22",
    },
  },
  // Optional: add 2-3 hand-picked highlights from the official church channel.
  // Only include video IDs that belong to https://www.youtube.com/@MCFWCchurch
  sermonHighlights: [] as SermonHighlight[],
  email: "pastormano@praisetabernacle.org",
  phone: "+1 416 554-8448",
  // WhatsApp number should be in E.164 digits (no +, spaces, or dashes) for wa.me links.
  whatsapp: {
    phoneE164Digits: "14165548448",
    defaultMessageEn: "Hi Praise Tabernacle! I have a question.",
    defaultMessageTa: "வணக்கம் Praise Tabernacle! எனக்கு ஒரு கேள்வி உள்ளது.",
    firstTimeMessageEn:
      "Hi! I'm planning my first visit. Can someone help me with service times, parking, and what to expect?",
    firstTimeMessageTa:
      "வணக்கம்! நான் முதல் முறையாக வரத் திட்டமிடுகிறேன். ஆராதனை நேரம், பார்க்கிங், மற்றும் என்ன எதிர்பார்க்கலாம் என்பதில் உதவ முடியுமா?",
  },
  officeHours: {
    timeZone: "America/Toronto",
    // Monday-Friday: 10:00-18:00
    daysOfWeek: [1, 2, 3, 4, 5] as Array<0 | 1 | 2 | 3 | 4 | 5 | 6>,
    startLocal: "10:00",
    endLocal: "18:00",
  },
  addressLines: ["5155 Spectrum Way, Unit 7", "Mississauga, ON L4W 5A1"],
  branding: {
    // Keep the original Praise Tabernacle logo across the site.
    logoEnSrc: "/logo-en-old-nobg.png",
    logoTaSrc: "/logo-ta-old-nobg.png",
    // Reuse the same original artwork for metadata/social previews for now.
    logoEnBgSrc: "/logo-en-old-nobg.png",
    logoTaBgSrc: "/logo-ta-old-nobg.png",
  },
  hero: {
    // Replace with a real church photo in /public (ex: /photos/home/church-front.jpg).
    // Keep the overlay subtle so text remains readable.
    photoSrc: "/photos/home/church-front.webp",
    photoOpacity: 0.28,
    // Optional: a short, muted, looping MP4/WebM in /public (ex: /video/hero.mp4).
    // If set, video renders behind the overlay and above gradients.
    videoSrc: "",
    videoPosterSrc: "",
    videoOpacity: 0.22,
  },
  verseImageSrcs: ["/verse-1.webp", "/verse-2.webp", "/verse-3.webp", "/verse-4.webp"],
  visit: {
    // Optional: add a YouTube video ID for a virtual tour of the building.
    virtualTourVideoId: "",
    virtualTourImageSrc: "/photos/home/church-life.webp",
  },
  giving: {
    processorName: givingProcessorName,
    onlineGivingUrl,
    recurringGivingUrl,
    textToGiveNumber,
    textToGiveKeyword,
    qrCodes: [
      { labelEn: "General giving", labelTa: "பொது கொடை", src: "/qr-give.svg" },
      { labelEn: "Missions", labelTa: "மிஷன்", src: "/qr-give.svg" },
      { labelEn: "Building fund", labelTa: "கட்டிட நிதி", src: "/qr-give.svg" },
      { labelEn: "Special projects", labelTa: "சிறப்பு திட்டங்கள்", src: "/qr-give.svg" },
    ],
  },
  calendar: {
    // Optional Google Calendar integration (paste your public embed/subscribe links here).
    // Events calendar
    googleEmbedUrl: calendarGoogleEmbedUrl,
    googleWebUrl: calendarGoogleWebUrl,
    googleIcalUrl: calendarGoogleIcalUrl,
    // Room bookings calendar (availability)
    roomBookingsEmbedUrl: calendarRoomBookingsEmbedUrl,
    roomBookingsWebUrl: calendarRoomBookingsWebUrl,
    roomBookingsIcalUrl: calendarRoomBookingsIcalUrl,
  },
  welcomeMessageEn:
    "Thanks for visiting with us. Guests are always welcome. Whether you visit in person or via the Internet, we hope you will find something here to encourage you in your spiritual growth. Praise Tabernacle Church is a group of ordinary people who have encountered and are actively pursuing a far from ordinary Jesus.",
  welcomeMessageTa:
    "எங்களுடன் இணைந்ததற்கு நன்றி. விருந்தினர்கள் எப்போதும் வரவேற்கப்படுகிறார்கள். நீங்கள் நேரில் வந்தாலும் அல்லது இணையத்தின் மூலம் சேர்ந்தாலும், உங்கள் ஆவிக்குரிய வளர்ச்சிக்கு ஊக்கமளிக்கும் ஒன்றை இங்கே காண்பீர்கள் என்று நம்புகிறோம். Praise Tabernacle சபை என்பது சாதாரண மனிதர்கள் இயேசுவைச் சந்தித்து, அதிசயமான இயேசுவை தொடர்ந்து தேடிக்கொண்டிருக்கும் ஒரு குடும்பம்.",
  visionEn:
    "Praise Tabernacle Church is called to proclaim the Gospel of Christ and the beliefs of the evangelical Christian faith, to maintain the worship of God, and to inspire in all persons a love for Christ, a passion for righteousness, and a consciousness of their duties to God and their fellow human beings. We pledge our lives to Christ and covenant with each other to demonstrate His Spirit through worship, witnessing, and ministry to the needs of the people of this church and the community. We stands for the Gospel be preached, the lost be found, the believers be equipped, the poor be served, the lonely be enfold into the community.",
  visionTa:
    "கிறிஸ்துவின் சுவிசேஷத்தையும் சுவிசேஷ விசுவாசத்தின் உண்மைகளையும் அறிவிக்கவும், தேவனை ஆராதிக்கவும், அனைவரிலும் கிறிஸ்துவின் மீது அன்பையும் நீதியின் மீது ஆர்வத்தையும் வளர்க்கவும் Praise Tabernacle சபை அழைக்கப்பட்டுள்ளது. ஆராதனை, சாட்சி, மற்றும் ஊழியம் மூலம் சபையினருக்கும் சமூகத்தினருக்கும் தேவையுடையவர்களுக்கு சேவை செய்து, அவர்களை அன்புடன் அணைத்துக்கொள்ள கிறிஸ்துவுக்காக நம்மை அர்ப்பணிக்கிறோம். சுவிசேஷம் அறிவிக்கப்பட வேண்டும், இழந்தோர் கண்டுபிடிக்கப்பட வேண்டும், விசுவாசிகள் பலப்படுத்தப்பட வேண்டும், ஏழைகள் சேவிக்கப்பட வேண்டும், தனிமையில் இருப்போர் சமூகத்தில் இணைக்கப்பட வேண்டும் என்பதில் நாங்கள் நிலைத்திருக்கிறோம்.",
  taglineEn:
    "Our desire is to provide an atmosphere for personal growth and increasing love so that you and your family can build a strong foundation.",
  taglineTa:
    "நீங்களும் உங்கள் குடும்பமும் உறுதியான அடித்தளத்தை அமைத்துக்கொள்ள, தனிப்பட்ட வளர்ச்சிக்கும் வளர்ந்து வரும் அன்பிற்கும் ஏற்ற ஒரு சூழலை வழங்குவதே எங்கள் விருப்பம்.",
  identityEn: "We are a Tamil church located in Mississauga.",
  identityTa: "நாங்கள் மிசிசாகாவில் உள்ள ஒரு தமிழ் சபை.",
  detailedSchedule: {
    sundayServices: [
      {
        time: "8:00 AM",
        titleEn: "Preparation prayers",
        titleTa: "ஆயத்த ஜெபம்",
      },
      {
        time: "9:15 AM",
        titleEn: "1st service (English)",
        titleTa: "முதலாம் ஆராதனை - ஆங்கிலம்",
      },
      {
        time: "9:30 AM",
        titleEn: "Sunday School",
        titleTa: "ஞாயிற்றுக்கிழமை பாடசாலை",
      },
      {
        time: "10:30 AM",
        titleEn: "2nd service (Tamil with English translation)",
        titleTa: "இரண்டாம் ஆராதனை - தமிழ் (ஆங்கில மொழிபெயர்ப்புடன்)",
      },
      {
        time: "11:00 AM",
        titleEn: "Youth gathering",
        titleTa: "வாலிபர் கூடுகை",
      },
    ] satisfies ScheduleItem[],
    weeklyEvents: [
      {
        time: "Every Wednesday • 10:30 AM",
        titleEn: "Intercessory prayer",
        titleTa: "விண்ணப்ப ஜெபம்",
      },
      {
        time: "Every Thursday • 7:30 PM",
        titleEn: "Bible study (through livestream)",
        titleTa: "வேதப்பயிற்சி",
      },
    ] satisfies ScheduleItem[],
    monthlyEvents: [
      {
        time: "1st day of month • 5:00 AM",
        titleEn: "Communion service",
        titleTa: "திருவிருந்து ஆராதனை",
      },
      {
        time: "1st Saturday • 9:30 AM",
        titleEn: "Fasting prayer",
        titleTa: "உபவாச ஜெபம்",
      },
      {
        time: "2nd Saturday • 10:30 AM",
        titleEn: "Women's prayer",
        titleTa: "பெண்கள் ஜெபக்கூட்டம்",
      },
      {
        time: "3rd Friday • 10:00 PM",
        titleEn: "Night prayer",
        titleTa: "இரவு ஜெபம்",
      },
    ] satisfies ScheduleItem[],
  },
  // Summary used in hero/top-bar/footer.
  serviceTimes: [
    {
      id: "english-service",
      labelEn: "English Service",
      labelTa: "ஆங்கில ஆராதனை",
      time: "Sundays • 9:15 AM",
    },
    {
      id: "tamil-service",
      labelEn: "Tamil Service (English translation)",
      labelTa: "தமிழ் ஆராதனை (ஆங்கில மொழிபெயர்ப்பு)",
      time: "Sundays • 10:30 AM",
    },
  ],
} as const
