import type { Metadata } from "next"

import SiteSearch from "@/components/SiteSearch"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { blogPosts } from "@/lib/blog"
import { events } from "@/lib/events"
import { pageMetadata } from "@/lib/seo"
import { publicSermons, sermonSeries } from "@/lib/sermons"

const searchablePages = [
  {
    href: "/about",
    titleEn: "About",
    titleTa: "எங்களைப் பற்றி",
    excerptEn: "Learn who we are, why we exist, and how Praise Tabernacle serves families in Mississauga.",
    excerptTa: "நாங்கள் யார், ஏன் இருக்கிறோம், மற்றும் மிசிசாகாவில் குடும்பங்களுக்கு எப்படி சேவை செய்கிறோம் என்பதை அறியுங்கள்.",
    tags: ["church", "mission", "vision", "leadership"],
  },
  {
    href: "/get-involved",
    titleEn: "Get Involved",
    titleTa: "ஈடுபடுங்கள்",
    excerptEn: "Find next steps for serving, ministries, groups, prayer, and membership.",
    excerptTa: "சேவை, ஊழியங்கள், குழுக்கள், ஜெபம், மற்றும் உறுப்பினர் தொடர்பான அடுத்த படிகளை காணுங்கள்.",
    tags: ["serve", "ministries", "groups", "membership"],
  },
  {
    href: "/ministries",
    titleEn: "Ministries",
    titleTa: "ஊழியங்கள்",
    excerptEn: "Explore ministries for kids, youth, prayer, outreach, and missions.",
    excerptTa: "குழந்தைகள், இளைஞர்கள், ஜெபம், சமூக சேவை, மற்றும் மிஷன் ஊழியங்களை அறியுங்கள்.",
    tags: ["kids", "youth", "prayer", "outreach", "missions"],
  },
  {
    href: "/resources",
    titleEn: "Resources",
    titleTa: "வளங்கள்",
    excerptEn: "Browse Bible tools, sermons, articles, magazines, and practical guides.",
    excerptTa: "வேதாகம உதவிகள், பிரசங்கங்கள், கட்டுரைகள், இதழ்கள், மற்றும் நடைமுறை வழிகாட்டிகளை பாருங்கள்.",
    tags: ["bible", "sermons", "blog", "magazine", "guides"],
  },
  {
    href: "/contact",
    titleEn: "Contact",
    titleTa: "தொடர்பு",
    excerptEn: "Reach Praise Tabernacle by phone, email, or contact form.",
    excerptTa: "தொலைபேசி, மின்னஞ்சல், அல்லது தொடர்பு படிவம் மூலம் Praise Tabernacle-ஐ அணுகுங்கள்.",
    tags: ["phone", "email", "address", "contact"],
  },
  {
    href: "/visit",
    titleEn: "Plan Your Visit",
    titleTa: "உங்கள் வருகையை திட்டமிடுங்கள்",
    excerptEn: "Service times, location, what to expect, and planning your first visit.",
    excerptTa: "ஆராதனை நேரங்கள், இடம், என்ன எதிர்பார்க்கலாம், மற்றும் உங்கள் முதல் வருகையை திட்டமிடுதல்.",
    tags: ["visit", "service times", "location", "new here"],
  },
  {
    href: "/give",
    titleEn: "Give",
    titleTa: "கொடை",
    excerptEn: "Learn about giving options, church generosity, and available giving methods.",
    excerptTa: "கொடையளிக்கும் வழிகள், சபை தாராளம், மற்றும் கிடைக்கும் கொடை முறைகள் பற்றி அறியுங்கள்.",
    tags: ["offering", "giving", "donation", "tithes"],
  },
  {
    href: "/groups",
    titleEn: "Groups",
    titleTa: "குழுக்கள்",
    excerptEn: "Find small groups for prayer, Bible study, and community connection.",
    excerptTa: "ஜெபம், வேதாகமப் பயிற்சி, மற்றும் சமூக இணைப்பிற்கான சிறுகுழுக்களை காணுங்கள்.",
    tags: ["groups", "small groups", "community", "fellowship"],
  },
  {
    href: "/prayer",
    titleEn: "Prayer",
    titleTa: "ஜெபம்",
    excerptEn: "Send a prayer request, pray with the church family, and find spiritual encouragement.",
    excerptTa: "ஜெப வேண்டுகோள் அனுப்புங்கள், சபை குடும்பத்துடன் ஜெபிக்கவும், ஆவிக்குரிய ஊக்கத்தை காணவும்.",
    tags: ["prayer", "request", "encouragement", "care"],
  },
  {
    href: "/care",
    titleEn: "Care",
    titleTa: "அக்கறை",
    excerptEn: "Request pastoral care, support, or help for your family during difficult seasons.",
    excerptTa: "கடின காலங்களில் மேய்ப்பரின் அக்கறை, ஆதரவு, அல்லது உதவி கோருங்கள்.",
    tags: ["care", "pastoral care", "support", "help"],
  },
  {
    href: "/serve",
    titleEn: "Serve",
    titleTa: "சேவை",
    excerptEn: "Explore serving opportunities in hospitality, prayer, media, kids, and outreach.",
    excerptTa: "விருந்தோம்பல், ஜெபம், மீடியா, குழந்தைகள், மற்றும் சமூக சேவைக்கான வாய்ப்புகளை காணுங்கள்.",
    tags: ["serve", "volunteer", "teams", "hospitality", "media"],
  },
  {
    href: "/calendar",
    titleEn: "Calendar",
    titleTa: "நாட்காட்டி",
    excerptEn: "See church events, important dates, and upcoming gatherings in one place.",
    excerptTa: "சபை நிகழ்வுகள், முக்கிய தினங்கள், மற்றும் வரவிருக்கும் கூடுகைகளை ஒரே இடத்தில் காணுங்கள்.",
    tags: ["calendar", "events", "dates", "schedule"],
  },
  {
    href: "/watch",
    titleEn: "Watch",
    titleTa: "பாருங்கள்",
    excerptEn: "Watch recent services, livestreams, and featured video messages.",
    excerptTa: "சமீப ஆராதனைகள், நேரலைகள், மற்றும் முக்கிய வீடியோ செய்திகளை பாருங்கள்.",
    tags: ["watch", "livestream", "services", "video"],
  },
] as const

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search sermons, events, and blog posts from Praise Tabernacle.",
  path: "/search",
})

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const resolvedSearchParams = await searchParams
  const q = Array.isArray(resolvedSearchParams.q) ? resolvedSearchParams.q[0] : resolvedSearchParams.q

  const blogItems = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    dateIso: p.dateIso,
    category: p.category,
    tags: p.tags ?? [],
    authorName: p.authorName ?? "",
    content: p.content.join(" "),
  }))

  return (
    <>
      <PageHeader
        titleEn="Search"
        titleTa="தேடல்"
        descriptionEn="Search sermons, events, and blog posts."
        descriptionTa="பிரசங்கங்கள், நிகழ்வுகள், மற்றும் வலைப்பதிவுகளைத் தேடுங்கள்."
      />
      <section className="bg-white">
        <Container className="section-padding">
          <SiteSearch
            initialQuery={q ?? ""}
            sermons={publicSermons}
            series={sermonSeries}
            events={events}
            blogPosts={blogItems}
            pages={searchablePages}
          />
        </Container>
      </section>
    </>
  )
}
