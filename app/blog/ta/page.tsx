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
  title: "Tamil Blog",
  description: "Tamil posts, devotionals, testimonies, and announcements from Praise Tabernacle.",
  path: "/blog/ta",
})

export default function TamilBlogPage() {
  const posts = getBlogPostsByLanguage("ta")

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praise Tabernacle Blog (Tamil)",
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
        id="schema-org-blog-list-ta"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <PageHeader
        titleEn="Tamil Blog"
        titleTa="தமிழ் செய்திகள்"
        descriptionEn="Devotionals, testimonies, and announcements (Tamil)."
        descriptionTa="தியானங்கள், சாட்சிகள், அறிவிப்புகள் (தமிழ்)."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/blog" className="btn btn-sm btn-secondary">
              <Lang en="All posts" ta="அனைத்து பதிவுகள்" taClassName="font-tamil" />
            </Link>
            <Link href="/blog/en" className="btn btn-sm btn-secondary">
              <Lang en="English" ta="ஆங்கிலம்" taClassName="font-tamil" />
            </Link>
            <Link href="/blog/ta" className="btn btn-sm btn-primary">
              <Lang en="Tamil" ta="தமிழ்" taClassName="font-tamil" />
            </Link>
          </div>

          {posts.length ? (
            <BlogArchive posts={posts} />
          ) : (
            <div className="card">
              <div className="card-content p-8">
                <div className="text-sm font-semibold text-churchBlue">
                  <Lang en="Tamil blog is coming soon" ta="தமிழ் பதிவுகள் விரைவில்" taClassName="font-tamil" />
                </div>
                <p className="mt-2 text-sm text-churchBlue/70">
                  <Lang
                    en="Check back soon. You can read the English posts for now."
                    ta="விரைவில் மேலும் பதிவுகள் சேர்க்கப்படும். இப்போது ஆங்கில பதிவுகளைப் படிக்கலாம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

