import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"

import Container from "@/components/ui/Container"
import GalleryGrid from "@/components/GalleryGrid"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import BlogComments from "@/components/BlogComments"
import ShareButtons from "@/components/ShareButtons"
import { blogCategoryLabels, getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog"
import { formatIsoDate } from "@/lib/dates"
import { blogPostJsonLd, pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

function formatDate(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "long", day: "2-digit" })
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: "Blog" }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: "article",
    image: post.coverImageSrc ?? siteConfig.branding.logoEnBgSrc,
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()
  const shareUrl = `${siteConfig.siteUrl}/blog/${post.slug}`

  return (
    <>
      <Script
        id={`schema-org-blog-${post.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }}
      />
      <PageHeader
        titleEn={post.title}
        titleTa="செய்தி"
        descriptionEn={`${formatDate(post.dateIso)} • ${blogCategoryLabels[post.category]}${
          post.authorName ? ` • ${post.authorName}` : ""
        }`}
        descriptionTa=""
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <article className="card">
                <div className="card-content p-8">
                  <p className="text-sm text-churchBlue/75 sm:text-base">{post.excerpt}</p>

                  <div className="mt-8 space-y-5 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    {post.content.map((paragraph, idx) => (
                      <p key={`${post.slug}-${idx}`}>{paragraph}</p>
                    ))}
                  </div>

                  {post.attachments?.length ? (
                    <div className="mt-10 border-t border-churchBlue/10 pt-8">
                      <div className="text-sm font-semibold text-churchBlue">Attachments</div>
                      <div className="mt-4 flex flex-col gap-2">
                        {post.attachments.map((a) => (
                          <a
                            key={`${post.slug}-${a.href}`}
                            href={a.href}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary"
                          >
                            {a.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {post.galleryImageSrcs?.length ? (
                    <div className="mt-10 border-t border-churchBlue/10 pt-8">
                      <div className="text-sm font-semibold text-churchBlue">Photo gallery</div>
                      <GalleryGrid images={post.galleryImageSrcs} />
                    </div>
                  ) : null}

                  <div className="mt-10 border-t border-churchBlue/10 pt-8">
                    <Link href="/blog" className="btn btn-md btn-secondary">
                      Back to blog
                    </Link>
                  </div>

                  <div className="mt-10 border-t border-churchBlue/10 pt-8">
                    <ShareButtons title={post.title} url={shareUrl} />
                  </div>

                  <BlogComments postSlug={post.slug} />
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
