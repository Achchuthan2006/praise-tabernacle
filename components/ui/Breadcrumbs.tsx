import Link from "next/link"

import Lang from "@/components/language/Lang"

type BreadcrumbItem = {
  href?: string
  labelEn: string
  labelTa?: string
}

export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-sm text-churchBlue/70 ${className}`.trim()}
    >
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1
        const ta = item.labelTa ?? item.labelEn
        const content = <Lang en={item.labelEn} ta={ta} taClassName="font-tamil" />

        return (
          <div key={`${item.labelEn}-${index}`} className="flex items-center gap-2">
            {item.href && !isCurrent ? (
              <Link
                href={item.href}
                className="rounded-lg px-2 py-1 transition-colors hover:bg-churchBlueSoft hover:text-churchBlue focus-ring"
              >
                {content}
              </Link>
            ) : (
              <span
                aria-current={isCurrent ? "page" : undefined}
                className={isCurrent ? "rounded-lg bg-churchBlueSoft px-2 py-1 font-semibold text-churchBlue" : ""}
              >
                {content}
              </span>
            )}

            {!isCurrent ? (
              <span aria-hidden="true" className="text-churchBlue/35">
                /
              </span>
            ) : null}
          </div>
        )
      })}
    </nav>
  )
}
