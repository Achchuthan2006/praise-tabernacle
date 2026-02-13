"use client"

import { useMemo, useState } from "react"

import type { GivingCategory } from "@/lib/giving"
import { siteConfig } from "@/lib/site"

function withQueryParams(href: string, params: Record<string, string>) {
  const raw = String(href ?? "").trim()
  if (!raw) return ""

  try {
    const u = new URL(raw, siteConfig.siteUrl)
    for (const [k, v] of Object.entries(params)) {
      if (!v) continue
      u.searchParams.set(k, v)
    }
    return raw.startsWith("http://") || raw.startsWith("https://") ? u.toString() : `${u.pathname}${u.search}${u.hash}`
  } catch {
    return raw
  }
}

function isHttpHref(href: string) {
  return /^https?:\/\//i.test(String(href ?? "").trim())
}

type Frequency = "once" | "weekly" | "monthly"

export default function OnlineDonationForm({
  onlineGivingUrl,
  recurringGivingUrl,
  categories,
}: {
  onlineGivingUrl: string
  recurringGivingUrl: string
  categories: GivingCategory[]
}) {
  const defaultCategoryId = categories[0]?.id ?? "tithes"
  const [categoryId, setCategoryId] = useState<string>(defaultCategoryId)
  const [frequency, setFrequency] = useState<Frequency>("once")
  const [presetAmount, setPresetAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [note, setNote] = useState<string>("")

  const amount = useMemo(() => {
    const raw = customAmount.trim()
    if (raw) {
      const n = Number(raw)
      if (!Number.isFinite(n)) return null
      if (n <= 0) return null
      return Math.round(n * 100) / 100
    }
    return presetAmount
  }, [customAmount, presetAmount])

  const resolvedUrl = useMemo(() => {
    const base = frequency === "once" ? onlineGivingUrl : recurringGivingUrl || onlineGivingUrl
    return withQueryParams(base, {
      category: categoryId,
      amount: amount ? String(amount) : "",
      frequency,
      note,
    })
  }, [amount, categoryId, frequency, note, onlineGivingUrl, recurringGivingUrl])

  const canContinue = Boolean(resolvedUrl && isHttpHref(resolvedUrl) && amount)

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        if (!canContinue) return
        window.open(resolvedUrl, "_blank", "noopener,noreferrer")
      }}
    >
      <fieldset className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 sm:p-5">
        <legend className="px-2 text-xs font-semibold tracking-wide text-churchBlue/70">Gift details</legend>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="text-xs font-semibold text-churchBlue/70">Category</div>
            <select
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm font-semibold text-churchBlue focus-ring"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titleEn}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="text-xs font-semibold text-churchBlue/70">Frequency</div>
            <select
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm font-semibold text-churchBlue focus-ring"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
            >
              <option value="once">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {frequency !== "once" && !recurringGivingUrl ? (
              <div className="mt-2 text-xs text-churchBlue/60">
                Recurring link not set yet — using the main giving link for now.
              </div>
            ) : null}
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-churchBlue/10 bg-white p-4 sm:p-5">
        <legend className="px-2 text-xs font-semibold tracking-wide text-churchBlue/70">Amount</legend>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[50, 100, 250, 500].map((v) => {
            const active = !customAmount.trim() && presetAmount === v
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setCustomAmount("")
                  setPresetAmount(v)
                }}
                className={[
                  "min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-churchGold bg-churchGold text-churchBlue"
                    : "border-churchBlue/15 bg-white text-churchBlue hover:bg-churchBlueSoft",
                ].join(" ")}
              >
                ${v}
              </button>
            )
          })}
        </div>

        <label className="mt-4 block">
          <div className="text-xs font-semibold text-churchBlue/70">Custom amount (CAD)</div>
          <input
            inputMode="decimal"
            placeholder="Enter amount"
            className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm font-semibold text-churchBlue placeholder:text-churchBlue/45 focus-ring"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value)
              setPresetAmount(null)
            }}
          />
          {!amount && customAmount.trim() ? (
            <div className="mt-2 text-xs font-semibold text-burgundy">Enter a valid amount.</div>
          ) : null}
        </label>
      </fieldset>

      <fieldset className="rounded-2xl border border-churchBlue/10 bg-white p-4 sm:p-5">
        <legend className="px-2 text-xs font-semibold tracking-wide text-churchBlue/70">Optional note</legend>
        <textarea
          className="mt-3 min-h-[96px] w-full rounded-xl border border-churchBlue/15 bg-white px-3 py-3 text-sm text-churchBlue placeholder:text-churchBlue/45 focus-ring"
          placeholder="Example: for missions, building fund, or a special project"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-semibold text-churchBlue/60">
          {onlineGivingUrl ? (
            <>You’ll continue to a secure giving page to complete payment.</>
          ) : (
            <>Online giving is not configured yet.</>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <a href="/give" className="btn btn-sm btn-secondary-soft">
            Back
          </a>
          <button type="submit" className="btn btn-sm btn-primary" disabled={!canContinue}>
            Continue to secure giving
          </button>
        </div>
      </div>

      {resolvedUrl && isHttpHref(resolvedUrl) ? (
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 text-xs text-churchBlue/70">
          <div className="font-semibold text-churchBlue/80">Preview link</div>
          <a href={resolvedUrl} target="_blank" rel="noreferrer" className="mt-1 block break-all underline underline-offset-2">
            {resolvedUrl}
          </a>
        </div>
      ) : null}
    </form>
  )
}

