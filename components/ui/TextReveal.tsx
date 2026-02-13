"use client"

import { useMemo } from "react"

export default function TextReveal({
  text,
  className,
  delayStep = 30,
}: {
  text: string
  className?: string
  delayStep?: number
}) {
  const parts = useMemo(() => text.split(""), [text])

  return (
    <span className={["text-reveal", className ?? ""].join(" ").trim()} aria-label={text}>
      {parts.map((char, idx) => (
        <span
          key={`${char}-${idx}`}
          style={{ animationDelay: `${idx * delayStep}ms` }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
