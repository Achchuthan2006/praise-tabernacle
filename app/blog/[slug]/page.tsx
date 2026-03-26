import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"

import BlogComments from "@/components/BlogComments"
import GalleryGrid from "@/components/GalleryGrid"
import ShareButtons from "@/components/ShareButtons"
import Container from "@/components/ui/Container"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { blogCategoryLabels, getAllBlogSlugs, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog"
import { formatIsoDate } from "@/lib/dates"
import { blogPostJsonLd, pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

function formatDate(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "long", day: "2-digit" })
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return { title: "Blog" }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: "article",
    image: post.coverImageSrc ?? siteConfig.branding.logoEnBgSrc,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const shareUrl = `${siteConfig.siteUrl}/blog/${post.slug}`
  const relatedPosts = getRelatedBlogPosts(post, 3)

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
            <Breadcrumbs
              className="mb-6"
              items={[
                { href: "/", labelEn: "Home", labelTa: "முகப்பு" },
                { href: "/blog", labelEn: "Blog", labelTa: "செய்திகள்" },
                { labelEn: post.title, labelTa: post.title },
              ]}
            />

            <Reveal>
              <article className="card">
                {post.coverImageSrc ? (
                  <div className="card-image">
                    <div className="relative aspect-[16/8] w-full bg-churchBlueSoft">
                      <Image
                        src={post.coverImageSrc}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                ) : null}
                <div className="card-content p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                      {blogCategoryLabels[post.category]}
                    </span>
                    <span className="text-xs text-churchBlue/60">
                      {formatDate(post.dateIso)} • {post.readTimeMinutes} min read
                    </span>
                    {post.authorName ? <span className="text-xs text-churchBlue/60">• {post.authorName}</span> : null}
                  </div>

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
                        {post.attachments.map((attachment) => (
                          <a
                            key={`${post.slug}-${attachment.href}`}
                            href={attachment.href}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary"
                          >
                            {attachment.label}
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

            {relatedPosts.length ? (
              <Reveal delay={1} className="mt-8">
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow sm:p-8">
                  <div className="text-sm font-semibold text-churchBlue">Related posts</div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((related) => (
                      <article key={related.slug} className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                        <div className="text-xs font-semibold text-churchBlue/60">{formatDate(related.dateIso)}</div>
                        <h3 className="mt-2 text-base font-semibold tracking-tight text-churchBlue">{related.title}</h3>
                        <p className="mt-2 text-sm text-churchBlue/72">{related.excerpt}</p>
                        <div className="mt-4">
                          <Link href={`/blog/${related.slug}`} className="btn btn-sm btn-secondary w-full">
                            Read article
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  )
}
