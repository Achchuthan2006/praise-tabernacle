import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import SiteSearch from "@/components/SiteSearch"
import { blogPosts } from "@/lib/blog"
import { events } from "@/lib/events"
import { pageMetadata } from "@/lib/seo"
import { publicSermons, sermonSeries } from "@/lib/sermons"

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search sermons, events, and blog posts from Praise Tabernacle.",
  path: "/search",
})

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string | string[] }
}) {
  const q = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q

  const blogItems = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    dateIso: p.dateIso,
    category: p.category,
    tags: p.tags ?? [],
  }))

  return (
    <>
      <PageHeader
        titleEn="Search"
        titleTa="தேடல்"
        descriptionEn="Search sermons, events, and blog posts."
        descriptionTa="பிரசங்கங்கள், நிகழ்வுகள், மற்றும் பதிவுகளை தேடுங்கள்."
      />
      <section className="bg-white">
        <Container className="section-padding">
          <SiteSearch
            initialQuery={q ?? ""}
            sermons={publicSermons}
            series={sermonSeries}
            events={events}
            blogPosts={blogItems}
          />
        </Container>
      </section>
    </>
  )
}
