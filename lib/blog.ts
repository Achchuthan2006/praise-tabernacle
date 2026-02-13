export type BlogCategory =
  | "announcements"
  | "devotionals"
  | "testimonies"
  | "events"
  | "teachings"
  | "community-news"

export type BlogLanguage = "en" | "ta"

export type BlogAttachment = {
  label: string
  href: string
  kind: "pdf" | "link"
}

export type BlogPost = {
  slug: string
  language?: BlogLanguage
  title: string
  excerpt: string
  dateIso: string // YYYY-MM-DD
  category: BlogCategory
  readTimeMinutes: number
  authorName?: string
  coverImageSrc?: string
  tags?: string[]
  content: string[] // paragraph blocks
  galleryImageSrcs?: string[]
  attachments?: BlogAttachment[]
}

export const blogCategoryLabels: Record<BlogCategory, string> = {
  announcements: "Announcements",
  devotionals: "Devotionals",
  testimonies: "Testimonies",
  events: "Events",
  teachings: "Teachings",
  "community-news": "Community News",
}

// Seed posts (replace with real content / CMS later).
export const blogPosts: BlogPost[] = [
  {
    slug: "pastor-update-february-2026",
    title: "Monthly Update from Pastor Mano — February 2026",
    excerpt:
      "A short word of encouragement, prayer focus for the month, and ways to stay connected as a church family.",
    dateIso: "2026-02-01",
    category: "announcements",
    readTimeMinutes: 4,
    authorName: "Pastor Mano",
    tags: ["Monthly Update", "Prayer"],
    content: [
      "Thanks for visiting with us. Guests are always welcome — in person or online. We pray this month will strengthen your faith and encourage your family.",
      "Our prayer focus this month is unity, spiritual growth, and a renewed love for Christ. Please join our prayer times and invite someone who needs hope.",
      "If you’re new, we’d love to meet you. Plan your visit, send a message, or request prayer — we’re here for you.",
    ],
  },
  {
    slug: "weekly-devotional-rest-in-christ",
    title: "Weekly Devotional: Rest in Christ",
    excerpt:
      "A short devotional to help you slow down, pray, and remember the gentle invitation of Jesus.",
    dateIso: "2026-01-28",
    category: "devotionals",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle",
    tags: ["Devotional", "Prayer"],
    content: [
      "Life can feel heavy — responsibilities, anxiety, and uncertainty can pile up quickly.",
      "Jesus invites us to come to Him and find rest. Rest is not the absence of work; it’s the presence of Christ with us.",
      "This week, take five minutes each day: read a short passage, pray honestly, and ask God for His peace to guard your heart.",
    ],
  },
  {
    slug: "welcome-to-praise-tabernacle",
    title: "Welcome to Praise Tabernacle",
    excerpt:
      "A short hello from our church family, what to expect on your first Sunday, and how to get connected.",
    dateIso: "2026-01-26",
    category: "community-news",
    readTimeMinutes: 3,
    authorName: "Praise Tabernacle",
    tags: ["Welcome", "Next Steps"],
    content: [
      "We’re glad you’re here. Whether you’re exploring faith or returning to church, there’s a place for you and your family at Praise Tabernacle.",
      "Expect a warm welcome, worship, and clear teaching. Come as you are — there’s no pressure and no dress code.",
      "If you’d like help with your first visit, reach out anytime. We’d love to meet you.",
    ],
  },
  {
    slug: "teaching-why-we-gather",
    title: "Teaching: Why We Gather — Worship, Word, and Community",
    excerpt:
      "A simple explanation of why Sunday worship matters and how it shapes our faith and relationships.",
    dateIso: "2026-01-12",
    category: "teachings",
    readTimeMinutes: 6,
    authorName: "Praise Tabernacle",
    tags: ["Worship", "Church"],
    content: [
      "We gather because God is worthy of worship — and because we need one another.",
      "God’s Word shapes us, corrects us, and gives us hope. When we hear Scripture taught, our faith becomes steady and strong.",
      "Community matters: we carry burdens together, pray together, and grow together. Church is not a performance — it’s a family.",
    ],
  },
  {
    slug: "event-recap-community-prayer-night",
    title: "Event Recap: Community Prayer Night",
    excerpt:
      "A recap of our recent prayer night — worship, Scripture, and a powerful time of intercession together.",
    dateIso: "2026-02-03",
    category: "events",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Prayer", "Events"],
    galleryImageSrcs: ["/event-placeholder.svg"],
    content: [
      "Thank you to everyone who joined our community prayer night. It was a calm, focused evening of worship and intercession.",
      "We prayed for families, young people, healing, and growth in our church. God is faithful — and we believe He is answering prayer.",
      "If you couldn’t attend, you’re welcome at the next one. Bring a friend and come expectant.",
    ],
  },
  {
    slug: "testimony-gods-faithfulness-in-hard-times",
    title: "Testimony: God’s Faithfulness in Hard Times",
    excerpt:
      "A short testimony from one of our members about God’s provision and peace through a difficult season.",
    dateIso: "2026-01-20",
    category: "testimonies",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle Member",
    tags: ["Testimony", "Hope"],
    content: [
      "In a season of uncertainty, God reminded me that He is near and that He provides day by day.",
      "Through prayer and support from the church, my faith grew stronger. I learned to trust God with what I couldn’t control.",
      "If you’re walking through hardship right now, don’t give up. God sees you, and He is faithful.",
    ],
  },
  {
    slug: "holiday-message-christmas-2025",
    title: "Holiday Message: Christmas — Jesus Is Our Hope",
    excerpt:
      "A short Christmas message: the light of Christ has come, and hope is available for everyone.",
    dateIso: "2025-12-25",
    category: "announcements",
    readTimeMinutes: 4,
    authorName: "Pastor Mano",
    tags: ["Christmas", "Hope"],
    content: [
      "Christmas reminds us that God stepped into our world — not to condemn us, but to save us.",
      "Jesus is our hope: for families, for healing, for the future. The light shines in the darkness, and the darkness cannot overcome it.",
      "Wherever you are today, you are welcome. We pray God’s peace will fill your home.",
    ],
  },
  {
    slug: "service-times-and-location-february-2026",
    title: "Service Times & Location (February 2026)",
    excerpt: "A quick guide to our Sunday services, parking, and what to expect when you arrive.",
    dateIso: "2026-02-04",
    category: "announcements",
    readTimeMinutes: 3,
    authorName: "Praise Tabernacle",
    tags: ["Visit", "Sunday"],
    content: [
      "If you're new, we're glad you're here. This post is a simple guide to help you plan your visit.",
      "We recommend arriving a few minutes early so you can find parking, say hello at the welcome area, and get settled.",
      "If you have any questions (language needs, accessibility, kids check-in), send us a message and we'll help.",
    ],
  },
  {
    slug: "devotional-psalm-23-the-lord-is-my-shepherd",
    title: "Devotional: Psalm 23 - The Lord Is My Shepherd",
    excerpt: "A short devotional reminder that God leads, restores, and stays near in every season.",
    dateIso: "2026-01-22",
    category: "devotionals",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle",
    tags: ["Devotional", "Hope"],
    content: [
      "Psalm 23 is one of the most comforting passages in Scripture because it reminds us who God is: a Shepherd who leads with love.",
      "Notice the movement of the Psalm - from green pastures to the darkest valley. The promise is not that we avoid trouble, but that God stays with us through it.",
      "This week, pray one line of Psalm 23 each day and ask God to make it real in your heart.",
    ],
  },
  {
    slug: "teaching-prayer-and-fasting",
    title: "Teaching: Prayer & Fasting",
    excerpt: "What fasting is (and isn't), why Christians fast, and how to start simply and safely.",
    dateIso: "2026-01-15",
    category: "teachings",
    readTimeMinutes: 7,
    authorName: "Praise Tabernacle",
    tags: ["Prayer", "Fasting"],
    content: [
      "Fasting is a way to humble ourselves before God and seek Him with focus. It is not a way to earn God's love - we already have that in Christ.",
      "Start simple: choose a time frame, pick one clear prayer focus, and replace the time you would normally eat with Scripture and prayer.",
      "If you have medical concerns, please use wisdom and consult a professional. There are many ways to fast, including non-food fasts.",
    ],
  },
  {
    slug: "small-groups-how-to-join",
    title: "Small Groups: How to Join",
    excerpt: "Small groups are a simple way to build friendships, pray together, and grow in the Word.",
    dateIso: "2026-01-10",
    category: "community-news",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Groups", "Next Steps"],
    content: [
      "If you're looking for community, small groups are one of the best ways to connect beyond Sunday.",
      "Most groups include prayer, a short Bible study, and time to talk and support one another.",
      "Browse the groups directory on our website and reach out - we'll help you find a group that fits your schedule.",
    ],
  },
  {
    slug: "upcoming-baptism-class",
    title: "Upcoming: Baptism Class",
    excerpt: "If you're considering baptism, this short class will explain what it means and how the process works.",
    dateIso: "2026-01-05",
    category: "events",
    readTimeMinutes: 3,
    authorName: "Praise Tabernacle",
    tags: ["Baptism", "Next Steps"],
    content: [
      "Baptism is a public step of following Jesus. If you're exploring that step, we invite you to join a short baptism class.",
      "In the class we'll talk through the meaning of baptism, answer questions, and explain what to expect on baptism day.",
      "Contact us to get the next class date and to let us know you're interested.",
    ],
  },
  {
    slug: "testimony-god-answered-prayer",
    title: "Testimony: God Answered Prayer",
    excerpt: "A short encouragement about bringing our needs to God and trusting His timing.",
    dateIso: "2025-12-10",
    category: "testimonies",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle Member",
    tags: ["Testimony", "Prayer"],
    content: [
      "There was a season when my situation felt stuck - like nothing would change. But God taught me to keep praying and not lose heart.",
      "Over time, God opened doors in ways I couldn't have planned. Some answers were immediate, others took patience.",
      "If you're waiting right now, don't give up. Keep praying, and let the church family stand with you.",
    ],
  },
  {
    slug: "teaching-what-is-baptism",
    title: "Teaching: What Is Baptism?",
    excerpt: "A simple explanation of baptism, why it matters, and common questions people ask.",
    dateIso: "2025-11-20",
    category: "teachings",
    readTimeMinutes: 6,
    authorName: "Praise Tabernacle",
    tags: ["Baptism", "Discipleship"],
    content: [
      "Baptism is a public declaration that we belong to Jesus. It points to His death and resurrection and our new life in Him.",
      "Baptism doesn't save us - Jesus saves us. Baptism is an act of obedience and a celebration of what God has done.",
      "If you have questions about your next step, reach out. We'd love to walk with you.",
    ],
  },
  {
    slug: "serve-find-a-place-to-help",
    title: "Serve: Find a Place to Help",
    excerpt: "Serving is one of the best ways to grow, meet people, and build the church together.",
    dateIso: "2025-11-05",
    category: "community-news",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Serve", "Next Steps"],
    content: [
      "You don't have to be an expert to serve - you just need a willing heart. We'll train you and help you find a good fit.",
      "Whether you love hospitality, kids, prayer, media, or practical setup, there's a team where you can help.",
      "Visit the Serve page to see opportunities and reach out to get started.",
    ],
  },
  {
    slug: "spiritual-question-how-to-pray",
    title: "How Do I Pray? A Simple Starting Point",
    excerpt: "A simple, honest guide to prayer for anyone who feels stuck or unsure how to begin.",
    dateIso: "2026-02-06",
    category: "teachings",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle",
    tags: ["Prayer", "Spiritual Questions"],
    content: [
      "Prayer is not a performance. It is a conversation with God.",
      "Start simple: thank God, share what’s on your heart, and ask for help. Silence is okay, too.",
      "If you want help, ask a friend or send us a message — we’re happy to pray with you.",
    ],
  },
  {
    slug: "spiritual-question-why-suffering",
    title: "Why Is There Suffering?",
    excerpt: "A short, compassionate reflection on suffering and where God meets us in pain.",
    dateIso: "2026-02-05",
    category: "teachings",
    readTimeMinutes: 6,
    authorName: "Praise Tabernacle",
    tags: ["Suffering", "Hope", "Spiritual Questions"],
    content: [
      "Suffering is one of the hardest questions of faith. The Bible does not minimize pain.",
      "God is not distant from our suffering — Jesus entered our brokenness and carries our grief.",
      "If you are hurting, you are not alone. We’re here to listen and pray with you.",
    ],
  },
  {
    slug: "spiritual-question-how-to-start-bible",
    title: "How Do I Start Reading the Bible?",
    excerpt: "A practical way to begin reading the Bible without getting overwhelmed.",
    dateIso: "2026-02-04",
    category: "teachings",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle",
    tags: ["Bible", "Spiritual Questions"],
    content: [
      "Start with the Gospel of John. Read a small section each day and ask what it reveals about Jesus.",
      "Use a simple plan: read, reflect, pray, and write a one-sentence takeaway.",
      "If you want a plan, check the Bible page on our site or reach out for help.",
    ],
  },
  {
    slug: "tamil-devotional-god-is-with-you",
    language: "ta",
    title: "தியானம்: தேவன் உங்களோடு இருக்கிறார்",
    excerpt:
      "இன்றைக்கு ஒரு சிறிய தியானம் — பயப்பட வேண்டாம், தேவன் நம்மோடு இருக்கிறார் என்பதைக் நினைவுபடுத்துகிறது.",
    dateIso: "2026-02-04",
    category: "devotionals",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["தியானம்", "நம்பிக்கை"],
    content: [
      "சில சமயங்களில் நம் மனம் கவலை, பயம், உறுதியின்மை ஆகியவற்றால் நிறைந்து போகலாம்.",
      "ஆனால் தேவனுடைய வார்த்தை நமக்கு மீண்டும் மீண்டும் சொல்லுகிறது: “பயப்படாதே… நான் உன்னோடு இருக்கிறேன்.”",
      "இன்றைக்கு ஒரு நிமிடம்: ஆழமாக சுவாசித்து, தேவனிடம் உங்கள் கவலையை ஒப்புக்கொடுத்து, அவர் சமாதானத்தை கேளுங்கள்.",
    ],
  },
]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

export function getAllBlogSlugs() {
  return blogPosts.map((p) => p.slug)
}

export function getBlogPostsByLanguage(language: BlogLanguage) {
  return blogPosts.filter((p) => (p.language ?? "en") === language)
}

export function listBlogPostsNewestFirst(posts: BlogPost[] = blogPosts) {
  return posts.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
}
