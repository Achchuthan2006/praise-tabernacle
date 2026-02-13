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

export const siteConfig = {
  nameEn: "Praise Tabernacle",
  nameTa: "துதியின் கூடாரம்",
  locationShort: "Mississauga, Ontario",
  siteUrl: "https://example.com",
  googleAnalyticsId: "",
  youtubeChannelUrl: "https://www.youtube.com/@MCFWCchurch",
  spotifyUrl: "",
  facebookUrl: "https://www.facebook.com/profile.php?id=100077559605644",
  instagramUrl: "https://www.instagram.com/mcfwc/",
  // Primary playlist used for embeds (services/sermons).
  youtubeServicesPlaylistUrl: "https://www.youtube.com/playlist?list=PL0BKlPGuSFky6lwfEDbZUVR6vjPBFkwHi",
  youtubeServicesPlaylistId: "PL0BKlPGuSFky6lwfEDbZUVR6vjPBFkwHi",
  // YouTube "Uploads" playlist for @MCFWCchurch (starts with "UU")
  youtubeUploadsPlaylistId: "UUBlRAgQw6-8oME_OTWDuDkQ",
  topBar: {
    enabled: true,
    watchLatestHref: "/watch",
    watchLatestLabelEn: "Watch Latest Service",
    watchLatestLabelTa: "சமீப ஆராதனையை பாருங்கள்",
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
      "வணக்கம்! நான் முதன்முறையாக வர திட்டமிட்டு இருக்கிறேன். ஆராதனை நேரம், பார்க்கிங், மற்றும் என்ன எதிர்பார்க்கலாம் என்பதில் உதவ முடியுமா?",
  },
  officeHours: {
    timeZone: "America/Toronto",
    // Monday–Friday: 10:00–18:00
    daysOfWeek: [1, 2, 3, 4, 5] as Array<0 | 1 | 2 | 3 | 4 | 5 | 6>,
    startLocal: "10:00",
    endLocal: "18:00",
  },
  addressLines: ["5155 Spectrum Way, Unit 7", "Mississauga, ON L4W 5A1"],
  branding: {
    // Old Praise Tabernacle logo assets (English/Tamil) without background.
    logoEnSrc: "/logo-en-old-nobg.png",
    logoTaSrc: "/logo-ta-old-nobg.png",
    // Use the same artwork for social cards until dedicated wide images are provided.
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
    onlineGivingUrl: "",
    recurringGivingUrl: "",
    textToGiveNumber: "",
    textToGiveKeyword: "GIVE",
    qrCodes: [
      { labelEn: "General giving", labelTa: "பொது கொடை", src: "/qr-give.svg" },
      { labelEn: "Missions", labelTa: "மிஷன்", src: "/qr-give.svg" },
      { labelEn: "Building fund", labelTa: "கட்டிடம் நிதி", src: "/qr-give.svg" },
      { labelEn: "Special projects", labelTa: "சிறப்பு திட்டங்கள்", src: "/qr-give.svg" },
    ],
  },
  calendar: {
    // Optional Google Calendar integration (paste your public embed/subscribe links here).
    // Events calendar
    googleEmbedUrl: "",
    googleWebUrl: "",
    googleIcalUrl: "",
    // Room bookings calendar (availability)
    roomBookingsEmbedUrl: "",
    roomBookingsWebUrl: "",
    roomBookingsIcalUrl: "",
  },
  welcomeMessageEn:
    "Thanks for visiting with us. Guests are always welcome. Whether you visit in person or via the Internet, we hope you will find something here to encourage you in your spiritual growth. Praise Tabernacle Church is a group of ordinary people who have encountered and are actively pursuing a far from ordinary Jesus.",
  welcomeMessageTa:
    "எங்களைப் பார்வையிட்டதற்கு நன்றி. விருந்தினர்கள் எப்போதும் வரவேற்கப்படுகிறார்கள். நீங்கள் நேரில் வந்தாலும் அல்லது இணையத்தின் மூலம் சேர்ந்தாலும், உங்கள் ஆவிக்குரிய வளர்ச்சிக்கு ஊக்கம் தரும் ஒன்றை இங்கே காண்பீர்கள் என்று நம்புகிறோம். Praise Tabernacle சபை என்பது சாதாரணமான மக்கள் இயேசுவை சந்தித்து, அதிசயமான இயேசுவை தொடர்ந்து தேடுகிற ஒரு குடும்பம்.",
  visionEn:
    "Praise Tabernacle Church is called to proclaim the Gospel of Christ and the beliefs of the evangelical Christian faith, to maintain the worship of God, and to inspire in all persons a love for Christ, a passion for righteousness, and a consciousness of their duties to God and their fellow human beings. We pledge our lives to Christ and covenant with each other to demonstrate His Spirit through worship, witnessing, and ministry to the needs of the people of this church and the community. We stands for the Gospel be preached, the lost be found, the believers be equipped, the poor be served, the lonely be enfold into the community.",
  visionTa:
    "கிறிஸ்துவின் சுவிசேஷத்தை அறிவிக்கவும், சுவிசேஷ விசுவாசத்தின் உண்மைகளைக் கடைபிடிக்கவும், தேவனை ஆராதிக்கவும், அனைவரிலும் கிறிஸ்துவின் மீது அன்பையும் நீதியின்மேல் ஆர்வத்தையும் வளர்க்கவும் Praise Tabernacle சபை அழைக்கப்பட்டுள்ளது. ஆராதனை, சாட்சியம், மற்றும் ஊழியத்தின் மூலம் சபையினரும் சமூகத்தினரும் தேவையடைந்தவர்களுக்கு சேவை செய்து, அவர்களை பரிவுடன் அணைத்துக்கொள்ள கிறிஸ்துவுக்கு நம்மை அர்ப்பணிக்கிறோம். சுவிசேஷம் பிரசங்கிக்கப்பட வேண்டும், இழந்தோர் கண்டுபிடிக்கப்பட வேண்டும், விசுவாசிகள் சீராக்கப்பட வேண்டும், ஏழைகள் சேவிக்கப்பட வேண்டும், தனிமைப்பட்டோர் சமூகத்தில் சேர்க்கப்பட வேண்டும் என்பதில் நாங்கள் நிலைத்திருக்கிறோம்.",
  taglineEn:
    "Our desire is to provide an atmosphere for personal growth and increasing love so that you and your family can build a strong foundation.",
  taglineTa:
    "நீங்களும் உங்கள் குடும்பமும் உறுதியான அடித்தளத்தை கட்டியெழுப்புவதற்கு, தனிப்பட்ட வளர்ச்சிக்கும் வளர்ந்து வரும் அன்புக்கும் ஒரு சூழலை வழங்குவதே எங்கள் ஆசை.",
  identityEn: "We are a Tamil church located in Mississauga.",
  identityTa: "நாங்கள் மிசிசாகாவில் உள்ள ஒரு தமிழ் சபை.",
  detailedSchedule: {
    sundayServices: [
      {
        time: "8:00 AM",
        titleEn: "Preparation prayers",
        titleTa: "\u0b86\u0baf\u0ba4\u0bcd\u0ba4 \u0b9c\u0bc6\u0baa\u0bae\u0bcd",
      },
      {
        time: "9:15 AM",
        titleEn: "1st service (English)",
        titleTa:
          "\u0bae\u0bc1\u0ba4\u0bb2\u0bbe\u0bb5\u0ba4\u0bc1 \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 \u2013 \u0b86\u0b99\u0bcd\u0b95\u0bbf\u0bb2 \u0bae\u0bca\u0bb4\u0bbf",
      },
      {
        time: "9:30 AM",
        titleEn: "Sunday School",
        titleTa: "\u0b93\u0baf\u0bcd\u0bb5\u0bc1\u0ba8\u0bbe\u0bb3\u0bcd \u0baa\u0bbe\u0b9f\u0b9a\u0bbe\u0bb2\u0bc8",
      },
      {
        time: "10:30 AM",
        titleEn: "2nd service (Tamil with English translation)",
        titleTa:
          "\u0b87\u0bb0\u0ba3\u0bcd\u0b9f\u0bbe\u0bb5\u0ba4\u0bc1 \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 \u2013 \u0ba4\u0bae\u0bbf\u0bb4\u0bcd, \u0b86\u0b99\u0bcd\u0b95\u0bbf\u0bb2 \u0bae\u0bca\u0bb4\u0bbf\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bc1",
      },
      {
        time: "11:00 AM",
        titleEn: "Youth gathering",
        titleTa: "\u0bb5\u0bbe\u0bb2\u0bbf\u0baa \u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd",
      },
    ] satisfies ScheduleItem[],
    weeklyEvents: [
      {
        time: "Every Wednesday \u2022 10:30 AM",
        titleEn: "Intercessory prayer",
        titleTa: "\u0bb5\u0bbf\u0ba3\u0bcd\u0ba3\u0baa\u0bcd\u0baa \u0b9c\u0bc6\u0baa\u0bae\u0bcd",
      },
      {
        time: "Every Thursday \u2022 7:30 PM",
        titleEn: "Bible study (through livestream)",
        titleTa: "\u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1",
      },
    ] satisfies ScheduleItem[],
    monthlyEvents: [
      {
        time: "1st day of month \u2022 5:00 AM",
        titleEn: "Communion service",
        titleTa: "\u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbf\u0bb0\u0bc1\u0ba8\u0bcd\u0ba4\u0bc1 \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8",
      },
      {
        time: "1st Saturday \u2022 9:30 AM",
        titleEn: "Fasting prayer",
        titleTa: "\u0b89\u0baa\u0bb5\u0bbe\u0b9a \u0b9c\u0bc6\u0baa\u0bae\u0bcd",
      },
      {
        time: "2nd Saturday \u2022 10:30 AM",
        titleEn: "Women's prayer",
        titleTa: "\u0baa\u0bc6\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0b9c\u0bc6\u0baa\u0b95\u0bcd\u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd",
      },
      {
        time: "3rd Friday \u2022 10:00 PM",
        titleEn: "Night prayer",
        titleTa: "\u0b87\u0bb0\u0bb5\u0bc1 \u0b9c\u0bc6\u0baa\u0bae\u0bcd",
      },
    ] satisfies ScheduleItem[],
  },
  // Summary used in hero/top-bar/footer.
  serviceTimes: [
    {
      id: "english-service",
      labelEn: "English Service",
      labelTa: "\u0b86\u0b99\u0bcd\u0b95\u0bbf\u0bb2 \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8",
      time: "Sundays \u2022 9:15 AM",
    },
    {
      id: "tamil-service",
      labelEn: "Tamil Service (English translation)",
      labelTa:
        "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 (\u0b86\u0b99\u0bcd\u0b95\u0bbf\u0bb2 \u0bae\u0bca\u0bb4\u0bbf\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bc1)",
      time: "Sundays \u2022 10:30 AM",
    },
  ],
} as const
