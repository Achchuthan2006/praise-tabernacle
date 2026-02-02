"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"

import SermonCard from "@/components/SermonCard"
import type { Sermon } from "@/lib/content"

type Filter = "all" | "en" | "ta"

export default function SermonList({ sermons }: { sermons: Sermon[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const filtered = useMemo(() => {
    if (filter === "all") return sermons
    return sermons.filter((s) => s.language === filter)
  }, [filter, sermons])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterButton>
        <FilterButton active={filter === "en"} onClick={() => setFilter("en")}>
          English Service
        </FilterButton>
        <FilterButton active={filter === "ta"} onClick={() => setFilter("ta")}>
          Tamil Service
        </FilterButton>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((sermon) => (
          <SermonCard key={sermon.id} sermon={sermon} />
        ))}
      </div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "focus-ring rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-churchBlue bg-churchBlue text-white"
          : "border-churchBlue/15 bg-white text-churchBlue hover:bg-churchBlueSoft",
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}
