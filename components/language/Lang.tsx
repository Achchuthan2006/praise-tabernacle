"use client"

import type { ReactNode } from "react"
import { fixMojibakeText } from "@/lib/text"

function normalizeNode(value: ReactNode): ReactNode {
  if (typeof value === "string") return fixMojibakeText(value)
  if (Array.isArray(value)) return value.map((v) => normalizeNode(v))
  return value
}

export default function Lang({
  en,
  ta,
  enClassName,
  taClassName,
}: {
  en: ReactNode
  ta: ReactNode
  enClassName?: string
  taClassName?: string
}) {
  return (
    <>
      <span data-lang="en" lang="en" className={enClassName}>
        {normalizeNode(en)}
      </span>
      <span data-lang="ta" lang="ta" className={taClassName ?? "font-tamil"}>
        {normalizeNode(ta)}
      </span>
    </>
  )
}
