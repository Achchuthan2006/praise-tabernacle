"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import Reveal from "@/components/ui/Reveal"
import type { GroupAge, GroupLanguage, SmallGroup } from "@/lib/groups"
import { siteConfig } from "@/lib/site"

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function getDayLabel(meetingTimeEn: string) {
  const first = meetingTimeEn.split(" ")[0]?.trim() ?? ""
  return first.replace(/[^A-Za-z]/g, "")
}

function getAreaLabel(group: SmallGroup) {
  if (group.area?.trim()) return group.area.trim()
  const location = group.locationEn.toLowerCase()
  if (location.includes("online")) return "Online"
  if (location.includes("on-site") || location.includes("on site")) return "On-site"
  if (group.nameEn.toLowerCase().includes("mississauga")) return "Mississauga"
  if (location.includes("home group")) return "Home group"
  return "Other"
}

const languageLabel: Record<GroupLanguage, string> = {
  en: "English",
  ta: "Tamil",
  bilingual: "Bilingual",
}

const ageLabel: Record<GroupAge, string> = {
  all: "All ages",
  kids: "Kids",
  youth: "Youth",
  adults: "Adults",
}

export default function SmallGroupFinder({ groups }: { groups: SmallGroup[] }) {
  const [query, setQuery] = useState("")
  const [area, setArea] = useState<string>("")
  const [audience, setAudience] = useState<string>("")
  const [day, setDay] = useState<string>("")
  const [language, setLanguage] = useState<GroupLanguage | "">("")
  const [age, setAge] = useState<GroupAge | "">("")
  const [interest, setInterest] = useState<string>("")

  const areas = useMemo(() => {
    const set = new Set<string>()
    for (const g of groups) set.add(getAreaLabel(g))
    const order = ["On-site", "Mississauga", "Online", "Home group", "Other"]
    const all = Array.from(set).filter(Boolean)
    const ordered = order.filter((v) => set.has(v))
    const rest = all.filter((v) => !order.includes(v)).sort((a, b) => a.localeCompare(b))
    return [...ordered, ...rest]
  }, [groups])

  const days = useMemo(() => {
    const set = new Set<string>()
    for (const g of groups) set.add(getDayLabel(g.meetingTimeEn))
    return Array.from(set).filter(Boolean).sort((a, b) => a.localeCompare(b))
  }, [groups])

  const audiences = useMemo(() => {
    const set = new Set(groups.map((g) => g.audience))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [groups])

  const languages = useMemo(() => {
    const set = new Set<GroupLanguage>()
    for (const g of groups) for (const l of g.languages) set.add(l)
    const order: GroupLanguage[] = ["en", "ta", "bilingual"]
    return order.filter((l) => set.has(l))
  }, [groups])

  const ages = useMemo(() => {
    const set = new Set<GroupAge>()
    for (const g of groups) set.add(g.age)
    const order: GroupAge[] = ["all", "kids", "youth", "adults"]
    return order.filter((a) => set.has(a))
  }, [groups])

  const interests = useMemo(() => {
    const set = new Set<string>()
    for (const g of groups) for (const i of g.interests) set.add(i)
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [groups])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return groups.filter((g) => {
      if (area && getAreaLabel(g) !== area) return false
      if (audience && g.audience !== audience) return false
      if (day && getDayLabel(g.meetingTimeEn) !== day) return false
      if (language && !g.languages.includes(language)) return false
      if (age && g.age !== age) return false
      if (interest && !g.interests.includes(interest)) return false
      if (!q) return true
      const blob = [
        getAreaLabel(g),
        g.nameEn,
        g.nameTa,
        g.descriptionEn,
        g.descriptionTa,
        g.locationEn,
        g.locationTa,
        g.meetingTimeEn,
        g.meetingTimeTa,
        g.contactName,
        g.contactEmail,
        g.languages.map((l) => languageLabel[l]).join(" "),
        ageLabel[g.age],
        g.interests.join(" "),
      ]
        .join(" ")
        .toLowerCase()
      return blob.includes(q)
    })
  }, [age, area, audience, day, groups, interest, language, query])

  return (
    <div>
      <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
        <div className="grid gap-4">
          <label className="block">
            <div className="float-field">
              <input
                className="float-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, location, leader, interests..."
              />
              <span className="float-label">Search</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Where</span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
            >
              <option value="">Any</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Day</span>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
            >
              <option value="">Any</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as GroupLanguage | "")}
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
            >
              <option value="">Any</option>
              {languages.map((l) => (
                <option key={l} value={l}>
                  {languageLabel[l]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Audience</span>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
            >
              <option value="">All</option>
              {audiences.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Age</span>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value as GroupAge | "")}
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
            >
              <option value="">Any</option>
              {ages.map((a) => (
                <option key={a} value={a}>
                  {ageLabel[a]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Interest</span>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
            >
              <option value="">Any</option>
              {interests.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-churchBlue/70">
            {filtered.length} {filtered.length === 1 ? "group" : "groups"} found
          </div>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setQuery("")
              setArea("")
              setAudience("")
              setDay("")
              setLanguage("")
              setAge("")
              setInterest("")
            }}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g, idx) => {
          const areaLabel = getAreaLabel(g)
          const joinMessageEn = `Hi! I'd like to join the small group "${g.nameEn}". When: ${g.meetingTimeEn}. Where: ${g.locationEn}.`
          const contactHref = `/contact?message=${encodeURIComponent(joinMessageEn)}`
          const whatsappHref = siteConfig.whatsapp.phoneE164Digits
            ? `https://wa.me/${siteConfig.whatsapp.phoneE164Digits}?text=${encodeURIComponent(joinMessageEn)}`
            : ""

          return (
            <Reveal key={g.id} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                      {g.audience}
                    </span>
                    <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-medium text-churchBlue/70">
                      {areaLabel}
                    </span>
                  </div>
                  <span className="text-xs text-churchBlue/60">{g.meetingTimeEn}</span>
                </div>

                <h2 className="mt-4 text-lg font-semibold tracking-tight text-churchBlue">{g.nameEn}</h2>
                <p className="mt-1 font-tamil text-sm text-churchBlue/70">{g.nameTa}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-churchBlue/70">
                  <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1">
                    Leader: <span className="font-semibold text-churchBlue">{g.contactName}</span>
                  </span>
                  <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1">
                    {ageLabel[g.age]}
                  </span>
                  {g.languages.map((l) => (
                    <span key={l} className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1">
                      {languageLabel[l]}
                    </span>
                  ))}
                </div>

                {g.interests.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.interests.map((i) => (
                      <span
                        key={i}
                        className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-medium text-churchBlue/75"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                ) : null}

                <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">{g.descriptionEn}</p>
                <p className="mt-3 font-tamil text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  {g.descriptionTa}
                </p>

                <div className="mt-6 text-sm text-churchBlue/70">
                  <div>
                    <span className="font-semibold text-churchBlue">When:</span> {g.meetingTimeEn}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold text-churchBlue">Where:</span> {g.locationEn}
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-2">
                  <Link href={contactHref} className="btn btn-md btn-primary">
                    Request to join
                  </Link>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {whatsappHref ? (
                      <a
                        href={whatsappHref}
                        className="btn btn-md btn-secondary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                    <a
                      href={`mailto:${g.contactEmail}?subject=${encodeURIComponent(`Small Group: ${g.nameEn}`)}`}
                      className="btn btn-md btn-secondary"
                    >
                      Email
                    </a>
                  </div>

                  {areaLabel !== "Online" ? (
                    <Link href="/visit" className="btn btn-md btn-secondary">
                      Plan Your Visit
                    </Link>
                  ) : null}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
