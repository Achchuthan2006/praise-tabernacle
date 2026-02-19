"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { formatIsoDate } from "@/lib/dates"
import type { Sermon, SermonSeries } from "@/lib/sermons"

type GroupMode = "series" | "none"
type SortMode = "relevance" | "newest" | "oldest" | "title-az"

function uniq(values: Array<string | undefined>) {
  const set = new Set(values.filter(Boolean) as string[])
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

function delayForIndex(idx: number): 0 | 1 | 2 | 3 {
  return (idx % 4) as 0 | 1 | 2 | 3
}

function matchesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

function queryTerms(query: string) {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/g)
    .filter(Boolean)
}

function scoreText(text: string, terms: string[]) {
  const hay = text.toLowerCase()
  let score = 0
  for (const t of terms) {
    if (hay.includes(t)) score += 1
  }
  return score
}

function formatDate(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "short", day: "2-digit" })
}

export default function SermonArchive({
  sermons,
  series,
  initialFilters,
}: {
  sermons: Sermon[]
  series: SermonSeries[]
  initialFilters?: {
    seriesId?: string
    topic?: string
    speaker?: string
    language?: string
    query?: string
  }
}) {
  const [query, setQuery] = useState(initialFilters?.query ?? "")
  const [groupMode, setGroupMode] = useState<GroupMode>("series")
  const [sortMode, setSortMode] = useState<SortMode>("newest")
  const [selectedSeries, setSelectedSeries] = useState<string>(initialFilters?.seriesId ?? "")
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>(initialFilters?.speaker ?? "")
  const [selectedTopic, setSelectedTopic] = useState<string>(initialFilters?.topic ?? "")
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialFilters?.language ?? "")
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")

  const seriesById = useMemo(() => new Map(series.map((s) => [s.id, s])), [series])

  const topics = useMemo(() => uniq(sermons.flatMap((s) => s.topics ?? [])), [sermons])
  const speakers = useMemo(() => uniq(sermons.map((s) => s.speaker)), [sermons])
  const seriesIds = useMemo(() => uniq(sermons.map((s) => s.seriesId)), [sermons])

  const filtered = useMemo(() => {
    const q = query.trim()
    const terms = queryTerms(q)
    return sermons
      .filter((sermon) => {
        if (selectedSeries && sermon.seriesId !== selectedSeries) return false
        if (selectedSpeaker && sermon.speaker !== selectedSpeaker) return false
        if (selectedLanguage && sermon.language !== selectedLanguage) return false
        if (selectedTopic && !(sermon.topics ?? []).includes(selectedTopic)) return false
        if (fromDate && sermon.dateIso < fromDate) return false
        if (toDate && sermon.dateIso > toDate) return false
        if (!q) return true

        const seriesTitle = sermon.seriesId ? seriesById.get(sermon.seriesId)?.title ?? "" : ""
        const blob = [
          sermon.title,
          sermon.speaker ?? "",
          sermon.dateIso,
          seriesTitle,
          ...(sermon.topics ?? []),
          ...(sermon.scriptures ?? []),
        ].join(" ")
        return matchesQuery(blob, q)
      })
      .slice()
      .sort((a, b) => {
        if (sortMode === "title-az") {
          const titleCmp = a.title.localeCompare(b.title)
          if (titleCmp !== 0) return titleCmp
          return b.dateIso.localeCompare(a.dateIso)
        }

        if (sortMode === "relevance" && q) {
          const aSeriesTitle = a.seriesId ? seriesById.get(a.seriesId)?.title ?? "" : ""
          const bSeriesTitle = b.seriesId ? seriesById.get(b.seriesId)?.title ?? "" : ""

          const aBlob = [
            a.title,
            a.speaker ?? "",
            a.dateIso,
            aSeriesTitle,
            ...(a.topics ?? []),
            ...(a.scriptures ?? []),
          ].join(" ")
          const bBlob = [
            b.title,
            b.speaker ?? "",
            b.dateIso,
            bSeriesTitle,
            ...(b.topics ?? []),
            ...(b.scriptures ?? []),
          ].join(" ")

          const aScore =
            scoreText(a.title, terms) * 6 +
            scoreText(aSeriesTitle, terms) * 3 +
            scoreText(a.speaker ?? "", terms) * 2 +
            scoreText(aBlob, terms)
          const bScore =
            scoreText(b.title, terms) * 6 +
            scoreText(bSeriesTitle, terms) * 3 +
            scoreText(b.speaker ?? "", terms) * 2 +
            scoreText(bBlob, terms)

          if (bScore !== aScore) return bScore - aScore
          return b.dateIso.localeCompare(a.dateIso)
        }

        return sortMode === "oldest" ? a.dateIso.localeCompare(b.dateIso) : b.dateIso.localeCompare(a.dateIso)
      })
  }, [
    fromDate,
    query,
    sermons,
    selectedLanguage,
    selectedSeries,
    selectedSpeaker,
    selectedTopic,
    seriesById,
    sortMode,
    toDate,
  ])

  const grouped = useMemo(() => {
    if (groupMode === "none") return []
    const map = new Map<string, Sermon[]>()
    for (const sermon of filtered) {
      const key = sermon.seriesId ?? "standalone"
      const list = map.get(key) ?? []
      list.push(sermon)
      map.set(key, list)
    }
    const groups = Array.from(map.entries()).map(([key, items]) => ({
      key,
      title: key === "standalone" ? "Standalone sermons" : seriesById.get(key)?.title ?? "Series",
      items,
    }))
    groups.sort((a, b) => {
      const ad = a.items[0]?.dateIso ?? ""
      const bd = b.items[0]?.dateIso ?? ""
      return bd.localeCompare(ad)
    })
    return groups
  }, [filtered, groupMode, seriesById])

  return (
    <section className="bg-white" id="library">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-kicker">Archive</div>
            <h2 className="section-heading">Sermon Archive</h2>
            <p className="mt-1 text-sm text-churchBlue/70">
              Search by date, topic, Scripture, speaker, or series.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={["btn btn-sm", groupMode === "series" ? "btn-primary" : "btn-secondary"].join(
                " ",
              )}
              onClick={() => setGroupMode("series")}
            >
              Group by series
            </button>
            <button
              type="button"
              className={["btn btn-sm", groupMode === "none" ? "btn-primary" : "btn-secondary"].join(
                " ",
              )}
              onClick={() => setGroupMode("none")}
            >
              All sermons
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setQuery("")
                setSelectedSeries("")
                setSelectedSpeaker("")
                setSelectedTopic("")
                setSelectedLanguage("")
                setFromDate("")
                setToDate("")
                setSortMode("newest")
              }}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-3 lg:hidden">
          <label className="block">
            <div className="float-field">
              <input
                className="float-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sermons..."
              />
              <span className="float-label">Search</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <Filter
              label="Series"
              value={selectedSeries}
              onChange={setSelectedSeries}
              options={seriesIds.map((id) => ({ value: id, label: seriesById.get(id)?.title ?? id }))}
            />
            <Filter
              label="Topic"
              value={selectedTopic}
              onChange={setSelectedTopic}
              options={topics.map((t) => ({ value: t, label: t }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Filter
              label="Speaker"
              value={selectedSpeaker}
              onChange={setSelectedSpeaker}
              options={speakers.map((s) => ({ value: s, label: s }))}
            />
            <Filter
              label="Language"
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              options={[
                { value: "en", label: "English" },
                { value: "ta", label: "Tamil" },
                { value: "mixed", label: "Tamil + English" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-medium text-churchBlue">From</span>
              <input
                type="date"
                className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-churchBlue">To</span>
              <input
                type="date"
                className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </label>
          </div>

          <Filter
            label="Sort"
            value={sortMode}
            onChange={(v) => setSortMode(v as SortMode)}
            options={[
              { value: "relevance", label: "Relevance" },
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
              { value: "title-az", label: "Title (A-Z)" },
            ]}
          />

          <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Results</div>
            <div className="mt-1 text-sm font-semibold text-churchBlue">
              {filtered.length} sermon{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <div className="mt-8 hidden gap-3 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5">
            <label className="block">
              <div className="float-field">
                <input
                  className="float-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sermons..."
                />
                <span className="float-label">Search</span>
              </div>
            </label>
          </div>

          <div className="grid gap-3 lg:col-span-7 lg:grid-cols-4">
            <Filter
              label="Series"
              value={selectedSeries}
              onChange={setSelectedSeries}
              options={seriesIds.map((id) => ({ value: id, label: seriesById.get(id)?.title ?? id }))}
            />
            <Filter
              label="Speaker"
              value={selectedSpeaker}
              onChange={setSelectedSpeaker}
              options={speakers.map((s) => ({ value: s, label: s }))}
            />
            <Filter
              label="Topic"
              value={selectedTopic}
              onChange={setSelectedTopic}
              options={topics.map((t) => ({ value: t, label: t }))}
            />
            <Filter
              label="Language"
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              options={[
                { value: "en", label: "English" },
                { value: "ta", label: "Tamil" },
                { value: "mixed", label: "Tamil + English" },
              ]}
            />
          </div>
        </div>

        <div className="mt-3 hidden gap-3 lg:grid lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-medium text-churchBlue">From</span>
            <input
              type="date"
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-churchBlue">To</span>
            <input
              type="date"
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <Filter
            label="Sort"
            value={sortMode}
            onChange={(v) => setSortMode(v as SortMode)}
            options={[
              { value: "relevance", label: "Relevance" },
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
              { value: "title-az", label: "Title (A-Z)" },
            ]}
          />
          <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Results</div>
            <div className="mt-1 text-sm font-semibold text-churchBlue">
              {filtered.length} sermon{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="card">
              <div className="card-content p-8">
                <div className="text-sm font-semibold text-churchBlue">No results</div>
                <p className="mt-2 text-sm text-churchBlue/70">
                  Try clearing filters or searching a different keyword.
                </p>
              </div>
            </div>
          ) : groupMode === "series" ? (
            <div className="grid gap-10">
              {grouped.map((group) => (
                <div key={group.key}>
                  {group.key !== "standalone" ? (
                    <div className="grid gap-5 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 md:grid-cols-[220px,1fr] md:items-center">
                      <div className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-white">
                        <div className="aspect-video w-full bg-churchBlueSoft">
                          <Image
                            src={seriesById.get(group.key)?.coverImageSrc ?? "/event-teaching.svg"}
                            alt={group.title}
                            width={1200}
                            height={675}
                            sizes="(max-width: 768px) 100vw, 220px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-end justify-between gap-4">
                          <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                            {group.title}
                          </h3>
                          <div className="text-xs font-semibold text-churchBlue/60">
                            {group.items.length} sermons
                          </div>
                        </div>
                        {seriesById.get(group.key)?.summary ? (
                          <p className="mt-2 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                            {seriesById.get(group.key)?.summary}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                        {group.title}
                      </h3>
                      <div className="text-xs text-churchBlue/60">{group.items.length} sermons</div>
                    </div>
                  )}
                  <div className="card-grid mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((sermon) => (
                      <SermonCard key={sermon.slug} sermon={sermon} seriesById={seriesById} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((sermon) => (
                <SermonCard key={sermon.slug} sermon={sermon} seriesById={seriesById} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-churchBlue">{label}</span>
      <select
        className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function SermonCard({
  sermon,
  seriesById,
}: {
  sermon: Sermon
  seriesById: Map<string, SermonSeries>
}) {
  const seriesTitle = sermon.seriesId ? seriesById.get(sermon.seriesId)?.title : null
  const seriesCoverSrc = sermon.seriesId ? seriesById.get(sermon.seriesId)?.coverImageSrc : null
  const detailHref = sermon.youtubeVideoId ? `/sermons/${sermon.slug}?play=1` : `/sermons/${sermon.slug}`
  const thumbSrc =
    sermon.thumbnailImageSrc ||
    (sermon.youtubeVideoId ? `https://i.ytimg.com/vi/${sermon.youtubeVideoId}/hqdefault.jpg` : "") ||
    seriesCoverSrc ||
    "/event-teaching.svg"
  const hasMedia = Boolean(
    sermon.youtubeVideoId ||
      sermon.platforms?.spotifyEpisodeUrl ||
      sermon.platforms?.applePodcastsUrl ||
      sermon.platforms?.youtubeMusicUrl ||
      sermon.platforms?.mp3Url ||
      sermon.platforms?.mp4Url,
  )

  return (
    <article className="card">
      <div className="card-image video-thumbnail">
        <Link
          href={detailHref}
          className="group block focus-ring"
          aria-label={sermon.youtubeVideoId ? `Play sermon: ${sermon.title}` : `Open sermon: ${sermon.title}`}
        >
          <div className="relative aspect-video w-full bg-churchBlueSoft">
            <Image
              src={thumbSrc}
              alt={sermon.title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full object-cover"
              quality={85}
            />
            {sermon.youtubeVideoId ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-100 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <div className="icon play-button grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-glow backdrop-blur">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 text-churchBlue" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
      <div className="card-content">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
              {formatDate(sermon.dateIso)}
              {seriesTitle ? ` • ${seriesTitle}` : ""}
            </div>
            {sermon.durationMinutes ? (
              <div className="mt-1 text-sm text-churchBlue/70">{sermon.durationMinutes} min</div>
            ) : null}
            <h4 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
              <Link href={detailHref} className="focus-ring rounded-lg">
                {sermon.title}
              </Link>
            </h4>
            {sermon.speaker ? (
              <div className="mt-1 text-sm text-churchBlue/70">{sermon.speaker}</div>
            ) : null}
          </div>

          <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
            {sermon.language === "en"
              ? "EN"
              : sermon.language === "ta"
                ? "TA"
                : "TA + EN"}
          </span>
        </div>

        {sermon.scriptures?.length ? (
          <div className="mt-4 text-sm text-churchBlue/75">
            <span className="font-semibold text-churchBlue">Scripture:</span>{" "}
            {sermon.scriptures.join(", ")}
          </div>
        ) : null}

        {sermon.topics?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {sermon.topics.slice(0, 5).map((topic) => (
              <span
                key={`${sermon.slug}-${topic}`}
                className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
              >
                {topic}
              </span>
            ))}
            {sermon.topics.length > 5 ? (
              <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/70">
                +{sermon.topics.length - 5}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 grid gap-2">
          <Link href={detailHref} className="btn btn-sm btn-primary w-full">
            {sermon.youtubeVideoId ? "Watch on site" : "View sermon"}
          </Link>

          {hasMedia ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {sermon.youtubeVideoId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${sermon.youtubeVideoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary w-full"
                >
                  Watch on YouTube
                </a>
              ) : null}

              {sermon.platforms?.spotifyEpisodeUrl ? (
                <a
                  href={sermon.platforms.spotifyEpisodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary w-full"
                >
                  Listen (Spotify)
                </a>
              ) : null}

              {sermon.platforms?.applePodcastsUrl ? (
                <a
                  href={sermon.platforms.applePodcastsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary w-full"
                >
                  Apple Podcasts
                </a>
              ) : null}

              {sermon.platforms?.youtubeMusicUrl ? (
                <a
                  href={sermon.platforms.youtubeMusicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary w-full"
                >
                  YouTube Music
                </a>
              ) : null}

              {sermon.platforms?.mp3Url ? (
                <a
                  href={sermon.platforms.mp3Url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary w-full"
                >
                  Download MP3
                </a>
              ) : null}

              {sermon.platforms?.mp4Url ? (
                <a
                  href={sermon.platforms.mp4Url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary w-full"
                >
                  Download video
                </a>
              ) : null}
            </div>
          ) : null}

          {sermon.notesPdfHref ? (
            <a
              href={sermon.notesPdfHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-secondary w-full"
            >
              Download notes (PDF)
            </a>
          ) : null}

          {sermon.discussionGuidePdfHref ? (
            <a
              href={sermon.discussionGuidePdfHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-secondary w-full"
            >
              Discussion guide (PDF)
            </a>
          ) : null}

          {sermon.transcriptText || sermon.transcriptHref ? (
            <Link href={`/sermons/${sermon.slug}#transcript`} className="btn btn-sm btn-secondary w-full">
              View transcript
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}
