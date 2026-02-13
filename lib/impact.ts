export type ImpactMonth = {
  monthIso: string // YYYY-MM
  updatedIso: string // YYYY-MM-DD
  peopleServed: number
  prayerRequestsAnswered: number
  familiesReached: number
  communityOutreachMoments: number
  noteEn?: string
  noteTa?: string
}

// Tip: Replace these seed numbers with your real monthly tracking.
// Keep it simple: update once a month and the website will reflect it everywhere.
export const impactMonths: ImpactMonth[] = [
  {
    monthIso: "2026-02",
    updatedIso: "2026-02-01",
    peopleServed: 520,
    prayerRequestsAnswered: 180,
    familiesReached: 96,
    communityOutreachMoments: 74,
    noteEn: "Numbers include in-person & online ministry touchpoints.",
    noteTa: "இவை நேரில் மற்றும் ஆன்லைன் சேவை தொடர்புகளையும் உள்ளடக்கியவை.",
  },
  {
    monthIso: "2026-01",
    updatedIso: "2026-01-31",
    peopleServed: 610,
    prayerRequestsAnswered: 210,
    familiesReached: 110,
    communityOutreachMoments: 82,
  },
  {
    monthIso: "2025-12",
    updatedIso: "2025-12-31",
    peopleServed: 740,
    prayerRequestsAnswered: 260,
    familiesReached: 140,
    communityOutreachMoments: 120,
    noteEn: "Includes Christmas outreach and special services.",
    noteTa: "கிறிஸ்துமஸ் அவுட்ரீச் மற்றும் சிறப்பு ஆராதனைகள் இதில் சேர்க்கப்பட்டுள்ளன.",
  },
]

export function getLatestImpactMonth(): ImpactMonth {
  return impactMonths.slice().sort((a, b) => a.monthIso.localeCompare(b.monthIso)).at(-1) ?? impactMonths[0]!
}

export function listImpactMonthsNewestFirst(): ImpactMonth[] {
  return impactMonths.slice().sort((a, b) => b.monthIso.localeCompare(a.monthIso))
}

