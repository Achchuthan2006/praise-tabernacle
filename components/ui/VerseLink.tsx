import type { ComponentPropsWithoutRef } from "react"

export function bibleGatewayPassageHref(query: string, version = "NKJV") {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(query)}&version=${encodeURIComponent(version)}`
}

export default function VerseLink({
  query,
  version,
  label,
  href,
  tamil,
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> & {
  query: string
  version?: string
  label: string
  href?: string
  tamil?: boolean
}) {
  return (
    <a
      href={href ?? bibleGatewayPassageHref(query, version)}
      target="_blank"
      rel="noreferrer"
      className={[
        "focus-ring inline-flex items-center rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-medium text-churchBlue/80 transition-colors hover:bg-churchBlueSoft",
        tamil ? "font-tamil" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {label}
    </a>
  )
}
