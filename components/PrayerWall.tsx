"use client"

import { useEffect, useState } from "react"

import { csrfHeaders } from "@/lib/csrfClient"

type PrayerPost = {
  id: string
  name: string
  request: string
  createdAtIso: string
  kind?: "request" | "testimony"
  prayedCount?: number
}

function formatDate(iso: string) {
  const date = new Date(iso)
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "2-digit" }).format(date)
}

export default function PrayerWall() {
  const [posts, setPosts] = useState<PrayerPost[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [request, setRequest] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [status, setStatus] = useState<"idle" | "posting" | "error" | "success">("idle")
  const [statusText, setStatusText] = useState("")

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/prayer-wall")
      const json = (await res.json()) as { ok: boolean; posts?: PrayerPost[] }
      if (json.ok && Array.isArray(json.posts)) setPosts(json.posts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const canPrayKey = (id: string) => `pt_prayed:${id}`
  const hasPrayed = (id: string) => {
    if (typeof window === "undefined") return false
    try {
      return window.localStorage.getItem(canPrayKey(id)) === "1"
    } catch {
      return false
    }
  }

  const markPrayed = (id: string) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(canPrayKey(id), "1")
    } catch {
      // ignore
    }
  }

  const prayFor = async (id: string) => {
    if (hasPrayed(id)) return
    markPrayed(id)
    setPosts((cur) =>
      cur.map((p) => (p.id === id ? { ...p, prayedCount: (p.prayedCount ?? 0) + 1 } : p)),
    )

    try {
      const res = await fetch(`/api/prayer-wall/${encodeURIComponent(id)}/pray`, {
        method: "POST",
        headers: await csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({}),
      })
      const json = (await res.json()) as { ok: boolean; prayedCount?: number }
      if (res.ok && json.ok && typeof json.prayedCount === "number") {
        setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, prayedCount: json.prayedCount } : p)))
      }
    } catch {
      // If it fails, keep the optimistic count but allow the user to try later.
    }
  }

  const submit = async () => {
    setStatus("posting")
    setStatusText("")
    try {
      const res = await fetch("/api/prayer-wall", {
        method: "POST",
        headers: await csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ name, request, website }),
      })
      const json = (await res.json()) as { ok: boolean; message?: string; post?: { approved: boolean } }
      if (!res.ok || !json.ok) {
        setStatus("error")
        setStatusText(json.message || "Could not submit.")
        return
      }
      setName("")
      setRequest("")
      setStatus("success")
      setStatusText("Thank you. Your request was submitted for approval.")
    } catch {
      setStatus("error")
      setStatusText("Network error. Please try again.")
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
            <div className="section-kicker">Prayer</div>
            <h2 className="section-heading mt-2">Prayer Wall</h2>
            <p className="mt-3 text-sm text-churchBlue/70 sm:text-base">
              Public prayer requests shared by our community. Please avoid private details. Submissions are reviewed before posting.
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="text-xs text-churchBlue/60">{loading ? "Loading..." : `${posts.length} requests`}</div>
              <button type="button" className="btn btn-sm btn-secondary" onClick={refresh} disabled={loading} aria-busy={loading}>
                {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
                Refresh
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              {posts.map((p) => (
                <div key={p.id} className="rounded-2xl border border-churchBlue/10 bg-white p-6 shadow-[0_10px_30px_rgb(var(--stage-blue)_/_0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-churchBlue">{p.name}</div>
                      {p.kind === "testimony" ? (
                        <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-2.5 py-1 text-[11px] font-semibold text-churchBlue/75">
                          Testimony
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs text-churchBlue/60">{formatDate(p.createdAtIso)}</div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-churchBlue/75">{p.request}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-churchBlue/60">
                      {(p.prayedCount ?? 0) === 0 ? "Be the first to pray" : `${p.prayedCount ?? 0} prayed`}
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => prayFor(p.id)}
                      disabled={hasPrayed(p.id)}
                      aria-disabled={hasPrayed(p.id)}
                    >
                      {hasPrayed(p.id) ? "Prayed" : "Prayed for you"}
                    </button>
                  </div>
                </div>
              ))}

              {!loading && posts.length === 0 ? (
                <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6 text-sm text-churchBlue/70">
                  No public requests yet. You can submit one using the form.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow">
            <div className="text-sm font-semibold text-churchBlue">Submit a request</div>
            <div className="mt-4 grid gap-3">
              <label className="block">
                <span className="text-sm font-medium text-churchBlue">Name (optional)</span>
                <input
                  className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous"
                  autoComplete="name"
                  enterKeyHint="next"
                  disabled={status === "posting"}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-churchBlue">Website</span>
                <input
                  className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Leave blank"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-churchBlue">Prayer request</span>
                <textarea
                  className="mt-2 min-h-40 w-full rounded-xl border border-churchBlue/15 bg-white px-4 py-3 text-sm text-churchBlue focus-ring"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="How can we pray for you?"
                  enterKeyHint="send"
                  disabled={status === "posting"}
                />
              </label>
            </div>

            {statusText ? (
              <div
                className={[
                  "mt-4 rounded-2xl border p-4 text-sm",
                  status === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-churchBlue/10 bg-white text-churchBlue/80",
                ].join(" ")}
              >
                {statusText}
              </div>
            ) : null}

            <div className="mt-5">
              <button
                type="button"
                className="btn btn-md btn-primary w-full"
                onClick={submit}
                disabled={status === "posting"}
                aria-busy={status === "posting"}
              >
                {status === "posting" ? <span className="btn-spinner" aria-hidden="true" /> : null}
                {status === "posting" ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
