"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import type { Event, EventAgeGroup, EventCategory, EventLanguage } from "@/lib/events"
import {
  computeSpotsLabel,
  getEventImageSrc,
  isOneOffEvent,
  isPastEvent,
  nextOccurrenceLocal,
  timeZone,
  toLocalDate,
} from "@/lib/events"
import { normalizeBullets } from "@/lib/text"

type ViewMode = "upcoming" | "recurring" | "past"

const categoryLabels: Record<EventCategory, { en: string; ta: string }> = {
  prayer: { en: "Prayer", ta: "ஜெபம்" },
  youth: { en: "Youth", ta: "இளைஞர்" },
  family: { en: "Family", ta: "குடும்பம்" },
  community: { en: "Community", ta: "சமூக" },
  teaching: { en: "Teaching", ta: "போதனை" },
  holiday: { en: "Holiday", ta: "திருநாள்" },
}

const ageLabels: Record<EventAgeGroup, { en: string; ta: string }> = {
  "all-ages": { en: "All ages", ta: "அனைத்து வயதினருக்கும்" },
  kids: { en: "Kids", ta: "குழந்தைகள்" },
  youth: { en: "Youth", ta: "இளைஞர்கள்" },
  adults: { en: "Adults", ta: "வயது வந்தவர்கள்" },
  women: { en: "Women", ta: "பெண்கள்" },
  men: { en: "Men", ta: "ஆண்கள்" },
}

const languageLabels: Record<EventLanguage, { en: string; ta: string }> = {
  en: { en: "English", ta: "ஆங்கிலம்" },
  ta: { en: "Tamil", ta: "தமிழ்" },
  bilingual: { en: "Tamil + English", ta: "தமிழ் + ஆங்கிலம்" },
}

function labelFor(map: Record<string, { en: string; ta: string }>, key: string, lang: "en" | "ta") {
  const value = map[key]
  return value ? value[lang] : key
}

function uniq(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))
}

function delayForIndex(idx: number): 0 | 1 | 2 | 3 {
  return (idx % 4) as 0 | 1 | 2 | 3
}

function matchesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "2-digit" }).format(date)
}

function formatTime(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(date)
}

function eventWhen(event: Event, locale: string, lang: "en" | "ta") {
  if (event.startAtLocal) {
    const start = toLocalDate(event.startAtLocal)
    return `${formatDate(start, locale)} • ${formatTime(start, locale)}`
  }
  if (event.recurrence) {
    const next = nextOccurrenceLocal(event.recurrence)
    return lang === "ta"
      ? `அடுத்து: ${formatDate(next, locale)} • ${formatTime(next, locale)}`
      : `Next: ${formatDate(next, locale)} • ${formatTime(next, locale)}`
  }
  return lang === "ta" ? "அட்டவணை" : "Schedule"
}

