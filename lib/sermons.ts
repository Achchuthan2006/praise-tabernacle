export type SermonPlatformLinks = {
  spotifyEpisodeUrl?: string
  applePodcastsUrl?: string
  youtubeMusicUrl?: string
  youtubeUrl?: string
  mp3Url?: string
  mp4Url?: string
}

export type SermonSeries = {
  id: string
  title: string
  coverImageSrc?: string
  summary?: string
}

export type Sermon = {
  slug: string
  dateIso: string // YYYY-MM-DD
  title: string
  speaker?: string
  language: "en" | "ta" | "mixed"
  seriesId?: string
  topics?: string[]
  scriptures?: string[]
  youtubeVideoId?: string
  durationMinutes?: number
  thumbnailImageSrc?: string
  notesPdfHref?: string
  discussionGuidePdfHref?: string
  shareQuote?: string
  transcriptText?: string
  transcriptHref?: string
  discussionQuestions?: string[]
  platforms?: SermonPlatformLinks
}

export const sermonSeries: SermonSeries[] = [
  {
    id: "welcome",
    title: "Welcome Home",
    coverImageSrc: "/sermons/series-welcome.svg",
    summary: "A short series introducing our church, our hope in Christ, and your next steps.",
  },
  {
    id: "living-hope",
    title: "Living Hope",
    coverImageSrc: "/sermons/series-living-hope.svg",
    summary: "Encouragement for everyday life through the promises of Jesus.",
  },
  {
    id: "prayer",
    title: "Teach Us to Pray",
    coverImageSrc: "/sermons/series-prayer.svg",
    summary: "Learning to pray with faith, consistency, and joy.",
  },
]

