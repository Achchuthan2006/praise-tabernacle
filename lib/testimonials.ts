export type TestimonyCategory = "healing" | "financial" | "family" | "salvation" | "deliverance" | "guidance"

export type Testimonial = {
  slug: string
  titleEn: string
  titleTa: string
  dateIso?: string
  categories: TestimonyCategory[]
  youtubeVideoId?: string
  graphicSrc?: string
  quote?: string
  beforeEn?: string
  beforeTa?: string
  afterEn?: string
  afterTa?: string
  storyEn?: string
  storyTa?: string
  transcriptText?: string
  attribution?: string
  name?: string
  detail?: string
  photoSrc?: string
}

export const testimonials: Testimonial[] = [
  {
    slug: "answered-prayer-healing",
    titleEn: "Answered Prayer: Healing",
    titleTa: "பதிலான ஜெபம்: சுகமடைதல்",
    dateIso: "2026-02-01",
    categories: ["healing"],
    youtubeVideoId: "jVQiZbMsxio",
    graphicSrc: "/verse-1.webp",
    quote: "We brought a health concern to prayer and saw God strengthen us with peace and healing over time.",
    beforeEn: "An ongoing health concern brought fear and uncertainty.",
    beforeTa: "தொடர்ந்த உடல்நலப் பிரச்சினை பயத்தையும் குழப்பத்தையும் ஏற்படுத்தியது.",
    afterEn: "We experienced peace, support, and a clear turning point through prayer.",
    afterTa: "ஜெபத்தின் மூலம் சமாதானத்தையும் ஆதரவையும் தெளிவான மாற்றத்தையும் அனுபவித்தோம்.",
    attribution: "Church member",
  },
  {
    slug: "financial-breakthrough-provision",
    titleEn: "Financial Breakthrough: Provision",
    titleTa: "நிதி முன்னேற்றம்: தேவனின் வழங்குதல்",
    dateIso: "2026-01-18",
    categories: ["financial"],
    quote: "God provided in an unexpected way right when we needed it most, and our faith grew.",
    beforeEn: "Bills and deadlines felt overwhelming.",
    beforeTa: "பில்ல்களும் காலக்கெடுக்களும் மிகவும் சிரமமாக இருந்தது.",
    afterEn: "We found a solution, received help, and learned to trust God daily.",
    afterTa: "தீர்வு கிடைத்தது, உதவி வந்தது, மற்றும் நாள்தோறும் தேவனை நம்ப கற்றுக்கொண்டோம்.",
    attribution: "Family",
  },
  {
    slug: "family-restoration-peace",
    titleEn: "Family Restoration: Peace at Home",
    titleTa: "குடும்ப மீட்பு: வீட்டில் சமாதானம்",
    dateIso: "2025-12-20",
    categories: ["family"],
    quote: "We saw healing in relationships and learned how to pray and speak with grace at home.",
    beforeEn: "Misunderstandings and tension were common.",
    beforeTa: "தவறான புரிதல்களும் மன அழுத்தமும் அடிக்கடி இருந்தன.",
    afterEn: "We rebuilt trust, communication improved, and peace returned.",
    afterTa: "நம்பிக்கை மீண்டும் உருவானது, உரையாடல் மேம்பட்டது, சமாதானம் திரும்பியது.",
    attribution: "Parent",
  },
  {
    slug: "found-hope-in-jesus",
    titleEn: "Found Hope in Jesus",
    titleTa: "இயேசுவில் நம்பிக்கை கண்டேன்",
    dateIso: "2025-11-10",
    categories: ["salvation", "guidance"],
    quote: "We came in with questions and left with hope. The worship was heartfelt, the message was clear, and people genuinely cared.",
    attribution: "First-time guest",
  },
  {
    slug: "prayer-and-care-followup",
    titleEn: "Prayer & Care Follow-up",
    titleTa: "ஜெபமும் அக்கறையும் தொடர்ந்து வந்த ஆதரவு",
    dateIso: "2025-10-22",
    categories: ["guidance"],
    quote: "The prayer support and follow-up meant a lot to us. We didn't feel rushed, we felt seen and cared for.",
    attribution: "Church member",
  },
]

export function getAllTestimonialSlugs() {
  return testimonials.map((t) => t.slug)
}

export function getTestimonialBySlug(slug: string) {
  return testimonials.find((t) => t.slug === slug) ?? null
}

export function listTestimonialsNewestFirst() {
  return testimonials.slice().sort((a, b) => (b.dateIso ?? "").localeCompare(a.dateIso ?? ""))
}
