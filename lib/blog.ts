export type BlogCategory =
  | "pastors-message"
  | "event-recaps"
  | "testimonies"
  | "community-news"
  | "bible-study-notes"
  | "announcements"

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
  dateIso: string
  category: BlogCategory
  readTimeMinutes: number
  authorName?: string
  coverImageSrc?: string
  tags?: string[]
  content: string[]
  galleryImageSrcs?: string[]
  attachments?: BlogAttachment[]
}

function defaultCoverImageForCategory(category: BlogCategory) {
  switch (category) {
    case "pastors-message":
      return "/sermons/series-welcome.svg"
    case "event-recaps":
      return "/event-community.svg"
    case "testimonies":
      return "/event-family.svg"
    case "community-news":
      return "/event-family.svg"
    case "bible-study-notes":
      return "/event-teaching.svg"
    case "announcements":
      return "/event-holiday.svg"
    default:
      return "/hero-photo-placeholder.svg"
  }
}

export const blogCategoryLabels: Record<BlogCategory, string> = {
  "pastors-message": "Pastor's Monthly Message",
  "event-recaps": "Event Recaps",
  announcements: "Announcements",
  testimonies: "Testimonies",
  "bible-study-notes": "Bible Study Notes",
  "community-news": "Community News",
}

const rawBlogPosts: BlogPost[] = [
  {
    slug: "easter-prep-week-2026",
    title: "Preparing Our Hearts for Easter Week",
    excerpt:
      "A short pastoral note on prayer, repentance, and inviting others as we approach Easter services together.",
    dateIso: "2026-03-18",
    category: "pastors-message",
    readTimeMinutes: 4,
    authorName: "Pastor Mano",
    tags: ["Easter", "Prayer", "Invitation"],
    content: [
      "As we approach Easter week, let us slow down and remember the cross with gratitude and reverence.",
      "Take time this week for prayer, repentance, and Scripture reading. Ask the Lord to renew your love for Christ and compassion for others.",
      "This is also a beautiful time to invite a friend, neighbour, or family member to join us for worship.",
    ],
  },
  {
    slug: "volunteer-spotlight-welcome-team",
    title: "Volunteer Spotlight: The Welcome Team",
    excerpt:
      "Meet the team that helps guests feel seen, supported, and at home from the moment they arrive.",
    dateIso: "2026-03-16",
    category: "community-news",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Serve", "Hospitality", "Welcome Team"],
    content: [
      "A warm welcome can be a ministry in itself. Our welcome team helps create a calm, friendly first impression for every guest.",
      "From helping with seating to answering simple questions, this team makes church feel accessible and personal.",
      "If you enjoy hospitality and conversation, serving on this team could be a meaningful next step for you.",
    ],
  },
  {
    slug: "testimony-finding-peace-through-prayer",
    title: "Testimony: Finding Peace Through Prayer",
    excerpt:
      "One member shares how steady prayer and support from the church brought peace during a stressful season.",
    dateIso: "2026-03-12",
    category: "testimonies",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle Member",
    tags: ["Prayer", "Peace", "Testimony"],
    content: [
      "During a season of uncertainty, I found myself overwhelmed and tired. I did not have all the answers, but I kept bringing my concerns to God.",
      "The prayers of the church family reminded me that I was not carrying the burden alone. God met me with peace before circumstances changed.",
      "Looking back, I see that the Lord was faithful not only in the outcome, but in the quiet daily grace that sustained me.",
    ],
  },
  {
    slug: "pastor-message-march-2026",
    title: "Pastor's Monthly Message - March 2026",
    excerpt:
      "Pastor Mano shares this month's church prayer focus, spiritual encouragement, and a few next steps for families.",
    dateIso: "2026-03-01",
    category: "pastors-message",
    readTimeMinutes: 4,
    authorName: "Pastor Mano",
    tags: ["Monthly Message", "Prayer", "Church Family"],
    content: [
      "As we begin a new month, let us stay rooted in prayer, unity, and the Word of God.",
      "This month we are praying especially for families, spiritual growth, and open doors for outreach in Mississauga.",
      "Please stay connected through Sunday worship, midweek prayer, and simple acts of encouragement within the church family.",
    ],
  },
  {
    slug: "pastor-update-february-2026",
    title: "Monthly Update from Pastor Mano — February 2026",
    excerpt:
      "A short word of encouragement, prayer focus for the month, and ways to stay connected as a church family.",
    dateIso: "2026-02-01",
    category: "pastors-message",
    readTimeMinutes: 4,
    authorName: "Pastor Mano",
    tags: ["Monthly Update", "Prayer"],
    content: [
      "Thanks for visiting with us. Guests are always welcome — in person or online. We pray this month will strengthen your faith and encourage your family.",
      "Our prayer focus this month is unity, spiritual growth, and a renewed love for Christ. Please join our prayer times and invite someone who needs hope.",
      "If you're new, we'd love to meet you. Plan your visit, send a message, or request prayer — we're here for you.",
    ],
  },
  {
    slug: "weekly-devotional-rest-in-christ",
    title: "Weekly Devotional: Rest in Christ",
    excerpt:
      "A short devotional to help you slow down, pray, and remember the gentle invitation of Jesus.",
    dateIso: "2026-01-28",
    category: "bible-study-notes",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle",
    tags: ["Devotional", "Prayer"],
    content: [
      "Life can feel heavy — responsibilities, anxiety, and uncertainty can pile up quickly.",
      "Jesus invites us to come to Him and find rest. Rest is not the absence of work; it's the presence of Christ with us.",
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
      "We're glad you're here. Whether you're exploring faith or returning to church, there's a place for you and your family at Praise Tabernacle.",
      "Expect a warm welcome, worship, and clear teaching. Come as you are — there's no pressure and no dress code.",
      "If you'd like help with your first visit, reach out anytime. We'd love to meet you.",
    ],
  },
  {
    slug: "teaching-why-we-gather",
    title: "Teaching: Why We Gather — Worship, Word, and Community",
    excerpt:
      "A simple explanation of why Sunday worship matters and how it shapes our faith and relationships.",
    dateIso: "2026-01-12",
    category: "bible-study-notes",
    readTimeMinutes: 6,
    authorName: "Praise Tabernacle",
    tags: ["Worship", "Church"],
    content: [
      "We gather because God is worthy of worship — and because we need one another.",
      "God's Word shapes us, corrects us, and gives us hope. When we hear Scripture taught, our faith becomes steady and strong.",
      "Community matters: we carry burdens together, pray together, and grow together. Church is not a performance — it's a family.",
    ],
  },
  {
    slug: "event-recap-community-prayer-night",
    title: "Event Recap: Community Prayer Night",
    excerpt:
      "A recap of our recent prayer night — worship, Scripture, and a powerful time of intercession together.",
    dateIso: "2026-02-03",
    category: "event-recaps",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Prayer", "Events"],
    galleryImageSrcs: ["/event-placeholder.svg"],
    content: [
      "Thank you to everyone who joined our community prayer night. It was a calm, focused evening of worship and intercession.",
      "We prayed for families, young people, healing, and growth in our church. God is faithful — and we believe He is answering prayer.",
      "If you couldn't attend, you're welcome at the next one. Bring a friend and come expectant.",
    ],
  },
  {
    slug: "event-recap-family-fellowship-sunday",
    title: "Event Recap: Family Fellowship Sunday",
    excerpt:
      "A short recap of worship, fellowship, and conversations from our recent Family Fellowship Sunday.",
    dateIso: "2026-02-18",
    category: "event-recaps",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Family", "Fellowship", "Recap"],
    galleryImageSrcs: ["/event-family.svg"],
    content: [
      "Family Fellowship Sunday was a joyful time of worship, connection, and prayer across generations.",
      "We were encouraged to see new families meeting longtime members and taking simple next steps into community.",
      "Thank you to everyone who served, welcomed guests, and helped create a warm church-home atmosphere.",
    ],
  },
  {
    slug: "testimony-gods-faithfulness-in-hard-times",
    title: "Testimony: God's Faithfulness in Hard Times",
    excerpt:
      "A short testimony from one of our members about God's provision and peace through a difficult season.",
    dateIso: "2026-01-20",
    category: "testimonies",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle Member",
    tags: ["Testimony", "Hope"],
    content: [
      "In a season of uncertainty, God reminded me that He is near and that He provides day by day.",
      "Through prayer and support from the church, my faith grew stronger. I learned to trust God with what I couldn't control.",
      "If you're walking through hardship right now, don't give up. God sees you, and He is faithful.",
    ],
  },
  {
    slug: "community-news-outreach-in-mississauga",
    title: "Community News: Serving Mississauga Together",
    excerpt:
      "An update on practical care, local outreach, and how the church family is serving neighbours in Mississauga.",
    dateIso: "2026-02-14",
    category: "community-news",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["Outreach", "Community", "Mississauga"],
    content: [
      "Our church continues to look for simple, faithful ways to serve local families and support our neighbours.",
      "From prayer and follow-up to practical care and connection, every act of service helps reflect the love of Christ.",
      "If you would like to join upcoming outreach opportunities, visit the Serve page or speak with a ministry leader this Sunday.",
    ],
  },
  {
    slug: "holiday-message-christmas-2025",
    title: "Holiday Message: Christmas — Jesus Is Our Hope",
    excerpt:
      "A short Christmas message: the light of Christ has come, and hope is available for everyone.",
    dateIso: "2025-12-25",
    category: "pastors-message",
    readTimeMinutes: 4,
    authorName: "Pastor Mano",
    tags: ["Christmas", "Hope"],
    content: [
      "Christmas reminds us that God stepped into our world — not to condemn us, but to save us.",
      "Jesus is our hope: for families, for healing, for the future. The light shines in the darkness, and the darkness cannot overcome it.",
      "Wherever you are today, you are welcome. We pray God's peace will fill your home.",
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
    category: "bible-study-notes",
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
    category: "bible-study-notes",
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
    category: "announcements",
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
    category: "bible-study-notes",
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
    category: "bible-study-notes",
    readTimeMinutes: 5,
    authorName: "Praise Tabernacle",
    tags: ["Prayer", "Spiritual Questions"],
    content: [
      "Prayer is not a performance. It is a conversation with God.",
      "Start simple: thank God, share what's on your heart, and ask for help. Silence is okay, too.",
      "If you want help, ask a friend or send us a message — we're happy to pray with you.",
    ],
  },
  {
    slug: "spiritual-question-why-suffering",
    title: "Why Is There Suffering?",
    excerpt: "A short, compassionate reflection on suffering and where God meets us in pain.",
    dateIso: "2026-02-05",
    category: "bible-study-notes",
    readTimeMinutes: 6,
    authorName: "Praise Tabernacle",
    tags: ["Suffering", "Hope", "Spiritual Questions"],
    content: [
      "Suffering is one of the hardest questions of faith. The Bible does not minimize pain.",
      "God is not distant from our suffering — Jesus entered our brokenness and carries our grief.",
      "If you are hurting, you are not alone. We're here to listen and pray with you.",
    ],
  },
  {
    slug: "spiritual-question-how-to-start-bible",
    title: "How Do I Start Reading the Bible?",
    excerpt: "A practical way to begin reading the Bible without getting overwhelmed.",
    dateIso: "2026-02-04",
    category: "bible-study-notes",
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
    slug: "tamil-prayer-encouragement-march-2026",
    language: "ta",
    title: "ஜெபத்தில் ஊக்கம்: மார்ச் 2026",
    excerpt: "ஜெபம், நம்பிக்கை, மற்றும் தேவனின் உண்மையில் நிலைத்திருக்க ஒரு சிறிய ஊக்கம்.",
    dateIso: "2026-03-11",
    category: "bible-study-notes",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["ஜெபம்", "நம்பிக்கை"],
    content: [
      "சில நாட்களில் நம்முடைய மனம் கவலையாகவும் பலவீனமாகவும் இருக்கலாம்.",
      "ஆனால் ஜெபம் என்பது நம்மை தேவனிடத்தில் மீண்டும் திருப்பிச் செல்லும் ஒரு அருள்வழியாகும்.",
      "இந்த வாரம் தொடர்ந்து ஜெபித்து, உங்கள் இருதயத்தை தேவன் பலப்படுத்துவார் என்று நம்புங்கள்.",
    ],
  },
  {
    slug: "tamil-community-update-families",
    language: "ta",
    title: "சமூக செய்தி: குடும்பங்களுடன் ஒன்றாக வளர்வோம்",
    excerpt: "சபை குடும்பங்களில் நடக்கும் ஊக்கமான சிறிய முன்னேற்றங்கள் மற்றும் உறவுகள் பற்றி ஒரு பதிவு.",
    dateIso: "2026-03-07",
    category: "community-news",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["குடும்பம்", "சமூகம்"],
    content: [
      "சமீப வாரங்களில் சபையில் நிறைய குடும்பங்கள் எளிமையான ஆதரவு, ஜெபம், மற்றும் உறவுகளில் வளர்ந்து வருகின்றன.",
      "இளைஞர்கள், குழந்தைகள், பெற்றோர் அனைவருக்கும் இடமுள்ள ஒரு சபை சமூகமாக வளருவதைக் காண்பது மகிழ்ச்சி.",
      "நீங்கள் இணைய விரும்பினால், ஒரு குழு, ஒரு சேவைக் குழு, அல்லது ஒரு ஜெபக் குழு உங்களுக்காக காத்திருக்கிறது.",
    ],
  },
  {
    slug: "tamil-devotional-god-is-with-you",
    language: "ta",
    title: "தியானம்: தேவன் உங்களோடு இருக்கிறார்",
    excerpt: "இன்றைக்கு ஒரு சிறிய தியானம் — பயப்பட வேண்டாம், தேவன் நம்மோடு இருக்கிறார் என்பதை நினைவூட்டுகிறது.",
    dateIso: "2026-02-04",
    category: "bible-study-notes",
    readTimeMinutes: 4,
    authorName: "Praise Tabernacle",
    tags: ["தியானம்", "நம்பிக்கை"],
    content: [
      "சில சமயங்களில் நம் மனம் கவலை, பயம், உறுதியின்மை ஆகியவற்றால் நிரம்பிப் போகலாம்.",
      "ஆனால் தேவனுடைய வார்த்தை நமக்குச் சொல்லுகிறது: “பயப்படாதே... நான் உன்னோடு இருக்கிறேன்.”",
      "இன்றைக்கு ஒரு நிமிடம்: ஆழமாக சுவாசித்து, தேவனிடம் உங்கள் கவலைகளை ஒப்படைத்து, அவருடைய சமாதானத்தை கேளுங்கள்.",
    ],
  },
]

export const blogPosts: BlogPost[] = rawBlogPosts.map((post) => ({
  ...post,
  coverImageSrc: post.coverImageSrc ?? defaultCoverImageForCategory(post.category),
}))

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

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  return listBlogPostsNewestFirst(
    blogPosts.filter((candidate) => {
      if (candidate.slug === post.slug) return false
      if ((candidate.language ?? "en") !== (post.language ?? "en")) return false
      if (candidate.category === post.category) return true

      const sourceTags = new Set(post.tags ?? [])
      return (candidate.tags ?? []).some((tag) => sourceTags.has(tag))
    }),
  ).slice(0, limit)
}
