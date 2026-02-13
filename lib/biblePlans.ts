import type { BibleBookId, BibleVersionId } from "@/lib/bible"
import { getAvailableChapters } from "@/lib/bible"
import { siteConfig } from "@/lib/site"
import { formatIsoDate } from "@/lib/dates"

function formatLaunchDate(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "short", day: "2-digit" })
}

export type ReadingPlanId = "one-year" | "ninety-day" | "john-21-days" | "topical-prayer"

export type ReadingPlanStep = {
  label: string
  versionId: BibleVersionId
  bookId: BibleBookId
  chapter: number
}

export type ReadingPlan = {
  id: ReadingPlanId
  title: string
  description: string
  steps: ReadingPlanStep[]
  availabilityNote?: string
}

function buildJohnPlan(): ReadingPlan {
  const chapters = getAvailableChapters("john")
  const steps = chapters.map((chapter) => ({
    label: `John ${chapter}`,
    versionId: "kjv" as const,
    bookId: "john" as const,
    chapter,
  }))

  // With only John 1 loaded, this still works today and expands automatically as you add more chapters.
  return {
    id: "john-21-days",
    title: "John (Simple Plan)",
    description: "Read through John at a calm pace.",
    steps,
  }
}

export const readingPlans: ReadingPlan[] = [
  {
    id: "one-year",
    title: `1-Year Bible (Launch: ${formatLaunchDate(siteConfig.launchDates.biblePlans.oneYear)})`,
    description: "A classic 1-year plan (Old + New Testament daily).",
    steps: [],
    availabilityNote:
      "This plan requires building out the step list. KJV chapter text is loaded on-demand.",
  },
  {
    id: "ninety-day",
    title: `90-Day Bible (Launch: ${formatLaunchDate(siteConfig.launchDates.biblePlans.ninetyDay)})`,
    description: "A faster plan to read through Scripture in about 90 days.",
    steps: [],
    availabilityNote:
      "This plan requires building out the step list. KJV chapter text is loaded on-demand.",
  },
  {
    id: "topical-prayer",
    title: `Topical: Prayer (Launch: ${formatLaunchDate(siteConfig.launchDates.biblePlans.topicalPrayer)})`,
    description: "Short passages and prompts to grow your prayer life.",
    steps: [],
    availabilityNote:
      "This plan requires building out the step list and selecting passages.",
  },
  buildJohnPlan(),
]
