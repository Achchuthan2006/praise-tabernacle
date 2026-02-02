"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"

import LanguageToggle from "@/components/language/LanguageToggle"
import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"
import { t, ui } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/pastor", key: "pastor" as const },
  { href: "/sermons", key: "sermons" as const },
  { href: "/events", key: "events" as const },
  { href: "/ministries", key: "ministries" as const },
  { href: "/give", key: "give" as const },
  { href: "/contact", key: "contact" as const },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()

  const activeHref = useMemo(() => {
    if (!pathname) return "/"
    if (pathname === "/") return "/"
    const match = navItems.find((i) => pathname.startsWith(i.href) && i.href !== "/")
    return match?.href ?? "/"
  }, [pathname])

  return (
    <header className="relative border-b border-white/10 bg-gradient-to-r from-churchBlue to-churchBlueLight text-white">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-ring rounded-lg"
          onClick={() => setOpen(false)}
          aria-label={`${siteConfig.nameEn} — ${siteConfig.nameTa}`}
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 shadow-glow">
            <span className="text-base font-semibold tracking-tight text-white">PT</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">{siteConfig.nameEn}</div>
            <div className="text-xs text-white/80 font-tamil">{siteConfig.nameTa}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1">
            {navItems.map((item) => {
              const isActive = item.href === activeHref
              const primary = t(ui.nav[item.key], language)
              const secondary = t(ui.nav[item.key], language === "en" ? "ta" : "en")
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={isActive}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex flex-col items-center leading-tight">
                    <span className="text-[13px]">{primary}</span>
                    <span
                      className={[
                        "text-[11px] opacity-80",
                        language === "en" ? "font-tamil" : "",
                      ].join(" ")}
                    >
                      {secondary}
                    </span>
                  </span>
                </NavLink>
              )
            })}
          </div>
          <LanguageToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <div className="grid gap-1.5">
              <span
                className={[
                  "h-0.5 w-5 rounded bg-white transition",
                  open ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "h-0.5 w-5 rounded bg-white transition",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "h-0.5 w-5 rounded bg-white transition",
                  open ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </div>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="md:hidden">
          <Container className="pb-5">
            <div className="mt-2 rounded-2xl border border-white/15 bg-white/10 p-2">
              {navItems.map((item) => {
                const isActive = item.href === activeHref
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "focus-ring block rounded-xl px-4 py-3 text-sm transition",
                      isActive
                        ? "bg-white text-churchBlue"
                        : "text-white hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span>{t(ui.nav[item.key], language)}</span>
                      <span
                        className={[
                          "text-white/75",
                          language === "en" ? "font-tamil" : "",
                        ].join(" ")}
                      >
                        {t(ui.nav[item.key], language === "en" ? "ta" : "en")}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}

function NavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string
  active?: boolean
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "focus-ring rounded-full px-3 py-2 text-sm transition-colors",
        active
          ? "bg-white/15 text-white"
          : "text-white/85 hover:text-white hover:bg-white/10",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  )
}