// Seed data (replace with your real sermon archive over time).
// Tip: use YouTube video IDs, and add optional notes/audio/transcripts when available.
export const sermons: Sermon[] = [
  {
    slug: "1st-service-2026-02-08",
    dateIso: "2026-02-08",
    title: "1st Service - Feb 08 2026",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "NmlKPSfoVJ8",
    topics: ["Worship", "Sunday Service", "Livestream"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "2nd-service-2026-02-08",
    dateIso: "2026-02-08",
    title: "2nd Service - Feb 08 2026",
    speaker: "Praise Tabernacle",
    language: "ta",
    youtubeVideoId: "3I9PdKNHmpQ",
    topics: ["Worship", "Sunday Service", "Livestream"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "sunday-1st-service-2026-02-01",
    dateIso: "2026-02-01",
    title: "Sunday 1st Service",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "tDMu24cRlJI",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "healing-and-deliverance-prayer-2026-01-30",
    dateIso: "2026-01-30",
    title: "Healing & Deliverance Prayer",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "Isn8S73j8V4",
    topics: ["Prayer", "Healing", "Deliverance"],
    discussionQuestions: [
      "What encouraged your faith from this prayer meeting?",
      "What is one area where you need God's healing or freedom?",
      "Who can you ask to pray with you this week?",
    ],
  },
  {
    slug: "new-years-eve-service-2026-2025-12-31",
    dateIso: "2025-12-31",
    title: "New Year’s Eve Service (2026)",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "I1LNXnKwSF8",
    topics: ["Worship", "Prayer", "New Year"],
    discussionQuestions: [
      "What is one thing you’re thankful for from this past year?",
      "What are you asking God to do in your life in the year ahead?",
      "What is one step of faith you can take this week?",
    ],
  },
  {
    slug: "fasting-prayer-2025-12-30",
    dateIso: "2025-12-30",
    title: "Fasting Prayer - Dec 30 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "UBzdbD0-gQ4",
    topics: ["Prayer", "Fasting"],
    discussionQuestions: [
      "What encouraged your faith from this prayer time?",
      "What are you fasting and praying for right now?",
      "How can we pray for you this week?",
    ],
  },
  {
    slug: "fasting-prayer-2025-12-29",
    dateIso: "2025-12-29",
    title: "Fasting Prayer - Dec 29 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "Y0smUXLeP5o",
    topics: ["Prayer", "Fasting"],
    discussionQuestions: [
      "What encouraged your faith from this prayer time?",
      "What are you fasting and praying for right now?",
      "How can we pray for you this week?",
    ],
  },
  {
    slug: "combine-service-2025-12-28",
    dateIso: "2025-12-28",
    title: "Combine Service - Dec 28 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "mAeZ_GmZQhk",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "christmas-eve-service-2025-12-24",
    dateIso: "2025-12-24",
    title: "Christmas Eve Service (2025)",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "2Jqk3vAk2RQ",
    topics: ["Worship", "Christmas"],
    discussionQuestions: [
      "What part of the Christmas story encouraged you most?",
      "What does Jesus' birth mean for your life today?",
      "Who can you invite or encourage this week with hope?",
    ],
  },
  {
    slug: "sunday-school-program-2025-12-24",
    dateIso: "2025-12-24",
    title: "Sunday School Program - Dec 24 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "rH7N1Fkzv1E",
    topics: ["Sunday School", "Program"],
    discussionQuestions: [
      "What moment encouraged you most?",
      "What did you learn from the children's presentation?",
      "How can we pray for our children and families this week?",
    ],
  },
  {
    slug: "friday-deliverance-and-healing-service-2025-12-19",
    dateIso: "2025-12-19",
    title: "Friday Deliverance and Healing Service - Dec 19 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "ueg4pkVjeKI",
    topics: ["Prayer", "Healing", "Deliverance"],
    discussionQuestions: [
      "What encouraged your faith from this service?",
      "What is one area where you need God's healing or freedom?",
      "Who can you ask to pray with you this week?",
    ],
  },
  {
    slug: "friday-deliverance-and-healing-service-2025-12-05",
    dateIso: "2025-12-05",
    title: "Friday Deliverance and Healing Service - Dec 05 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "PIaQPeyac8w",
    topics: ["Prayer", "Healing", "Deliverance"],
    discussionQuestions: [
      "What encouraged your faith from this service?",
      "What is one area where you need God's healing or freedom?",
      "Who can you ask to pray with you this week?",
    ],
  },
  {
    slug: "welcome-home-2026-01-26",
    dateIso: "2026-01-26",
    title: "Welcome Home",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "welcome",
    topics: ["Welcome", "Community"],
    scriptures: ["Matthew 11:28–30"],
    discussionQuestions: [
      "What stood out to you from this message?",
      "What is one next step you can take this week to grow in Christ?",
      "How can our church community pray for you?",
    ],
  },
  {
    slug: "next-steps-growing-together-2026-02-02",
    dateIso: "2026-02-02",
    title: "Next Steps: Growing Together",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "welcome",
    topics: ["Discipleship", "Community"],
    scriptures: ["Acts 2:42-47"],
    discussionQuestions: [
      "What is one small step you can take this week to grow closer to Christ?",
      "Where do you feel most connected: worship, groups, serving, or prayer?",
      "How can we support you as you take your next step?",
    ],
  },
  {
    slug: "living-hope-when-life-is-heavy-2026-01-19",
    dateIso: "2026-01-19",
    title: "Living Hope When Life Is Heavy",
    speaker: "Praise Tabernacle",
    language: "en",
    seriesId: "living-hope",
    topics: ["Hope", "Faith"],
    scriptures: ["1 Peter 1:3-5"],
    discussionQuestions: [
      "What does \"living hope\" mean to you right now?",
      "Where do you need God's strength this week?",
      "What is one promise of God you want to hold onto?",
    ],
  },
  {
    slug: "1st-service-2026-01-18",
    dateIso: "2026-01-18",
    title: "1st Service - Jan 18 2026",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "jzs8SEHeM88",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "friday-deliverance-and-healing-service-2026-01-16",
    dateIso: "2026-01-16",
    title: "Friday Deliverance and Healing Service - 16th Jan 2026",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "0o0O5yo4XCg",
    topics: ["Prayer", "Healing", "Deliverance"],
    discussionQuestions: [
      "What encouraged your faith from this service?",
      "What is one area where you need God's healing or freedom?",
      "Who can you ask to pray with you this week?",
    ],
  },
  {
    slug: "friday-deliverance-and-healing-service-2026-01-09",
    dateIso: "2026-01-09",
    title: "Friday Deliverance and Healing Service - Jan 09 2026",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "ioNHxZdem8I",
    topics: ["Prayer", "Healing", "Deliverance"],
    discussionQuestions: [
      "What encouraged your faith from this service?",
      "What is one area where you need God's healing or freedom?",
      "Who can you ask to pray with you this week?",
    ],
  },
  {
    slug: "friday-deliverance-and-healing-service-2026-01-02",
    dateIso: "2026-01-02",
    title: "Friday Deliverance and Healing Service - Jan 02 2026",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "VxHrf8Ib2Pw",
    topics: ["Prayer", "Healing", "Deliverance"],
    discussionQuestions: [
      "What encouraged your faith from this service?",
      "What is one area where you need God's healing or freedom?",
      "Who can you ask to pray with you this week?",
    ],
  },
  {
    slug: "living-hope-in-uncertain-times-2026-01-12",
    dateIso: "2026-01-12",
    title: "Living Hope in Uncertain Times",
    speaker: "Praise Tabernacle",
    language: "ta",
    seriesId: "living-hope",
    topics: ["Hope", "Trust"],
    scriptures: ["Psalm 46:1-3"],
    discussionQuestions: [
      "What uncertainties are you facing, and how can you bring them to God?",
      "How does worship help you refocus your heart on Christ?",
      "Who can you encourage with hope this week?",
    ],
  },
  {
    slug: "teach-us-to-pray-start-here-2026-01-05",
    dateIso: "2026-01-05",
    title: "Teach Us to Pray: Start Here",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "prayer",
    topics: ["Prayer"],
    scriptures: ["Luke 11:1-4"],
    discussionQuestions: [
      "What makes prayer feel difficult or intimidating?",
      "How can you build a simple, daily rhythm of prayer?",
      "What is one specific request you're trusting God with this week?",
    ],
  },
  {
    slug: "sunday-1st-service-2026-01-04",
    dateIso: "2026-01-04",
    title: "Sunday 1st Service - Jan 04 2026",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "19Aa_JeN_hs",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "teach-us-to-pray-persistence-2025-12-29",
    dateIso: "2025-12-29",
    title: "Teach Us to Pray: Persistence",
    speaker: "Praise Tabernacle",
    language: "en",
    seriesId: "prayer",
    topics: ["Prayer", "Faith"],
    scriptures: ["Luke 18:1-8"],
    discussionQuestions: [
      "Where do you feel tempted to give up?",
      "What does persistent prayer look like in your life?",
      "How can our church community pray with you?",
    ],
  },
  {
    slug: "teach-us-to-pray-god-knows-2025-12-22",
    dateIso: "2025-12-22",
    title: "Teach Us to Pray: God Knows What You Need",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "prayer",
    topics: ["Prayer", "Trust"],
    scriptures: ["Matthew 6:5-13"],
    discussionQuestions: [
      "What keeps you from praying honestly?",
      "How does knowing God already sees your needs change how you pray?",
      "What is one simple prayer you can pray every day this week?",
    ],
  },
  {
    slug: "teach-us-to-pray-forgiveness-2025-12-15",
    dateIso: "2025-12-15",
    title: "Teach Us to Pray: Forgiveness & Freedom",
    speaker: "Praise Tabernacle",
    language: "en",
    seriesId: "prayer",
    topics: ["Prayer", "Forgiveness"],
    scriptures: ["Matthew 6:12-15"],
    discussionQuestions: [
      "Is there someone you need to forgive or ask forgiveness from?",
      "How does forgiveness protect your heart in prayer?",
      "What is one step toward peace you can take this week?",
    ],
  },
  {
    slug: "living-hope-jesus-is-near-2025-12-08",
    dateIso: "2025-12-08",
    title: "Living Hope: Jesus Is Near",
    speaker: "Praise Tabernacle",
    language: "ta",
    seriesId: "living-hope",
    topics: ["Hope", "Peace"],
    scriptures: ["Philippians 4:4-7"],
    discussionQuestions: [
      "What worry do you need to bring to God in prayer?",
      "How does worship help your mind and heart find peace?",
      "Who can you encourage with hope this week?",
    ],
  },
  {
    slug: "living-hope-god-is-faithful-2025-11-30",
    dateIso: "2025-11-30",
    title: "Living Hope: God Is Faithful",
    speaker: "Praise Tabernacle",
    language: "en",
    seriesId: "living-hope",
    topics: ["Hope", "Faithfulness"],
    scriptures: ["Lamentations 3:22-23"],
    discussionQuestions: [
      "Where have you seen God's faithfulness in your life?",
      "What promise of God do you need to hold onto right now?",
      "How can we pray for you this week?",
    ],
  },
  {
    slug: "2nd-service-2025-11-30",
    dateIso: "2025-11-30",
    title: "2nd Service - Nov 30 2025",
    speaker: "Praise Tabernacle",
    language: "ta",
    youtubeVideoId: "XCSp-Dx4a6w",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "1st-service-2025-11-30",
    dateIso: "2025-11-30",
    title: "1st Service - Nov 30 2025",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "eyTO_7JYdAE",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "standalone-thanksgiving-gratitude-2025-11-23",
    dateIso: "2025-11-23",
    title: "Thanksgiving: A Life of Gratitude",
    speaker: "Praise Tabernacle",
    language: "mixed",
    topics: ["Gratitude", "Worship"],
    scriptures: ["1 Thessalonians 5:16-18"],
    discussionQuestions: [
      "What is one thing you're thankful for today?",
      "How can gratitude change the tone of your week?",
      "Who can you thank or encourage this week?",
    ],
  },
  {
    slug: "living-hope-jesus-our-peace-2025-11-16",
    dateIso: "2025-11-16",
    title: "Living Hope: Jesus Our Peace",
    speaker: "Praise Tabernacle",
    language: "en",
    seriesId: "living-hope",
    durationMinutes: 58,
    topics: ["Peace", "Hope"],
    scriptures: ["John 14:27"],
    discussionQuestions: [
      "Where do you need God's peace right now?",
      "What does Jesus promise us in John 14:27?",
      "How can you practice peace this week?",
    ],
  },
  {
    slug: "living-hope-strength-in-weakness-2025-11-09",
    dateIso: "2025-11-09",
    title: "Living Hope: Strength in Weakness",
    speaker: "Praise Tabernacle",
    language: "ta",
    seriesId: "living-hope",
    durationMinutes: 61,
    topics: ["Strength", "Grace"],
    scriptures: ["2 Corinthians 12:9"],
    discussionQuestions: [
      "Where do you feel weak right now?",
      "How does God's grace meet you in weakness?",
      "Who can you encourage this week?",
    ],
  },
  {
    slug: "1st-service-2025-11-09",
    dateIso: "2025-11-09",
    title: "1st Service - Nov 09 2025",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "csOLRQ4mB4Y",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "2nd-service-2025-11-09",
    dateIso: "2025-11-09",
    title: "2nd Service - Nov 09 2025",
    speaker: "Praise Tabernacle",
    language: "ta",
    youtubeVideoId: "2cFgq5XD0iI",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "friday-worship-2025-11-07",
    dateIso: "2025-11-07",
    title: "Friday Worship - Nov 07 2025",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "TuthzGlwtHA",
    topics: ["Worship", "Prayer"],
    discussionQuestions: [
      "What stood out to you from this worship service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "teach-us-to-pray-thanksgiving-2025-11-02",
    dateIso: "2025-11-02",
    title: "Teach Us to Pray: Thanksgiving",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "prayer",
    durationMinutes: 54,
    topics: ["Prayer", "Gratitude"],
    scriptures: ["Philippians 4:6-7"],
    discussionQuestions: [
      "What can you thank God for today?",
      "What requests do you want to bring to God with thanksgiving?",
      "How can gratitude reshape your prayers this week?",
    ],
  },
  {
    slug: "sunday-1st-service-2025-11-02",
    dateIso: "2025-11-02",
    title: "Sunday 1st Service - Nov 02 2025",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "-XGd8Ikixw0",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "sunday-2nd-service-2025-11-02",
    dateIso: "2025-11-02",
    title: "Sunday 2nd Service - Nov 02 2025",
    speaker: "Praise Tabernacle",
    language: "ta",
    youtubeVideoId: "iAks3A779uk",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "promise-for-the-month-of-november-2025-communion-service-2025-11-01",
    dateIso: "2025-11-01",
    title: "Promise for the Month of November 2025 - Communion Service",
    speaker: "Praise Tabernacle",
    language: "mixed",
    youtubeVideoId: "jVQiZbMsxio",
    topics: ["Promise of the Month", "Communion", "Worship"],
    discussionQuestions: [
      "What promise from Scripture encouraged you most?",
      "How did Communion strengthen your faith today?",
      "How can we pray for you this week?",
    ],
  },
  {
    slug: "vision-sunday-one-church-many-stories-2025-10-26",
    dateIso: "2025-10-26",
    title: "Vision Sunday: One Church, Many Stories",
    speaker: "Praise Tabernacle",
    language: "mixed",
    durationMinutes: 64,
    topics: ["Vision", "Mission", "Community"],
    scriptures: ["Ephesians 4:1-6"],
    discussionQuestions: [
      "What is one way you can help build unity in our church?",
      "Where do you feel God inviting you to serve or connect?",
      "Who can you invite to church this month?",
    ],
  },
  {
    slug: "faith-at-home-2025-10-19",
    dateIso: "2025-10-19",
    title: "Faith at Home",
    speaker: "Praise Tabernacle",
    language: "en",
    durationMinutes: 57,
    topics: ["Family", "Discipleship"],
    scriptures: ["Deuteronomy 6:4-9"],
    discussionQuestions: [
      "What is one simple faith habit you can start at home?",
      "How can you pray together as a family (or with friends) this week?",
      "What Scripture can you memorize or read together?",
    ],
  },
  {
    slug: "welcome-home-finding-your-place-2025-10-12",
    dateIso: "2025-10-12",
    title: "Welcome Home: Finding Your Place",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "welcome",
    durationMinutes: 52,
    topics: ["Welcome", "Belonging"],
    scriptures: ["Romans 12:4-5"],
    discussionQuestions: [
      "Where do you feel most connected in church life?",
      "What is one next step you can take to belong and grow?",
      "How can you welcome someone new this week?",
    ],
  },
  {
    slug: "teach-us-to-pray-worship-as-prayer-2025-10-05",
    dateIso: "2025-10-05",
    title: "Teach Us to Pray: Worship as Prayer",
    speaker: "Praise Tabernacle",
    language: "en",
    seriesId: "prayer",
    durationMinutes: 55,
    topics: ["Prayer", "Worship"],
    scriptures: ["Psalm 95:1-7"],
    discussionQuestions: [
      "How does worship shape the way you pray?",
      "What is one truth about God you can praise Him for today?",
      "What would it look like to worship daily this week?",
    ],
  },
  {
    slug: "living-hope-god-is-with-us-2025-09-28",
    dateIso: "2025-09-28",
    title: "Living Hope: God Is With Us",
    speaker: "Praise Tabernacle",
    language: "mixed",
    seriesId: "living-hope",
    durationMinutes: 59,
    topics: ["Presence", "Hope"],
    scriptures: ["Isaiah 41:10"],
    discussionQuestions: [
      "What fear do you need to bring to God today?",
      "How does God's presence give you courage?",
      "How can you encourage someone with hope this week?",
    ],
  },
  {
    slug: "sunday-service-2025-09-21",
    dateIso: "2025-09-21",
    title: "Sunday Service",
    speaker: "Praise Tabernacle",
    language: "en",
    durationMinutes: 73,
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from today's service?",
      "What is one truth you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "prayer-night-2025-09-14",
    dateIso: "2025-09-14",
    title: "Prayer Night",
    speaker: "Praise Tabernacle",
    language: "mixed",
    durationMinutes: 66,
    topics: ["Prayer", "Worship"],
    discussionQuestions: [
      "What is one prayer you are trusting God with right now?",
      "How can we support you in prayer this week?",
      "Who can you pray with this week?",
    ],
  },
  {
    slug: "1st-service-2025-01-11",
    dateIso: "2025-01-11",
    title: "1st Service - Jan 11 2025",
    speaker: "Praise Tabernacle",
    language: "en",
    youtubeVideoId: "Xr8usWFYsgs",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
  {
    slug: "2nd-service-2025-01-11",
    dateIso: "2025-01-11",
    title: "2nd Service - Jan 11 2025",
    speaker: "Praise Tabernacle",
    language: "ta",
    youtubeVideoId: "2F2n4SnmwKc",
    topics: ["Worship", "Sunday Service"],
    discussionQuestions: [
      "What stood out to you from this service?",
      "What is one truth from Scripture you want to remember this week?",
      "How can we pray for you?",
    ],
  },
]

export function getSermonBySlug(slug: string) {
  return sermons.find((s) => s.slug === slug) ?? null
}

export function getAllSermonSlugs() {
  return sermons.map((s) => s.slug)
}

export function getSeriesById(id: string | undefined) {
  if (!id) return null
  return sermonSeries.find((s) => s.id === id) ?? null
}

export function getCurrentSeries() {
  const withSeries = sermons
    .filter((s) => s.seriesId)
    .slice()
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  if (withSeries.length === 0) return null
  return getSeriesById(withSeries[0].seriesId)
}

export function getSermonsBySeries(seriesId: string) {
  return sermons
    .filter((s) => s.seriesId === seriesId)
    .slice()
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
}
