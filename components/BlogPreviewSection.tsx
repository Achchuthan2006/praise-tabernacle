import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { blogCategoryLabels, blogPosts } from "@/lib/blog"
import { formatIsoDate } from "@/lib/dates"

function formatDate(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "short", day: "2-digit" })
}

export default function BlogPreviewSection() {
  const posts = blogPosts
    .slice()
    .sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1))
    .slice(0, 3)

  return (
    <section className="bg-churchBlueSoft">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Stories" ta="செய்திகள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en="From the church" ta="சபையிலிருந்து" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Announcements, devotionals, testimonies, events, and community news."
                    ta="அறிவிப்புகள், தியானங்கள், சாட்சிகள், நிகழ்வுகள், சமூக செய்திகள்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6">
            {posts.map((post, idx) => (
              <Reveal key={post.slug} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}>
                <article className="card w-full">
                  <div className="card-content p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                        {blogCategoryLabels[post.category]}
                      </span>
                      <span className="text-xs text-churchBlue/60">
                        {formatDate(post.dateIso)} • {post.readTimeMinutes} min read
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">{post.excerpt}</p>
                    <div className="mt-6">
                      <Link href={`/blog/${post.slug}`} className="btn btn-sm btn-secondary">
                        <Lang en="Read article" ta="பதிவை படிக்க" taClassName="font-tamil" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="flex justify-start">
              <Link href="/blog" className="btn btn-sm btn-secondary">
                <Lang en="View blog" ta="செய்திகளை பார்க்க" taClassName="font-tamil" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}