export default function EventsArchive({ events }: { events: Event[] }) {
  const { language: uiLang } = useLanguage()
  const locale = uiLang === "ta" ? "ta-IN" : "en-CA"
  const now = useMemo(() => new Date(), [])
  const [view, setView] = useState<ViewMode>("upcoming")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>("")
  const [eventLanguage, setEventLanguage] = useState<string>("")
  const [ageGroup, setAgeGroup] = useState<string>("")

  const baseEvents = useMemo(() => {
    return events.filter((event) => {
      if (view === "past") return isOneOffEvent(event) && isPastEvent(event, now)
      if (view === "recurring") return Boolean(event.recurrence)
      return Boolean(event.recurrence) || (isOneOffEvent(event) && !isPastEvent(event, now))
    })
  }, [events, now, view])

  const categories = useMemo(() => uniq(baseEvents.map((e) => e.category)), [baseEvents])
  const eventLanguages = useMemo(() => uniq(baseEvents.map((e) => e.language)), [baseEvents])
  const ages = useMemo(() => uniq(baseEvents.map((e) => e.ageGroup)), [baseEvents])

  const filtered = useMemo(() => {
    const q = query.trim()
    return baseEvents
      .filter((event) => {
        if (category && event.category !== category) return false
        if (eventLanguage && event.language !== eventLanguage) return false
        if (ageGroup && event.ageGroup !== ageGroup) return false
        if (!q) return true

        const blob = [
          event.title,
          event.description,
          categoryLabels[event.category].en,
          categoryLabels[event.category].ta,
          languageLabels[event.language].en,
          languageLabels[event.language].ta,
          ageLabels[event.ageGroup].en,
          ageLabels[event.ageGroup].ta,
        ].join(" ")
        return matchesQuery(blob, q)
      })
      .slice()
      .sort((a, b) => {
        const aKey = a.startAtLocal
          ? toLocalDate(a.startAtLocal).getTime()
          : a.recurrence
            ? nextOccurrenceLocal(a.recurrence).getTime()
            : 0
        const bKey = b.startAtLocal
          ? toLocalDate(b.startAtLocal).getTime()
          : b.recurrence
            ? nextOccurrenceLocal(b.recurrence).getTime()
            : 0
        return view === "past" ? bKey - aKey : aKey - bKey
      })
  }, [ageGroup, baseEvents, category, eventLanguage, query, view])

  const recurringGroups = useMemo(() => {
    if (view !== "recurring") return null
    const weekly = filtered.filter((e) => e.recurrence?.kind === "weekly")
    const monthly = filtered.filter(
      (e) => e.recurrence?.kind === "monthly-day" || e.recurrence?.kind === "monthly-nth-dow",
    )
    const annual = filtered.filter((e) => e.recurrence?.kind === "yearly")
    return [
      { titleEn: "Weekly", titleTa: "வாராந்திர", items: weekly },
      { titleEn: "Monthly", titleTa: "மாதாந்திர", items: monthly },
      { titleEn: "Annual", titleTa: "ஆண்டாந்திர", items: annual },
    ].filter((g) => g.items.length > 0)
  }, [filtered, view])

  const hasFilters = Boolean(query.trim() || category || eventLanguage || ageGroup)
  const clearFilters = () => {
    setQuery("")
    setCategory("")
    setEventLanguage("")
    setAgeGroup("")
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="section-kicker">{uiLang === "ta" ? "நிகழ்வுகள்" : "Events"}</div>
          <h2 className="section-heading">{uiLang === "ta" ? "நிகழ்வுகள் & கூடுகைகள்" : "Events & Gatherings"}</h2>
          <p className="mt-1 text-sm text-churchBlue/70">
            {uiLang === "ta"
              ? "ஜெபம், இளைஞர், குடும்பம், சமூக, மொழி மற்றும் வயது ஆகியவற்றால் வடிகட்டுங்கள்."
              : "Filter by prayer, youth, family, community, language, and age groups."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={["btn btn-sm", view === "upcoming" ? "btn-primary" : "btn-secondary"].join(" ")}
            onClick={() => {
              setView("upcoming")
              clearFilters()
            }}
          >
            {uiLang === "ta" ? "வரவிருக்கும்" : "Upcoming"}
          </button>
          <button
            type="button"
            className={["btn btn-sm", view === "recurring" ? "btn-primary" : "btn-secondary"].join(" ")}
            onClick={() => {
              setView("recurring")
              clearFilters()
            }}
          >
            {uiLang === "ta" ? "மீண்டும் நடைபெறும்" : "Recurring"}
          </button>
          <button
            type="button"
            className={["btn btn-sm", view === "past" ? "btn-primary" : "btn-secondary"].join(" ")}
            onClick={() => {
              setView("past")
              clearFilters()
            }}
          >
            {uiLang === "ta" ? "முந்தைய" : "Past"}
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-churchBlue/60">
        {uiLang === "ta"
          ? view === "recurring"
            ? "மீண்டும் நடைபெறும்: வாராந்திர / மாதாந்திர / ஆண்டாந்திர நிகழ்வுகள்."
            : view === "past"
              ? "முந்தைய: முடிந்த ஒரு முறை நிகழ்வுகள்."
              : "வரவிருக்கும்: ஒரு முறை நிகழ்வுகள் + மீண்டும் நடைபெறும் கூடுகைகள்."
          : view === "recurring"
            ? "Recurring: weekly / monthly / annual events."
            : view === "past"
              ? "Past: completed one-time events."
              : "Upcoming: one-time events + recurring gatherings."}
      </p>

      <div className="mt-8 grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <label className="block">
            <div className="float-field">
              <input
                className="float-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={uiLang === "ta" ? "நிகழ்வுகளை தேடுங்கள்…" : "Search events…"}
              />
              <span className={["float-label", uiLang === "ta" ? "font-tamil" : ""].join(" ")}>
                {uiLang === "ta" ? "தேடல்" : "Search"}
              </span>
            </div>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:col-span-6">
          <Filter
            label={uiLang === "ta" ? "வகை" : "Category"}
            value={category}
            onChange={setCategory}
            allLabel={uiLang === "ta" ? "அனைத்தும்" : "All"}
            options={categories.map((c) => ({
              value: c,
              label: labelFor(categoryLabels, c, uiLang),
            }))}
          />
          <Filter
            label={uiLang === "ta" ? "மொழி" : "Language"}
            value={eventLanguage}
            onChange={setEventLanguage}
            allLabel={uiLang === "ta" ? "அனைத்தும்" : "All"}
            options={eventLanguages.map((l) => ({
              value: l,
              label: labelFor(languageLabels, l, uiLang),
            }))}
          />
          <Filter
            label={uiLang === "ta" ? "வயது" : "Age"}
            value={ageGroup}
            onChange={setAgeGroup}
            allLabel={uiLang === "ta" ? "அனைத்தும்" : "All"}
            options={ages.map((a) => ({
              value: a,
              label: labelFor(ageLabels, a, uiLang),
            }))}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{uiLang === "ta" ? "முடிவுகள்" : "Results"}</div>
          <div className="mt-1 text-sm font-semibold text-churchBlue">
            {filtered.length} / {baseEvents.length}
          </div>
        </div>
        {hasFilters ? (
          <button type="button" className="btn btn-sm btn-secondary" onClick={clearFilters}>
            {uiLang === "ta" ? "வடிகட்டிகளை நீக்கு" : "Clear filters"}
          </button>
        ) : null}
      </div>

      {view === "recurring" && recurringGroups ? (
        <div className="mt-10 grid gap-10">
          {recurringGroups.map((group) => (
            <div key={group.titleEn}>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                  {uiLang === "ta" ? group.titleTa : group.titleEn}
                </h3>
                <div className="text-xs text-churchBlue/60">
                  {uiLang === "ta" ? `${group.items.length} நிகழ்வுகள்` : `${group.items.length} events`}
                </div>
              </div>
               <div className="card-grid mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((event) => (
                  <EventCardEnhanced key={event.slug} event={event} uiLang={uiLang} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-grid mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCardEnhanced key={event.slug} event={event} uiLang={uiLang} locale={locale} />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-10 card">
          <div className="card-content p-8">
            <div className="text-sm font-semibold text-churchBlue">
              {uiLang === "ta" ? "முடிவுகள் இல்லை" : "No results"}
            </div>
            <p className="mt-2 text-sm text-churchBlue/70">
              {uiLang === "ta"
                ? "வடிகட்டிகளை நீக்கி அல்லது வேறு சொல் தேடுங்கள்."
                : "Try clearing filters or searching a different keyword."}
            </p>
          </div>
        </div>
      ) : null}

      <p className="mt-10 text-xs text-churchBlue/60">
        {uiLang === "ta"
          ? `நேர மண்டலம்: ${timeZone}. சிறப்பு நிகழ்வுகளுக்காக நேரங்கள் மாறலாம் — வருவதற்கு முன் விவரங்களை சரிபார்க்கவும்.`
          : `Timezone: ${timeZone}. Times may change for special events — check details before attending.`}
      </p>
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

function EventCardEnhanced({
  event,
  uiLang,
  locale,
}: {
  event: Event
  uiLang: "en" | "ta"
  locale: string
}) {
  const spots = computeSpotsLabel(event, uiLang)
  const imageSrc = getEventImageSrc(event)
  const isOnline =
    event.location.name.toLowerCase().includes("online") || event.location.name.toLowerCase().includes("livestream")
  const locationText = isOnline
    ? uiLang === "ta"
      ? "ஆன்லைன்"
      : "Online"
    : event.location.name

  return (
    <article className="card card-accent-left" data-accent={event.category}>
      <div className="card-image card-image-fixed">
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            quality={90}
          />
        </div>
      </div>

      <div className="card-content">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
            {categoryLabels[event.category][uiLang]}
          </span>
          <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80">
            {languageLabels[event.language][uiLang]}
          </span>
          <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/70">
            {ageLabels[event.ageGroup][uiLang]}
          </span>
        </div>

        <div className="mt-4 text-xs font-semibold tracking-wide text-churchBlue/60">
          {normalizeBullets(eventWhen(event, locale, uiLang))}
        </div>
        <div className="mt-1 text-xs font-semibold text-churchBlue/60">{locationText}</div>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
          <Link href={`/events/${event.slug}`} className="focus-ring rounded-lg">
            {event.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-churchBlue/75">{event.description}</p>

        {spots ? (
          <div className="mt-4 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
            <div className="text-xs font-semibold text-churchBlue/70">
              {uiLang === "ta" ? "திறன்" : "Capacity"}
            </div>
            <div className="mt-1 text-sm font-semibold text-churchBlue">{spots}</div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-2">
          {event.registrationUrl ? (
            <Link
              href={event.registrationUrl}
              target={event.registrationUrl.startsWith("/") ? undefined : "_blank"}
              rel={event.registrationUrl.startsWith("/") ? undefined : "noreferrer"}
              className="btn btn-sm btn-primary w-full"
            >
              {event.registrationLabel ?? (uiLang === "ta" ? "பதிவு செய்யவும்" : "Register")}
            </Link>
          ) : (
            <Link href={`/events/${event.slug}`} className="btn btn-sm btn-primary w-full">
              {uiLang === "ta" ? "விவரங்களை பார்க்கவும்" : "View details"}
            </Link>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={`/events/${event.slug}`} className="btn btn-sm btn-secondary w-full">
              {uiLang === "ta" ? "விவரங்கள்" : "Details"}
            </Link>
            <a
              href={`/events/${event.slug}/calendar`}
              className="btn btn-sm btn-secondary w-full"
              title={uiLang === "ta" ? "iCal (.ics) பதிவிறக்கவும்" : "Download iCal (.ics)"}
            >
              {uiLang === "ta" ? "நாட்காட்டியில் சேர்" : "Add to calendar"}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
