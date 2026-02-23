"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import type { BlogCategory, BlogPost } from "@/lib/blog"
import { blogCategoryLabels } from "@/lib/blog"
import { formatIsoDate } from "@/lib/dates"

function uniq(values: Array<string | undefined>) {
  const set = new Set(values.filter(Boolean) as string[])
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

function matchesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

function formatDate(dateIso: string, locale: string) {
  return formatIsoDate(dateIso, locale, { year: "numeric", month: "short", day: "2-digit" })
}

export default function BlogArchive({ posts }: { posts: BlogPost[] }) {
  const { language } = useLanguage()
  const locale = language === "ta" ? "ta-IN" : "en-CA"

  const categoryTa: Record<BlogCategory, string> = {
    announcements: "அறிவிப்புகள்",
    devotionals: "தியானங்கள்",
    testimonies: "சாட்சிகள்",
    events: "நிகழ்வுகள்",
    teachings: "போதனைகள்",
    "community-news": "சமூக செய்திகள்",
  }

  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedAuthor, setSelectedAuthor] = useState<string>("")

  const authors = useMemo(() => uniq(posts.map((p) => p.authorName)), [posts])
  const categories = useMemo(() => uniq(posts.map((p) => p.category)), [posts])

  const filtered = useMemo(() => {
    const q = query.trim()
    return posts
      .filter((post) => {
        if (selectedCategory && post.category !== selectedCategory) return false
        if (selectedAuthor && post.authorName !== selectedAuthor) return false
        if (!q) return true

        const blob = [
          post.title,
          post.excerpt,
          post.dateIso,
          blogCategoryLabels[post.category],
          post.authorName ?? "",
          ...(post.tags ?? []),
          ...(post.content ?? []),
        ].join(" ")
        return matchesQuery(blob, q)
      })
      .slice()
      .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  }, [posts, query, selectedAuthor, selectedCategory])

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="section-kicker">{language === "ta" ? "செய்திகள்" : "Blog"}</div>
          <h2 className="section-heading">{language === "ta" ? "சமீபத்திய பதிவுகள்" : "Latest posts"}</h2>
          <p className="mt-1 text-sm text-churchBlue/70">
            {language === "ta"
              ? "அறிவிப்புகள், தியானங்கள், சாட்சிகள், நிகழ்வுகள், போதனைகள், சமூக செய்திகள்."
              : "Announcements, devotionals, testimonies, events, teachings, and community news."}
          </p>
        </div>
      </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <label className="block">
              <div className="float-field">
                <input
                  className="float-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === "ta" ? "செய்திகளை தேடுங்கள்…" : "Search blog posts…"}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>
                  {language === "ta" ? "தேடல்" : "Search"}
                </span>
              </div>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-2">
          <Filter
            label={language === "ta" ? "வகை" : "Category"}
            value={selectedCategory}
            onChange={setSelectedCategory}
            allLabel={language === "ta" ? "அனைத்தும்" : "All"}
            options={categories.map((c) => ({
              value: c,
              label:
                language === "ta"
                  ? categoryTa[c as BlogCategory] ?? blogCategoryLabels[c as BlogCategory] ?? c
                  : blogCategoryLabels[c as BlogCategory] ?? c,
            }))}
          />
          <Filter
            label={language === "ta" ? "ஆசிரியர்" : "Author"}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            allLabel={language === "ta" ? "அனைத்தும்" : "All"}
            options={authors.map((a) => ({ value: a, label: a }))}
          />
        </div>
      </div>

      <div className="blog-grid mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <BlogEntryReveal key={post.slug}>
            <article className="card">
              <div className="card-content">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                  {language === "ta" ? categoryTa[post.category] ?? blogCategoryLabels[post.category] : blogCategoryLabels[post.category]}
                </span>
                <span className="text-xs text-churchBlue/60">
                  {formatDate(post.dateIso, locale)} •{" "}
                  {language === "ta"
                    ? `${post.readTimeMinutes} நிமிடம் வாசிப்பு`
                    : `${post.readTimeMinutes} min read`}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-churchBlue">
                <Link href={`/blog/${post.slug}`} className="focus-ring rounded-lg">
                  {post.title}
                </Link>
              </h3>
              {post.authorName ? (
                <div className="mt-1 text-sm text-churchBlue/70">{post.authorName}</div>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                {post.excerpt}
              </p>
              <div className="mt-6">
                <Link href={`/blog/${post.slug}`} className="btn btn-sm btn-primary w-full">
                  {language === "ta" ? "பதிவை படிக்கவும்" : "Read post"}
                </Link>
              </div>
              </div>
            </article>
          </BlogEntryReveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 card">
          <div className="card-content p-8">
            <div className="text-sm font-semibold text-churchBlue">
              {language === "ta" ? "முடிவுகள் இல்லை" : "No results"}
            </div>
            <p className="mt-2 text-sm text-churchBlue/70">
              {language === "ta"
                ? "வடிகட்டிகளை நீக்கி அல்லது வேறு சொல் தேடுங்கள்."
                : "Try clearing filters or searching a different keyword."}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function BlogEntryReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
    if (inView) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="blog-entry-reveal" data-visible={visible ? "true" : "false"}>
      {children}
    </div>
  )
}

function Filter({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  allLabel: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-churchBlue">{label}</span>
      <select
        className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
