import type { Metadata } from "next"

import Link from "next/link"
import Script from "next/script"

import BlogArchive from "@/components/BlogArchive"
import Lang from "@/components/language/Lang"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { blogPosts } from "@/lib/blog"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Pastor's monthly message, event recaps, testimonies, Bible study notes, and community news from Praise Tabernacle.",
  path: "/blog",
})

export default function BlogPage() {
  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praise Tabernacle Blog",
    itemListElement: blogPosts.slice(0, 100).map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: post.title,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <Script
        id="schema-org-blog-list"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <PageHeader
        titleEn="Blog"
        titleTa="செய்திகள்"
        descriptionEn="Pastor's monthly message, event recaps, testimonies, Bible study notes, and community news."
        descriptionTa="அறிவிப்புகள், தியானங்கள், சாட்சிகள், நிகழ்வுகள், போதனைகள், மற்றும் சமூக செய்திகள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <Breadcrumbs
            className="mb-6"
            items={[
              { href: "/", labelEn: "Home", labelTa: "முகப்பு" },
              { labelEn: "Blog", labelTa: "செய்திகள்" },
            ]}
          />
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/blog" className="btn btn-sm btn-primary">
              <Lang en="All posts" ta="அனைத்து பதிவுகள்" taClassName="font-tamil" />
            </Link>
            <Link href="/blog/en" className="btn btn-sm btn-secondary">
              <Lang en="English" ta="ஆங்கிலம்" taClassName="font-tamil" />
            </Link>
            <Link href="/blog/ta" className="btn btn-sm btn-secondary">
              <Lang en="Tamil" ta="தமிழ்" taClassName="font-tamil" />
            </Link>
          </div>
          <BlogArchive posts={blogPosts} />
        </Container>
      </section>
    </>
  )
}
