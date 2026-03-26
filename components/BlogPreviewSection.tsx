import Link from "next/link"
import Image from "next/image"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { blogCategoryLabels, blogPosts, listBlogPostsNewestFirst } from "@/lib/blog"
import { formatIsoDate } from "@/lib/dates"

function formatDate(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "short", day: "2-digit" })
}

export default function BlogPreviewSection() {
  const posts = listBlogPostsNewestFirst(blogPosts).slice(0, 4)
  const [featuredPost, ...morePosts] = posts

  if (!featuredPost) return null

  return (
    <section className="bg-churchBlueSoft">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <div className="section-kicker">
                  <Lang en="Blog" ta="செய்திகள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang
                    en="Fresh teaching, stories, and church updates"
                    ta="புதிய போதனைகள், சாட்சிகள், சபை செய்திகள்"
                    taClassName="font-tamil"
                  />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Read pastor updates, practical Bible articles, testimonies, and community stories. The full site search already includes blog posts too."
                    ta="போதகரின் புதிய செய்திகள், வேதாகம கட்டுரைகள், சாட்சிகள், சமூக செய்திகள் ஆகியவற்றை படிக்கலாம். முழு தளத் தேடலிலும் இந்த பதிவுகள் சேர்க்கப்பட்டுள்ளன."
                    taClassName="font-tamil"
                  />
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Link href="/search?q=prayer" className="btn btn-sm btn-secondary">
                  <Lang en="Search site" ta="தளத்தை தேடுங்கள்" taClassName="font-tamil" />
                </Link>
                <Link href="/blog" className="btn btn-sm btn-primary">
                  <Lang en="Open blog" ta="பதிவுகளை திறக்க" taClassName="font-tamil" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr,1fr]">
            <Reveal>
              <article className="card h-full overflow-hidden">
                {featuredPost.coverImageSrc ? (
                  <div className="card-image">
                    <div className="relative aspect-[16/8] w-full bg-churchBlueSoft">
                      <Image
                        src={featuredPost.coverImageSrc}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : null}
                <div className="card-content p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                      {blogCategoryLabels[featuredPost.category]}
                    </span>
                    <span className="text-xs text-churchBlue/60">
                      {formatDate(featuredPost.dateIso)} • {featuredPost.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {(featuredPost.tags ?? []).slice(0, 4).map((tag) => (
                      <span
                        key={`${featuredPost.slug}-${tag}`}
                        className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/blog/${featuredPost.slug}`} className="btn btn-md btn-primary">
                      <Lang en="Read featured article" ta="முக்கிய பதிவை படிக்க" taClassName="font-tamil" />
                    </Link>
                    <Link href="/blog/en" className="btn btn-md btn-secondary">
                      <Lang en="Browse English posts" ta="ஆங்கில பதிவுகளை பார்க்க" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-6">
              {morePosts.map((post, idx) => (
                <Reveal key={post.slug} delay={(idx + 1) as 1 | 2 | 3}>
                  <article className="card">
                    {post.coverImageSrc ? (
                      <div className="card-image">
                        <div className="relative aspect-[16/9] w-full bg-churchBlueSoft">
                          <Image
                            src={post.coverImageSrc}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className="card-content p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                          {blogCategoryLabels[post.category]}
                        </span>
                        <span className="text-xs text-churchBlue/60">{formatDate(post.dateIso)}</span>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold tracking-tight text-churchBlue sm:text-xl">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-churchBlue/75">{post.excerpt}</p>

                      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-churchBlue/60">{post.readTimeMinutes} min read</div>
                        <Link href={`/blog/${post.slug}`} className="btn btn-sm btn-secondary">
                          <Lang en="Read article" ta="பதிவை படிக்க" taClassName="font-tamil" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
