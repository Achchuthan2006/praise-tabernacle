"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import Lang from "@/components/language/Lang"
import Reveal from "@/components/ui/Reveal"
import type { StoreCategory, StoreItem } from "@/lib/books"

function delayForIndex(idx: number): 0 | 1 | 2 | 3 {
  return (idx % 4) as 0 | 1 | 2 | 3
}

function matchesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

type CategoryFilter = StoreCategory | "All"

export default function BookstoreCatalog({ items }: { items: StoreItem[] }) {
  const [category, setCategory] = useState<CategoryFilter>("All")
  const [query, setQuery] = useState("")

  const categories = useMemo(() => {
    const set = new Set<StoreCategory>()
    for (const item of items) set.add(item.category)
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim()
    return items.filter((item) => {
      if (category !== "All" && item.category !== category) return false
      if (!q) return true
      const blob = [item.title, item.author ?? "", item.shortDescription, item.description].join(" ")
      return matchesQuery(blob, q)
    })
  }, [category, items, query])

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={["btn btn-sm", category === "All" ? "btn-primary" : "btn-secondary"].join(" ")}
            onClick={() => setCategory("All")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={["btn btn-sm", category === c ? "btn-primary" : "btn-secondary"].join(" ")}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="block w-full sm:max-w-sm">
          <span className="sr-only">Search products</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue shadow-sm focus-ring"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b, idx) => (
          <Reveal key={b.slug} delay={delayForIndex(idx)}>
            <article className="card">
              <div className="card-image">
                <Link
                  href={`/bookstore/${b.slug}`}
                  className="group block focus-ring"
                  aria-label={`Open product: ${b.title}`}
                >
                  <div className="relative aspect-[16/10] w-full bg-churchBlueSoft">
                    <Image
                      src={b.imageSrc}
                      alt={b.title}
                      width={1200}
                      height={750}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="h-full w-full object-cover"
                      quality={85}
                    />
                  </div>
                </Link>
              </div>

              <div className="card-content">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                      <Link href={`/bookstore/${b.slug}`} className="focus-ring rounded-lg">
                        {b.title}
                      </Link>
                    </h3>
                    {b.author ? <div className="mt-1 text-sm text-churchBlue/70">{b.author}</div> : null}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                      ${b.priceCad.toFixed(2)} CAD
                    </span>
                    <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-[11px] font-semibold text-churchBlue/70">
                      {b.category}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-churchBlue/75">{b.shortDescription}</p>

                <div className="mt-6 grid gap-2">
                  <Link href={`/bookstore/${b.slug}`} className="btn btn-sm btn-primary w-full">
                    <Lang en="View details" ta="விவரங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href={`/bookstore/${b.slug}#buy`} className="btn btn-sm btn-secondary w-full">
                    <Lang en="Buy" ta="வாங்க" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 text-sm text-churchBlue/70">
          <Lang
            en="No products match your search."
            ta="உங்கள் தேடலுக்கு பொருட்கள் இல்லை."
            taClassName="font-tamil"
          />
        </div>
      ) : null}
    </>
  )
}

