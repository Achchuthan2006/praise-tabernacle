"use client"

import type { ReactNode } from "react"

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
        {en}
      </span>
      <span data-lang="ta" lang="ta" className={taClassName ?? "font-tamil"}>
        {ta}
      </span>
    </>
  )
}
