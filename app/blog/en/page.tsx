import type { Metadata } from "next"
import Link from "next/link"

import Script from "next/script"

import BlogArchive from "@/components/BlogArchive"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { getBlogPostsByLanguage } from "@/lib/blog"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "English Blog",
  description: "English posts, devotionals, testimonies, and announcements from Praise Tabernacle.",
  path: "/blog/en",
})

export default function EnglishBlogPage() {
  const posts = getBlogPostsByLanguage("en")

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praise Tabernacle Blog (English)",
    itemListElement: posts.slice(0, 100).map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: post.title,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <Script
        id="schema-org-blog-list-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <PageHeader
        titleEn="English Blog"
        titleTa="ஆங்கில செய்திகள்"
        descriptionEn="Announcements, devotionals, testimonies, events, and community news (English)."
        descriptionTa="அறிவிப்புகள், தியானங்கள், சாட்சிகள், நிகழ்வுகள், சமூக செய்திகள் (ஆங்கிலம்)."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/blog" className="btn btn-sm btn-secondary">
              <Lang en="All posts" ta="அனைத்து பதிவுகள்" taClassName="font-tamil" />
            </Link>
            <Link href="/blog/en" className="btn btn-sm btn-primary">
              <Lang en="English" ta="ஆங்கிலம்" taClassName="font-tamil" />
            </Link>
            <Link href="/blog/ta" className="btn btn-sm btn-secondary">
              <Lang en="Tamil" ta="தமிழ்" taClassName="font-tamil" />
            </Link>
          </div>

          <BlogArchive posts={posts} />
        </Container>
      </section>
    </>
  )
}
