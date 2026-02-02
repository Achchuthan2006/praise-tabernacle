export type Sermon = {
  id: string
  title: string
  date: string // ISO date
  language: "en" | "ta"
  youtubeId: string
  summary?: string
}

export type EventItem = {
  id: string
  title: string
  date: string // ISO date
  time: string
  language: "en" | "ta"
  description?: string
}

// Placeholder YouTube video id (replace with your latest sermon)
const YT_PLACEHOLDER = "dQw4w9WgXcQ"

export const sermons: Sermon[] = [
  {
    id: "s1",
    title: "Hope That Holds (Part 1)",
    date: "2026-01-25",
    language: "en",
    youtubeId: YT_PLACEHOLDER,
    summary: "A gentle encouragement to hold onto Jesus through every season.",
  },
  {
    id: "s2",
    title: "நம்பிக்கை கைவிடாதீர்கள்",
    date: "2026-01-19",
    language: "ta",
    youtubeId: YT_PLACEHOLDER,
    summary: "இயேசுவில் நம்பிக்கையோடு நிலைத்திருக்க உதவும் ஒரு ஊக்கமளிக்கும் செய்தி.",
  },
  {
    id: "s3",
    title: "Living with Purpose",
    date: "2026-01-12",
    language: "en",
    youtubeId: YT_PLACEHOLDER,
    summary: "Simple steps to live with purpose, peace, and direction.",
  },
]

export const upcomingEvents: EventItem[] = [
  {
    id: "e1",
    title: "Community Prayer Night",
    date: "2026-02-08",
    time: "Sunday • 7:30 PM",
    language: "en",
    description: "A quiet evening of worship and prayer. Families and youth are welcome.",
  },
  {
    id: "e2",
    title: "உபவாச ஜெபம் (Fasting Prayer)",
    date: "2026-02-14",
    time: "Saturday • 10:00 AM",
    language: "ta",
    description: "குடும்பங்களுடன் இணைந்து ஜெபிக்க ஒரு சிறப்பு காலை.",
  },
  {
    id: "e3",
    title: "Newcomers Welcome",
    date: "2026-02-22",
    time: "After Service",
    language: "en",
    description: "Meet a friendly team, ask questions, and find your next step.",
  },
]

