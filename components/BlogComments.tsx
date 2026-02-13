"use client"

import { useEffect, useMemo, useState } from "react"

import { csrfHeaders } from "@/lib/csrfClient"

type Comment = {
  id: string
  postSlug: string
  name: string
  message: string
  createdAtIso: string
}

function formatDate(iso: string) {
  const date = new Date(iso)
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "2-digit" }).format(date)
}

export default function BlogComments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [status, setStatus] = useState<"idle" | "posting" | "error" | "success">("idle")
  const [statusText, setStatusText] = useState("")

  const count = useMemo(() => comments.length, [comments.length])

  useEffect(() => {
    let canceled = false
    const run = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/blog-comments?post=${encodeURIComponent(postSlug)}`)
        const json = (await res.json()) as { ok: boolean; comments?: Comment[]; message?: string }
        if (!canceled && json.ok && Array.isArray(json.comments)) setComments(json.comments)
      } finally {
        if (!canceled) setLoading(false)
      }
    }
    run()
    return () => {
      canceled = true
    }
  }, [postSlug])

  const submit = async () => {
    setStatus("posting")
    setStatusText("")
    try {
      const res = await fetch("/api/blog-comments", {
        method: "POST",
        headers: await csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ postSlug, name, message, website }),
      })
      const json = (await res.json()) as { ok: boolean; comment?: Comment; message?: string }
      if (!res.ok || !json.ok || !json.comment) {
        setStatus("error")
        setStatusText(json.message || "Could not post comment.")
        return
      }
      setComments((v) => [...v, json.comment!])
      setName("")
      setMessage("")
      setStatus("success")
      setStatusText("Comment posted.")
    } catch {
      setStatus("error")
      setStatusText("Network error. Please try again.")
    }
  }

  return (
    <div className="mt-10 border-t border-churchBlue/10 pt-8">
      <div className="flex items-end justify-between gap-4">
        <div className="text-sm font-semibold text-churchBlue">Comments</div>
        <div className="text-xs text-churchBlue/60">{loading ? "Loading..." : `${count} total`}</div>
      </div>

      <div className="mt-4 grid gap-3">
        {comments.map((c) => (
          <div key={c.id} className="rounded-2xl border border-churchBlue/10 bg-white p-5 shadow-[0_10px_30px_rgb(var(--stage-blue)_/_0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-churchBlue">{c.name}</div>
              <div className="text-xs text-churchBlue/60">{formatDate(c.createdAtIso)}</div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-churchBlue/75">{c.message}</p>
          </div>
        ))}

        {!loading && comments.length === 0 ? (
          <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5 text-sm text-churchBlue/70">
            Be the first to comment.
          </div>
        ) : null}
      </div>

      <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
        <div className="text-sm font-semibold text-churchBlue">Leave a comment</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-churchBlue">Name</span>
            <input
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
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
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-churchBlue">Comment</span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-xl border border-churchBlue/15 bg-white px-4 py-3 text-sm text-churchBlue focus-ring"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your comment..."
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
          <button type="button" className="btn btn-md btn-primary" onClick={submit} disabled={status === "posting"}>
            {status === "posting" ? "Posting..." : "Post comment"}
          </button>
        </div>
      </div>
    </div>
  )
}
