"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import BrandLogo from "@/components/BrandLogo"
import Lang from "@/components/language/Lang"
import LanguageToggle from "@/components/language/LanguageToggle"
import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"
import { t, ui } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

type NavKey = keyof typeof ui.nav

type NavLinkItem = {
  type: "link"
  href: string
  key: NavKey
}

type NavMenuItem = {
  type: "menu"
  id: "ourChurch" | "ministries" | "getInvolved" | "resources"
  items: Array<NavLinkItem>
}

type NavItem = NavLinkItem | NavMenuItem

const navItems: Array<NavItem> = [
  { type: "link", href: "/", key: "home" },
  {
    type: "menu",
    id: "ourChurch",
    items: [
      { type: "link", href: "/im-new", key: "imNew" },
      { type: "link", href: "/visit", key: "visit" },
      { type: "link", href: "/about", key: "about" },
      { type: "link", href: "/pastor", key: "pastor" },
      { type: "link", href: "/communion", key: "communion" },
    ],
  },
  {
    type: "menu",
    id: "ministries",
    items: [
      { type: "link", href: "/ministries", key: "ministriesAll" },
      { type: "link", href: "/ministries/kids", key: "ministriesKids" },
      { type: "link", href: "/ministries/youth", key: "ministriesYouth" },
      { type: "link", href: "/ministries/prayer-care", key: "ministriesPrayerCare" },
      { type: "link", href: "/ministries/outreach", key: "ministriesOutreach" },
      { type: "link", href: "/ministries/mens", key: "ministriesMen" },
      { type: "link", href: "/ministries/womens", key: "ministriesWomen" },
      { type: "link", href: "/ministries/missions", key: "ministriesMissions" },
      { type: "link", href: "/ministries/membership", key: "ministriesMembership" },
    ],
  },
  {
    type: "menu",
    id: "getInvolved",
    items: [
      { type: "link", href: "/events", key: "events" },
      { type: "link", href: "/calendar", key: "calendar" },
      { type: "link", href: "/bookings", key: "bookings" },
      { type: "link", href: "/prayer", key: "prayer" },
      { type: "link", href: "/groups", key: "groups" },
      { type: "link", href: "/serve", key: "serve" },
      { type: "link", href: "/membership", key: "membership" },
      { type: "link", href: "/missions", key: "missions" },
      { type: "link", href: "/partnership", key: "partnership" },
      { type: "link", href: "/give", key: "give" },
    ],
  },
  { type: "link", href: "/sermons", key: "sermons" },
  {
    type: "menu",
    id: "resources",
    items: [
      { type: "link", href: "/sermons", key: "sermons" },
      { type: "link", href: "/bible-studies", key: "bibleStudies" },
      { type: "link", href: "/blog", key: "blog" },
      { type: "link", href: "/devotionals", key: "devotionals" },
      { type: "link", href: "/bible", key: "bible" },
      { type: "link", href: "/promises", key: "promises" },
      { type: "link", href: "/magazine", key: "magazine" },
      { type: "link", href: "/bookstore", key: "bookstore" },
      { type: "link", href: "/photos", key: "photos" },
    ],
  },
  { type: "link", href: "/give", key: "give" },
  { type: "link", href: "/contact", key: "contact" },
]

type NavPreview = {
  bodyEn: string
  bodyTa: string
  ctaEn?: string
  ctaTa?: string
}

type IconName =
  | "visit"
  | "about"
  | "pastor"
  | "communion"
  | "ministries"
  | "kids"
  | "youth"
  | "care"
  | "outreach"
  | "men"
  | "women"
  | "missions"
  | "membership"
  | "events"
  | "calendar"
  | "prayer"
  | "groups"
  | "serve"
  | "partnership"
  | "give"
  | "watch"
  | "sermons"
  | "contact"
  | "blog"
  | "devotionals"
  | "magazine"
  | "bookstore"
  | "bookings"

type MenuGroup = {
  titleEn: string
  titleTa: string
  items: NavLinkItem[]
}

type QuickLink = {
  href: string
  labelEn: string
  labelTa: string
  icon: IconName
}

type MenuLayout = {
  columns: [MenuGroup[], MenuGroup[]]
  flatItems: NavLinkItem[]
  quickLinks: QuickLink[]
}

function menuIconForHref(href: string): IconName {
  if (href === "/im-new") return "visit"
  if (href === "/visit") return "visit"
  if (href === "/about") return "about"
  if (href === "/pastor") return "pastor"
  if (href === "/communion") return "communion"
  if (href === "/ministries") return "ministries"
  if (href === "/ministries/kids") return "kids"
  if (href === "/ministries/youth") return "youth"
  if (href === "/ministries/prayer-care") return "care"
  if (href === "/ministries/outreach") return "outreach"
  if (href === "/ministries/mens") return "men"
  if (href === "/ministries/womens") return "women"
  if (href === "/ministries/missions") return "missions"
  if (href === "/ministries/membership") return "membership"
  if (href === "/events") return "events"
  if (href === "/calendar") return "calendar"
  if (href === "/prayer") return "prayer"
  if (href === "/groups") return "groups"
  if (href === "/serve") return "serve"
  if (href === "/membership") return "membership"
  if (href === "/missions") return "missions"
  if (href === "/partnership") return "partnership"
  if (href === "/give") return "give"
  if (href === "/watch") return "watch"
  if (href === "/sermons") return "sermons"
  if (href === "/contact") return "contact"
  if (href === "/blog") return "blog"
  if (href === "/devotionals") return "devotionals"
  if (href === "/magazine") return "magazine"
  if (href === "/bookstore") return "bookstore"
  if (href.startsWith("/bookings")) return "bookings"
  return "ministries"
}

function MenuIcon({ name }: { name: IconName }) {
  const cls = "h-4 w-4 text-current"
  switch (name) {
    case "visit":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" fill="currentColor" opacity="0.25" />
        </svg>
      )
    case "about":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 10.7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 7.4h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case "pastor":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "communion":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M8 3h8v2H8V3Z" fill="currentColor" opacity="0.22" />
          <path d="M9 5h6l-1 7a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2L9 5Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 21h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 14v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "ministries":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 8h8M12 16h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 16h8M12 8h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
        </svg>
      )
    case "kids":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M8.5 12.2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15.8 13.2a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.8 21a6.2 6.2 0 0 1 9.8-5.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12.8 21a5.2 5.2 0 0 1 10.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "youth":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 13.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 21a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18.5 3.8v2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
          <path d="M20 5.1h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    case "care":
    case "prayer":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 21s-7-4.4-9-9.5C1.7 7.9 4.3 5 7.7 5c1.6 0 3 .7 4 1.8C12.7 5.7 14.1 5 15.7 5 19.1 5 21.7 7.9 21 11.5 19 16.6 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 8v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.5 11.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "outreach":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9.3 12.1 11 13.8l3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "men":
    case "women":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.8 21a7.2 7.2 0 0 1 14.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "missions":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.3 12h17.4" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
          <path d="M12 3a13 13 0 0 1 0 18" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
          <path d="M12 3a13 13 0 0 0 0 18" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
        </svg>
      )
    case "membership":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M8 3h8v18H8V3Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 7h4M10 11h4M10 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "events":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4.5 7h15v14h-15V7Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 10.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          <path d="M8 14.5h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        </svg>
      )
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 6h14v15H5V6Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 10.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        </svg>
      )
    case "bookings":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 6h14v15H5V6Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 12.2l2.2 2.2L16.7 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "groups":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M8.5 12a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.2 12.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.8 21a6.2 6.2 0 0 1 10.2-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12.8 21a5.2 5.2 0 0 1 10.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "serve":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M7 12.5 10.5 16 17 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
        </svg>
      )
    case "partnership":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M8.5 12.2a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 11.7a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.7 21a6.8 6.8 0 0 1 9.8-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M11.8 21a6.2 6.2 0 0 1 10.5-3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "give":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M7 6.8c0-1.6 1.3-2.8 2.8-2.8h4.4C15.7 4 17 5.2 17 6.8v1.6h.7c1.3 0 2.3 1 2.3 2.3v7c0 1.3-1 2.3-2.3 2.3H6.3C5 22 4 21 4 19.7v-7c0-1.3 1-2.3 2.3-2.3H7V6.8Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 8.4h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
        </svg>
      )
    case "watch":
    case "sermons":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M9.25 8.4v7.2c0 .9.98 1.45 1.75.98l6-3.6a1.15 1.15 0 0 0 0-1.96l-6-3.6c-.77-.47-1.75.08-1.75.98Z" fill="currentColor" opacity="0.3" />
          <path d="M4 6.7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10.6c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6.7Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case "contact":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M4 6.8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10.4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6.8Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5.5 7.7 12 12.2l6.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "blog":
    case "devotionals":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M7.5 4.5h9a2 2 0 0 1 2 2v12.5a1.5 1.5 0 0 1-1.5 1.5H7.5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.7 8h6.6M8.7 11.5h6.6M8.7 15h4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        </svg>
      )
    case "magazine":
    case "bookstore":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M6.5 4.5h10a2 2 0 0 1 2 2v13H8a1.5 1.5 0 0 0-1.5 1.5V4.5Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 19.5H17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
  }
}

function buildMenuLayout(menu: NavMenuItem): MenuLayout {
  const byHref = new Map(menu.items.map((i) => [i.href, i]))
  const pick = (href: string) => byHref.get(href) ?? null
  const group = (titleEn: string, titleTa: string, hrefs: string[]): MenuGroup => ({
    titleEn,
    titleTa,
    items: hrefs.map((h) => pick(h)).filter((v): v is NavLinkItem => Boolean(v)),
  })

  const quickLinks: QuickLink[] = [
    { href: "/watch", labelEn: "Watch", labelTa: "à®ªà®¾à®°à¯à®•à¯à®•", icon: "watch" },
    { href: "/sermons", labelEn: "Sermons", labelTa: "à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯", icon: "sermons" },
    { href: "/prayer", labelEn: "Prayer", labelTa: "à®œà¯†à®ªà®®à¯", icon: "prayer" },
    { href: "/give", labelEn: "Give", labelTa: "à®•à¯Šà®Ÿà¯à®™à¯à®•à®³à¯", icon: "give" },
  ]

  let columns: [MenuGroup[], MenuGroup[]] = [[], []]

  if (menu.id === "ourChurch") {
    columns = [
      [
        group("Start here", "à®¤à¯Šà®Ÿà®•à¯à®•à®®à¯", ["/im-new", "/visit", "/about"]),
      ],
      [
        group("Leadership & worship", "à®¤à®²à¯ˆà®®à¯ˆ & à®†à®°à®¾à®¤à®©à¯ˆ", ["/pastor", "/communion"]),
      ],
    ]
  } else if (menu.id === "ministries") {
    columns = [
      [
        group("Explore", "à®ªà®¾à®°à¯à®•à¯à®•", ["/ministries"]),
        group("Next generation", "à®…à®Ÿà¯à®¤à¯à®¤ à®¤à®²à¯ˆà®®à¯à®±à¯ˆ", ["/ministries/kids", "/ministries/youth"]),
        group("Care & outreach", "à®…à®•à¯à®•à®±à¯ˆ & à®šà¯‡à®µà¯ˆ", ["/ministries/prayer-care", "/ministries/outreach"]),
      ],
      [
        group("Community", "à®šà®®à¯‚à®•à®®à¯", ["/ministries/mens", "/ministries/womens"]),
        group("Missions & growth", "à®®à®¿à®·à®©à¯ & à®µà®³à®°à¯à®šà¯à®šà®¿", ["/ministries/missions", "/ministries/membership"]),
      ],
    ]
  } else if (menu.id === "resources") {
    columns = [
      [
        group("Watch & read", "Watch & read", ["/sermons", "/blog", "/devotionals"]),
        group("Bible tools", "Bible tools", ["/bible-studies", "/bible", "/promises"]),
      ],
      [
        group("Library", "Library", ["/magazine", "/bookstore", "/photos"]),
      ],
    ]
  } else {
    // getInvolved
    columns = [
      [
        group("Connect", "à®‡à®£à¯ˆà®ªà¯à®ªà¯", ["/events", "/calendar", "/groups"]),
        group("Prayer & care", "à®œà¯†à®ªà®®à¯ & à®…à®•à¯à®•à®±à¯ˆ", ["/prayer", "/membership"]),
      ],
      [
        group("Serve", "à®šà¯‡à®µà¯ˆ", ["/serve", "/missions"]),
        group("Support", "à®†à®¤à®°à®µà¯", ["/partnership", "/give"]),
      ],
    ]
  }

  const flatItems = columns.flatMap((col) => col.flatMap((g) => g.items))
  const fallbackItems = menu.items
  const allItems = flatItems.length ? flatItems : fallbackItems

  return { columns, flatItems: allItems, quickLinks }
}

const navPreviews: Record<string, NavPreview> = {
  "/bookings": {
    bodyEn: "Request building rental or meeting room reservations. We'll confirm availability and details.",
    bodyTa: "à®•à®Ÿà¯à®Ÿà®¿à®Ÿ à®µà®¾à®Ÿà®•à¯ˆ à®…à®²à¯à®²à®¤à¯ à®•à¯‚à®Ÿà¯à®Ÿ à®…à®±à¯ˆ à®®à¯à®©à¯à®ªà®¤à®¿à®µà¯ à®•à¯‹à®°à¯à®™à¯à®•à®³à¯. à®•à®¿à®Ÿà¯ˆà®ªà¯à®ªà¯ à®®à®±à¯à®±à¯à®®à¯ à®µà®¿à®µà®°à®™à¯à®•à®³à¯ˆ à®‰à®±à¯à®¤à®¿à®ªà¯à®ªà®Ÿà¯à®¤à¯à®¤ à®ªà®¤à®¿à®²à¯ à®…à®³à®¿à®ªà¯à®ªà¯‹à®®à¯.",
    ctaEn: "Request booking",
    ctaTa: "à®®à¯à®©à¯à®ªà®¤à®¿à®µà¯ à®•à¯‹à®°à¯à®™à¯à®•à®³à¯",
  },
  "/visit": {
    bodyEn: "What to expect, where to park, and how to plan your first Sunday.",
    bodyTa: "à®Žà®©à¯à®© à®Žà®¤à®¿à®°à¯à®ªà®¾à®°à¯à®•à¯à®•à®²à®¾à®®à¯, à®ªà®¾à®°à¯à®•à¯à®•à®¿à®™à¯, à®®à®±à¯à®±à¯à®®à¯ à®®à¯à®¤à®²à¯ à®žà®¾à®¯à®¿à®±à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿ à®‰à®¤à®µà®¿.",
    ctaEn: "Plan your visit",
    ctaTa: "à®µà®°à¯à®•à¯ˆà®¯à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯",
  },
  "/im-new": {
    bodyEn: "A guided first-time visitor journey with virtual tour, FAQs, and next steps.",
    bodyTa: "à®®à¯à®¤à®²à¯ à®®à¯à®±à¯ˆ à®µà®°à¯à®•à¯ˆà®¯à®¾à®³à®°à¯à®•à®³à¯à®•à¯à®•à®¾à®© à®µà®´à®¿à®•à®¾à®Ÿà¯à®Ÿà®¿: à®šà¯à®±à¯à®±à¯à®ªà¯à®ªà®¾à®°à¯à®µà¯ˆ, à®•à¯‡à®³à¯à®µà®¿à®•à®³à¯ & à®ªà®¤à®¿à®²à¯à®•à®³à¯, à®…à®Ÿà¯à®¤à¯à®¤ à®ªà®Ÿà®¿à®•à®³à¯.",
    ctaEn: "I'm New",
    ctaTa: "à®¨à®¾à®©à¯ à®ªà¯à®¤à®¿à®¤à¯",
  },
  "/about": {
    bodyEn: "Who we are, why we exist, and what our church family is like.",
    bodyTa: "à®¨à®¾à®®à¯ à®¯à®¾à®°à¯, à®à®©à¯ à®‡à®°à¯à®•à¯à®•à®¿à®±à¯‹à®®à¯, à®®à®±à¯à®±à¯à®®à¯ à®Žà®™à¯à®•à®³à¯ à®šà®ªà¯ˆ à®•à¯à®Ÿà¯à®®à¯à®ªà®®à¯ à®Žà®ªà¯à®ªà®Ÿà®¿ à®Žà®©à¯à®ªà®¤à¯ˆà®•à¯ à®•à®¾à®£à®²à®¾à®®à¯.",
    ctaEn: "Read about us",
    ctaTa: "à®Žà®™à¯à®•à®³à¯ˆà®ªà¯ à®ªà®±à¯à®±à®¿",
  },
  "/pastor": {
    bodyEn: "Meet our pastor, ministry focus, and how to connect for care and prayer.",
    bodyTa: "à®ªà¯‹à®¤à®•à®°à¯ˆ à®šà®¨à¯à®¤à®¿à®•à¯à®•à®µà¯à®®à¯, à®šà¯‡à®µà¯ˆà®¯à®¿à®©à¯ à®•à®µà®©à®®à¯, à®®à®±à¯à®±à¯à®®à¯ à®…à®•à¯à®•à®±à¯ˆ/à®œà¯†à®ªà®¤à¯à®¤à®¿à®±à¯à®•à¯ à®¤à¯Šà®Ÿà®°à¯à®ªà¯ à®•à¯Šà®³à¯à®³à®µà¯à®®à¯.",
    ctaEn: "Meet the pastor",
    ctaTa: "à®ªà¯‹à®¤à®•à®°à¯ˆ à®šà®¨à¯à®¤à®¿à®•à¯à®•",
  },
  "/communion": {
    bodyEn: "Communion service messages and replays.",
    bodyTa: "à®¤à®¿à®°à¯à®µà®¿à®°à¯à®¨à¯à®¤à¯ à®†à®°à®¾à®¤à®©à¯ˆ à®¤à¯Šà®Ÿà®°à¯à®ªà®¾à®© à®šà¯†à®¯à¯à®¤à®¿à®•à®³à¯ à®®à®±à¯à®±à¯à®®à¯ à®ªà®¤à®¿à®µà¯à®•à®³à¯.",
    ctaEn: "Communion service",
    ctaTa: "à®¤à®¿à®°à¯à®µà®¿à®°à¯à®¨à¯à®¤à¯ à®†à®°à®¾à®¤à®©à¯ˆ",
  },
  "/ministries": {
    bodyEn: "Browse ministries and find a place to belong, serve, and grow.",
    bodyTa: "à®šà¯‡à®µà¯ˆà®•à®³à¯ˆà®ªà¯ à®ªà®¾à®°à¯à®¤à¯à®¤à¯, à®šà¯‡à®°à¯à®¨à¯à®¤à®¿à®Ÿ, à®šà¯‡à®µà¯ˆ à®šà¯†à®¯à¯à®¯, à®µà®³à®° à®‡à®Ÿà®¤à¯à®¤à¯ˆ à®•à®£à¯à®Ÿà¯à®ªà®¿à®Ÿà®¿à®•à¯à®•à®µà¯à®®à¯.",
    ctaEn: "View all ministries",
    ctaTa: "à®…à®©à¯ˆà®¤à¯à®¤à¯ à®šà¯‡à®µà¯ˆà®•à®³à¯",
  },
  "/ministries/kids": {
    bodyEn: "A safe, joyful place for children to learn the Bible and grow.",
    bodyTa: "à®•à¯à®´à®¨à¯à®¤à¯ˆà®•à®³à¯ à®µà¯‡à®¤à®®à¯ à®•à®±à¯à®±à¯à®•à¯ à®•à¯Šà®£à¯à®Ÿà¯ à®µà®³à®° à®ªà®¾à®¤à¯à®•à®¾à®ªà¯à®ªà®¾à®© à®®à®•à®¿à®´à¯à®šà¯à®šà®¿à®¯à®¾à®© à®‡à®Ÿà®®à¯.",
    ctaEn: "Kids ministry",
    ctaTa: "à®•à¯à®´à®¨à¯à®¤à¯ˆà®•à®³à¯ à®šà¯‡à®µà¯ˆ",
  },
  "/ministries/youth": {
    bodyEn: "Youth community for students to grow in faith, friendship, and Scripture.",
    bodyTa: "à®‡à®³à¯ˆà®žà®°à¯à®•à®³à¯ à®µà®¿à®šà¯à®µà®¾à®šà®®à¯, à®¨à®Ÿà¯à®ªà¯, à®µà¯‡à®¤à®¤à¯à®¤à®¿à®²à¯ à®µà®³à®° à®’à®°à¯ à®šà®®à¯‚à®• à®‡à®Ÿà®®à¯.",
    ctaEn: "Youth ministry",
    ctaTa: "à®‡à®³à¯ˆà®žà®°à¯ à®šà¯‡à®µà¯ˆ",
  },
  "/ministries/prayer-care": {
    bodyEn: "Prayer support and gentle care for anyone who needs encouragement.",
    bodyTa: "à®‰à®±à¯à®šà®¾à®•à®®à¯ à®¤à¯‡à®µà¯ˆà®ªà¯à®ªà®Ÿà¯à®ªà®µà®°à¯à®•à®³à¯à®•à¯à®•à¯ à®œà¯†à®ª à®†à®¤à®°à®µà¯à®®à¯ à®…à®•à¯à®•à®±à¯ˆà®¯à¯à®®à¯.",
    ctaEn: "Prayer & care",
    ctaTa: "à®œà¯†à®ªà®®à¯ & à®…à®•à¯à®•à®±à¯ˆ",
  },
  "/ministries/outreach": {
    bodyEn: "Serve Mississauga with practical help, visits, and community support.",
    bodyTa: "à®¨à®Ÿà¯ˆà®®à¯à®±à¯ˆ à®‰à®¤à®µà®¿, à®šà®¨à¯à®¤à®¿à®ªà¯à®ªà¯, à®šà®®à¯‚à®• à®†à®¤à®°à®µà¯à®Ÿà®©à¯ Mississauga-à®µà¯ˆ à®šà¯‡à®µà®¿à®•à¯à®•à®µà¯à®®à¯.",
    ctaEn: "Outreach",
    ctaTa: "à®šà®®à¯‚à®• à®šà¯‡à®µà¯ˆ",
  },
  "/ministries/mens": {
    bodyEn: "Brotherhood, prayer, and practical discipleship for men.",
    bodyTa: "à®†à®£à¯à®•à®³à¯à®•à¯à®•à¯ à®šà®•à¯‹à®¤à®°à®¤à¯à®¤à¯à®µà®®à¯, à®œà¯†à®ªà®®à¯, à®®à®±à¯à®±à¯à®®à¯ à®¨à®Ÿà¯ˆà®®à¯à®±à¯ˆ à®šà¯€à®Ÿà®¤à¯à®¤à¯à®µà®®à¯.",
    ctaEn: "Men's ministry",
    ctaTa: "à®†à®£à¯à®•à®³à¯ à®šà¯‡à®µà¯ˆ",
  },
  "/ministries/womens": {
    bodyEn: "Monthly prayer and encouragement for women.",
    bodyTa: "à®ªà¯†à®£à¯à®•à®³à¯à®•à¯à®•à®¾à®© à®®à®¾à®¤ à®œà¯†à®ªà®®à¯à®®à¯ à®‰à®±à¯à®šà®¾à®•à®®à¯à®®à¯.",
    ctaEn: "Women's prayer",
    ctaTa: "à®ªà¯†à®£à¯à®•à®³à¯ à®œà¯†à®ªà®®à¯",
  },
  "/ministries/missions": {
    bodyEn: "Local and global missions through prayer, giving, and service.",
    bodyTa: "à®œà¯†à®ªà®®à¯, à®•à¯Šà®Ÿà¯ˆ, à®šà¯‡à®µà¯ˆ à®®à¯‚à®²à®®à¯ à®‰à®³à¯à®³à¯‚à®°à¯ à®®à®±à¯à®±à¯à®®à¯ à®‰à®²à®• à®®à®¿à®·à®©à¯.",
    ctaEn: "Missions",
    ctaTa: "à®®à®¿à®·à®©à¯",
  },
  "/ministries/membership": {
    bodyEn: "Learn our story and take a next step into church life through membership.",
    bodyTa: "à®Žà®™à¯à®•à®³à¯ à®•à®¤à¯ˆà®¯à¯ˆ à®…à®±à®¿à®¨à¯à®¤à¯, à®‰à®±à¯à®ªà¯à®ªà®¿à®©à®°à¯ à®®à¯‚à®²à®®à¯ à®šà®ªà¯ˆ à®µà®¾à®´à¯à®•à¯à®•à¯ˆà®¯à®¿à®²à¯ à®…à®Ÿà¯à®¤à¯à®¤ à®ªà®Ÿà®¿ à®Žà®Ÿà¯à®•à¯à®•à®µà¯à®®à¯.",
    ctaEn: "Membership class",
    ctaTa: "à®‰à®±à¯à®ªà¯à®ªà®¿à®©à®°à¯ à®µà®•à¯à®ªà¯à®ªà¯",
  },
  "/events": {
    bodyEn: "Upcoming events, recurring gatherings, and past highlights.",
    bodyTa: "à®µà®°à®µà®¿à®°à¯à®•à¯à®•à¯à®®à¯ à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯, à®¤à¯Šà®Ÿà®°à¯à®®à¯ à®•à¯‚à®Ÿà¯à®•à¯ˆà®•à®³à¯, à®®à®±à¯à®±à¯à®®à¯ à®•à®Ÿà®¨à¯à®¤ à®šà®¿à®±à®ªà¯à®ªà¯à®•à®³à¯.",
    ctaEn: "View events",
    ctaTa: "à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯",
  },
  "/calendar": {
    bodyEn: "Browse events by date and subscribe via iCal/Google Calendar.",
    bodyTa: "à®¤à¯‡à®¤à®¿à®¯à®¿à®©à¯à®ªà®Ÿà®¿ à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯ˆ à®ªà®¾à®°à¯à®•à¯à®•à®µà¯à®®à¯; iCal/Google Calendar à®®à¯‚à®²à®®à¯ subscribe à®šà¯†à®¯à¯à®¯à®µà¯à®®à¯.",
    ctaEn: "Open calendar",
    ctaTa: "à®¨à®¾à®Ÿà¯à®•à®¾à®Ÿà¯à®Ÿà®¿",
  },
  "/groups": {
    bodyEn: "Find a small group to connect, pray, and grow together.",
    bodyTa: "à®‡à®£à¯ˆà®¯, à®œà¯†à®ªà®¿à®•à¯à®•, à®’à®©à¯à®±à®¾à®• à®µà®³à®° à®’à®°à¯ à®šà®¿à®±à¯ à®•à¯à®´à¯à®µà¯ˆ à®•à®£à¯à®Ÿà¯à®ªà®¿à®Ÿà®¿à®•à¯à®•à®µà¯à®®à¯.",
    ctaEn: "Find a group",
    ctaTa: "à®•à¯à®´à¯ à®¤à¯‡à®Ÿà¯",
  },
  "/serve": {
    bodyEn: "Volunteer opportunities: welcome, worship/tech, kids, outreach, and more.",
    bodyTa: "à®¤à®©à¯à®©à®¾à®°à¯à®µ à®µà®¾à®¯à¯à®ªà¯à®ªà¯à®•à®³à¯: à®µà®°à®µà¯‡à®±à¯à®ªà¯, à®†à®°à®¾à®¤à®©à¯ˆ/à®Ÿà¯†à®•à¯, à®•à¯à®´à®¨à¯à®¤à¯ˆà®•à®³à¯, à®šà®®à¯‚à®• à®šà¯‡à®µà¯ˆ, à®®à¯‡à®²à¯à®®à¯ à®ªà®².",
    ctaEn: "Serve",
    ctaTa: "à®šà¯‡à®µà¯ˆ",
  },
  "/membership": {
    bodyEn: "Membership process, what the class covers, and how to get started.",
    bodyTa: "à®‰à®±à¯à®ªà¯à®ªà®¿à®©à®°à¯ à®¨à®Ÿà¯ˆà®®à¯à®±à¯ˆ, à®µà®•à¯à®ªà¯à®ªà¯ à®‰à®³à¯à®³à®Ÿà®•à¯à®•à®®à¯, à®®à®±à¯à®±à¯à®®à¯ à®¤à¯Šà®Ÿà®™à¯à®•à¯à®µà®¤à¯ à®Žà®ªà¯à®ªà®Ÿà®¿.",
    ctaEn: "Membership",
    ctaTa: "à®‰à®±à¯à®ªà¯à®ªà®¿à®©à®°à¯",
  },
  "/missions": {
    bodyEn: "Mission partners and how to pray, give, and serve with us.",
    bodyTa: "à®®à®¿à®·à®©à¯ à®•à¯‚à®Ÿà¯à®Ÿà®¾à®³à®¿à®•à®³à¯ à®®à®±à¯à®±à¯à®®à¯ à®Žà®™à¯à®•à®³à¯à®Ÿà®©à¯ à®œà¯†à®ªà®¿à®•à¯à®•/à®•à¯Šà®Ÿà¯ˆà®•à¯à®•/à®šà¯‡à®µà¯ˆ à®šà¯†à®¯à¯à®¯ à®µà®´à®¿à®•à®³à¯.",
    ctaEn: "Missions",
    ctaTa: "à®®à®¿à®·à®©à¯",
  },
  "/partnership": {
    bodyEn: "Partnership tiers that connect giving to clear ministry outcomes.",
    bodyTa: "à®•à¯Šà®Ÿà¯ˆ à®®à¯‚à®²à®®à¯ à®¤à¯†à®³à®¿à®µà®¾à®© à®šà¯‡à®µà¯ˆ à®µà®¿à®³à¯ˆà®µà¯à®•à®³à¯à®Ÿà®©à¯ à®‡à®£à¯ˆà®•à¯à®•à¯à®®à¯ à®•à¯‚à®Ÿà¯à®Ÿà®¾à®£à¯à®®à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®™à¯à®•à®³à¯.",
    ctaEn: "Partnership",
    ctaTa: "à®•à¯‚à®Ÿà¯à®Ÿà®¾à®£à¯à®®à¯ˆ",
  },
  "/give": {
    bodyEn: "Give as an act of worship and support the mission of the church.",
    bodyTa: "à®†à®°à®¾à®¤à®©à¯ˆà®¯à®¿à®©à¯ à®’à®°à¯ à®ªà®•à¯à®¤à®¿à®¯à®¾à®• à®•à¯Šà®Ÿà¯à®¤à¯à®¤à¯, à®šà®ªà¯ˆà®¯à®¿à®©à¯ à®ªà®£à®¿à®¯à¯ˆ à®†à®¤à®°à®¿à®•à¯à®•à®µà¯à®®à¯.",
    ctaEn: "Give",
    ctaTa: "à®•à¯Šà®Ÿà¯à®™à¯à®•à®³à¯",
  },
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()
  const [hydrated, setHydrated] = useState(false)
  const safePathname = hydrated ? pathname : ""
  // Keep SSR/client markup stable even if the language preference differs at hydration time.
  const searchLabel = "Search"
  const mobileMenuOpenLabel = "Open menu / à®®à¯†à®©à¯à®µà¯ˆ à®¤à®¿à®±"
  const mobileMenuCloseLabel = "Close menu / à®®à¯†à®©à¯à®µà¯ˆ à®®à¯‚à®Ÿà¯"
  const offeringsDialogLabel = "Tithes and offerings / à®¤à®šà®®à®ªà®¾à®•à®®à¯à®®à¯ à®•à®¾à®£à®¿à®•à¯à®•à¯ˆà®•à®³à¯à®®à¯"
  const [openMenu, setOpenMenu] = useState<NavMenuItem["id"] | null>(null)
  const [offeringsOpen, setOfferingsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({})
  const desktopNavRef = useRef<HTMLDivElement | null>(null)
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuUnmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const offeringsUnmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileMenuUnmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollRafRef = useRef<number | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [menuPreviewHref, setMenuPreviewHref] = useState<string>("")
  const [renderedMenuId, setRenderedMenuId] = useState<NavMenuItem["id"] | null>(null)
  const [renderOfferings, setRenderOfferings] = useState(false)
  const [renderMobileMenu, setRenderMobileMenu] = useState(false)
  const [indicator, setIndicator] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  })

  useEffect(() => {
    setHydrated(true)
  }, [])

  const cancelCloseMenu = () => {
    if (closeMenuTimerRef.current) clearTimeout(closeMenuTimerRef.current)
    closeMenuTimerRef.current = null
  }

  const openMenuNow = (id: NavMenuItem["id"]) => {
    cancelCloseMenu()
    setOfferingsOpen(false)
    setOpenMenu(id)
  }

  const closeMenuSoon = () => {
    cancelCloseMenu()
    closeMenuTimerRef.current = setTimeout(() => setOpenMenu(null), 120)
  }

  useEffect(() => {
    setOpenMenu(null)
    setOfferingsOpen(false)
    setOpen(false)
  }, [safePathname])

  useEffect(() => {
    if (!open) setMobileSections({})
  }, [open])

  useEffect(() => {
    if (openMenu) {
      if (menuUnmountTimerRef.current) clearTimeout(menuUnmountTimerRef.current)
      menuUnmountTimerRef.current = null
      setRenderedMenuId(openMenu)
      return
    }

    if (!renderedMenuId) return
    menuUnmountTimerRef.current = setTimeout(() => setRenderedMenuId(null), 160)
    return () => {
      if (menuUnmountTimerRef.current) clearTimeout(menuUnmountTimerRef.current)
      menuUnmountTimerRef.current = null
    }
  }, [openMenu, renderedMenuId])

  useEffect(() => {
    if (offeringsOpen) {
      if (offeringsUnmountTimerRef.current) clearTimeout(offeringsUnmountTimerRef.current)
      offeringsUnmountTimerRef.current = null
      setRenderOfferings(true)
      return
    }

    if (!renderOfferings) return
    offeringsUnmountTimerRef.current = setTimeout(() => setRenderOfferings(false), 160)
    return () => {
      if (offeringsUnmountTimerRef.current) clearTimeout(offeringsUnmountTimerRef.current)
      offeringsUnmountTimerRef.current = null
    }
  }, [offeringsOpen, renderOfferings])

  useEffect(() => {
    if (open) {
      if (mobileMenuUnmountTimerRef.current) clearTimeout(mobileMenuUnmountTimerRef.current)
      mobileMenuUnmountTimerRef.current = null
      setRenderMobileMenu(true)
      return
    }

    if (!renderMobileMenu) return
    mobileMenuUnmountTimerRef.current = setTimeout(() => setRenderMobileMenu(false), 220)
    return () => {
      if (mobileMenuUnmountTimerRef.current) clearTimeout(mobileMenuUnmountTimerRef.current)
      mobileMenuUnmountTimerRef.current = null
    }
  }, [open, renderMobileMenu])

  const activeHrefs = useMemo(() => {
    const hrefs: string[] = []
    for (const item of navItems) {
      if (item.type === "link") hrefs.push(item.href)
      else hrefs.push(...item.items.map((s) => s.href))
    }
    hrefs.push("/care")
    return hrefs
  }, [])

  const normalizedPathname = useMemo(() => {
    if (!safePathname) return safePathname
    const parts = safePathname.split("/").filter(Boolean)
    if (parts[0] === "en" || parts[0] === "ta") {
      const rest = parts.slice(1).join("/")
      return rest ? `/${rest}` : "/"
    }
    return safePathname
  }, [safePathname])

  const activeHref = useMemo(() => {
    if (!normalizedPathname) return "/"
    if (normalizedPathname === "/") return "/"
    const match = activeHrefs.find((href) => href !== "/" && normalizedPathname.startsWith(href))
    return match ?? "/"
  }, [activeHrefs, normalizedPathname])

  useEffect(() => {
    if (!openMenu) return
    const menu = navItems.find((i): i is NavMenuItem => i.type === "menu" && i.id === openMenu)
    const fallback = menu?.items[0]?.href ?? ""
    const preferred = menu?.items.find((i) => i.href === activeHref)?.href ?? fallback
    setMenuPreviewHref(preferred)
  }, [activeHref, openMenu])

  const activeDesktopKey = useMemo(() => {
    if (offeringsOpen) return "offerings"
    for (const item of navItems) {
      if (item.type === "link") {
        if (item.href === activeHref) return item.href
      } else if (item.items.some((s) => s.href === activeHref)) {
        return item.id
      }
    }
    return activeHref
  }, [activeHref])

  const careActive = activeHref === "/care"
  const offeringsActive = activeHref === "/give"

  const updateIndicatorToKey = useCallback((key: string | null) => {
    const host = desktopNavRef.current
    if (!host || !key) {
      setIndicator((v) => ({ ...v, visible: false }))
      return
    }
    const target = host.querySelector<HTMLElement>(`[data-navkey="${CSS.escape(key)}"]`)
    if (!target) {
      setIndicator((v) => ({ ...v, visible: false }))
      return
    }
    const hostRect = host.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    setIndicator({
      left: rect.left - hostRect.left,
      width: rect.width,
      visible: true,
    })
  }, [])

  useEffect(() => {
    if (hoveredKey) updateIndicatorToKey(hoveredKey)
    else updateIndicatorToKey(activeDesktopKey)
  }, [activeDesktopKey, hoveredKey, openMenu])

  useEffect(() => {
    const onResize = () => {
      updateIndicatorToKey(hoveredKey ?? activeDesktopKey)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeDesktopKey, hoveredKey, updateIndicatorToKey])

  useEffect(() => {
    const original = document.documentElement.style.overflow
    if (open) document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = original
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      setOfferingsOpen(false)
      setOpenMenu(null)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (!openMenu) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (desktopNavRef.current?.contains(target)) return
      setOpenMenu(null)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [openMenu])

  useEffect(() => {
    if (!openMenu) {
      setMenuPreviewHref("")
      return
    }
    const menu = navItems.find((i) => i.type === "menu" && i.id === openMenu)
    if (!menu || menu.type !== "menu") return
    const preferred = buildMenuLayout(menu).flatItems[0]?.href ?? menu.items[0]?.href ?? ""
    if (!menuPreviewHref || !menu.items.some((s) => s.href === menuPreviewHref)) {
      setMenuPreviewHref(preferred)
    }
  }, [menuPreviewHref, openMenu])

  useEffect(() => {
    if (typeof window === "undefined") return

    const onScroll = () => {
      if (scrollRafRef.current) return
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null
        const y = window.scrollY || 0
        setScrolled(y > 8)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current)
      scrollRafRef.current = null
    }
  }, [open, openMenu, offeringsOpen])

  return (
    <header
      suppressHydrationWarning
      className={[
        "navbar sticky top-0 z-50",
        scrolled ? "scrolled" : "",
      ].join(" ")}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-ring rounded-lg"
          onClick={() => setOpen(false)}
          aria-label={`${siteConfig.nameEn} - ${siteConfig.nameTa}`}
        >
          <div className="navbar-logo-wrap logo-container nav-logo-glow shrink-0" suppressHydrationWarning>
            <BrandLogo className="h-auto w-full object-contain" priority />
          </div>
          <span className="sr-only">{siteConfig.nameEn}</span>
        </Link>

         <nav
           className={[
             "hidden flex-1 items-center justify-end gap-2 md:flex",
           ].join(" ")}
           aria-label="Primary navigation"
         >
          <div
            className="relative flex items-center gap-1"
            ref={desktopNavRef}
            onMouseLeave={() => {
              setHoveredKey(null)
              setOfferingsOpen(false)
            }}
          >
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute -bottom-1 h-[6px] rounded-full blur-[0.2px]",
                  "bg-[linear-gradient(90deg,rgb(var(--primary-purple)),rgb(var(--primary-teal)))]",
                  "shadow-[0_6px_18px_rgb(var(--accent-purple-light)_/_0.55)]",
                  "transition-[transform,width,opacity] duration-300 ease-out",
                  indicator.visible ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{
                  width: `${Math.max(0, indicator.width - 12)}px`,
                  transform: `translateX(${indicator.left + 6}px)`,
                }}
              />
            {navItems.map((item) => {
              if (item.type === "link") {
                const isActive = item.href === activeHref
                const labelEn = t(ui.nav[item.key], "en")
                const labelTa = t(ui.nav[item.key], "ta")
                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    active={isActive}
                    onClick={() => setOpen(false)}
                    ariaLabel={`${labelEn} / ${labelTa}`}
                    title={`${labelEn} / ${labelTa}`}
                    dataNavKey={item.href}
                    onPointerEnter={() => setHoveredKey(item.href)}
                  >
                    <Lang
                      en={labelEn}
                      ta={labelTa}
                      enClassName="text-[14px] whitespace-nowrap"
                      taClassName="font-tamil text-[14px] whitespace-nowrap"
                    />
                  </NavLink>
                )
              }

              const isActive = item.items.some((s) => s.href === activeHref)
              const labelEn = (() => {
                if (item.id === "ourChurch") return t(ui.navGroups.ourChurch, "en")
                if (item.id === "getInvolved") return t(ui.navGroups.getInvolved, "en")
                if (item.id === "resources") return "Resources"
                return t(ui.nav.ministries, "en")
              })()
              const labelTa = (() => {
                if (item.id === "ourChurch") return t(ui.navGroups.ourChurch, "ta")
                if (item.id === "getInvolved") return t(ui.navGroups.getInvolved, "ta")
                if (item.id === "resources") return "Resources"
                return t(ui.nav.ministries, "ta")
              })()

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => openMenuNow(item.id)}
                  onMouseLeave={closeMenuSoon}
                >
                  <button
                    type="button"
                    className={[
                      "nav-link focus-ring inline-flex whitespace-nowrap items-center gap-1 rounded-full px-3 py-2 text-sm font-medium",
                      isActive || openMenu === item.id ? "active" : "",
                    ].join(" ")}
                    aria-expanded={openMenu === item.id}
                    aria-haspopup="menu"
                    aria-controls={`nav-menu-${item.id}`}
                    data-navkey={item.id}
                    onClick={() => setOpenMenu((cur) => (cur === item.id ? null : item.id))}
                    onFocus={() => openMenuNow(item.id)}
                    onPointerEnter={() => setHoveredKey(item.id)}
                  >
                    <Lang
                      en={labelEn}
                      ta={labelTa}
                      enClassName="text-[14px] whitespace-nowrap"
                      taClassName="font-tamil text-[14px] whitespace-nowrap"
                    />
                    <span
                      className={[
                        "text-[11px] transition-transform duration-200",
                        openMenu === item.id ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {"\u25BE"}
                    </span>
                  </button>

                  {renderedMenuId === item.id ? (
                    <div
                      id={`nav-menu-${item.id}`}
                      className={[
                        // Center the mega-menu so it stays inside the viewport on smaller desktop widths.
                        "absolute left-1/2 mt-3 w-[52rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-churchBlue/10 bg-white shadow-glow",
                        "origin-top transform-gpu transition-[opacity,transform] duration-150 ease-out",
                        openMenu === item.id
                          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none",
                      ].join(" ")}
                      role="menu"
                      aria-label={`${labelEn} / ${labelTa} menu`}
                      onMouseEnter={cancelCloseMenu}
                      onMouseLeave={closeMenuSoon}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr,16rem]">
                        <div className="grid grid-cols-1 gap-1 p-2 sm:grid-cols-2">
                          {buildMenuLayout(item).flatItems.map((sub) => {
                            const subLabelEn = t(ui.nav[sub.key], "en")
                            const subLabelTa = t(ui.nav[sub.key], "ta")
                            const active = sub.href === activeHref
                            const selected = sub.href === menuPreviewHref
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={[
                                  "focus-ring group relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-sm",
                                  "transition-[background-color,color,box-shadow,transform] duration-150 will-change-transform",
                                  active || selected
                                    ? [
                                        "bg-[linear-gradient(90deg,rgba(var(--primary-purple),0.12),rgba(var(--primary-teal),0.10))]",
                                        "text-churchBlue ring-1 ring-stagePurple/20",
                                        "shadow-[0_0_0_1px_rgb(var(--stage-purple)_/_0.18),0_18px_40px_rgb(var(--stage-blue)_/_0.10)]",
                                      ].join(" ")
                                    : [
                                        "text-churchBlue/80",
                                        "hover:bg-[linear-gradient(90deg,rgba(var(--primary-purple),0.08),rgba(var(--primary-teal),0.06))] hover:text-churchBlue hover:ring-1 hover:ring-stagePurple/15 hover:shadow-[0_0_0_1px_rgb(var(--stage-purple)_/_0.14),0_16px_36px_rgb(var(--stage-blue)_/_0.08)]",
                                        "focus-visible:bg-[linear-gradient(90deg,rgba(var(--primary-purple),0.08),rgba(var(--primary-teal),0.06))] focus-visible:text-churchBlue focus-visible:ring-1 focus-visible:ring-stagePurple/15 focus-visible:shadow-[0_0_0_1px_rgb(var(--stage-purple)_/_0.18),0_18px_40px_rgb(var(--stage-blue)_/_0.10)]",
                                        "active:translate-y-px",
                                      ].join(" "),
                                ].join(" ")}
                                role="menuitem"
                                aria-label={`${subLabelEn} / ${subLabelTa}`}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setOpenMenu(null)}
                                onMouseEnter={() => setMenuPreviewHref(sub.href)}
                                onFocus={() => setMenuPreviewHref(sub.href)}
                              >
                                <span
                                  className={[
                                    "absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,rgb(var(--primary-purple)),rgb(var(--primary-teal)))] transition-opacity",
                                    active || selected
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                                  ].join(" ")}
                                  aria-hidden="true"
                                />
                                <span className="flex min-w-0 items-center gap-3">
                                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-churchBlue/10 bg-white/70 text-churchBlue/85">
                                    <MenuIcon name={menuIconForHref(sub.href)} />
                                  </span>
                                  <Lang en={subLabelEn} ta={subLabelTa} taClassName="font-tamil" />
                                </span>
                                <span
                                  className={[
                                    "text-churchBlue/45 transition-[color,transform]",
                                    active
                                      ? "text-churchBlue/80 translate-x-0.5"
                                      : selected
                                        ? "text-churchBlue/70 translate-x-0.5"
                                        : "group-hover:text-churchBlue/70 group-hover:translate-x-0.5 group-focus-visible:text-churchBlue/70 group-focus-visible:translate-x-0.5",
                                  ].join(" ")}
                                  aria-hidden="true"
                                >
                                  {active ? "\u2713" : "\u203A"}
                                </span>
                              </Link>
                            )
                          })}
                        </div>

                        <div className="border-t border-churchBlue/10 bg-churchBlueSoft p-4 lg:border-l lg:border-t-0">
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                            {language === "ta" ? "à®®à¯à®©à¯à®©à¯‹à®Ÿà¯à®Ÿà®®à¯" : "Preview"}
                          </div>
                          <div className="mt-2 text-sm font-semibold text-churchBlue">
                            {(() => {
                              const sub = item.items.find((s) => s.href === menuPreviewHref) ?? item.items[0]
                              if (!sub) return ""
                              return t(ui.nav[sub.key], language)
                            })()}
                          </div>
                          <p
                            className={[
                              "mt-2 text-sm leading-relaxed text-churchBlue/75",
                              language === "ta" ? "font-tamil" : "",
                            ].join(" ")}
                          >
                            {(() => {
                              const preview = navPreviews[menuPreviewHref]
                              if (!preview)
                                return language === "ta" ? "à®¤à¯Šà®Ÿà®°à¯à®¨à¯à®¤à¯ à®ªà®¾à®°à¯à®•à¯à®• à®•à®¿à®³à®¿à®•à¯ à®šà¯†à®¯à¯à®¯à¯à®™à¯à®•à®³à¯." : "Click to explore this page."
                              return language === "ta" ? preview.bodyTa : preview.bodyEn
                            })()}
                          </p>
                          <div className="mt-4 space-y-3">
                            <Link
                              href={menuPreviewHref || item.items[0]?.href || "/"}
                              className="btn btn-sm btn-primary w-full"
                              onClick={() => setOpenMenu(null)}
                            >
                              {(() => {
                                const preview = navPreviews[menuPreviewHref]
                                if (!preview) return language === "ta" ? "à®¤à®¿à®±à®•à¯à®•" : "Open"
                                return language === "ta" ? preview.ctaTa ?? "à®¤à®¿à®±à®•à¯à®•" : preview.ctaEn ?? "Open"
                              })()}
                            </Link>

                            <div className="rounded-xl border border-churchBlue/10 bg-white/70 p-3">
                              <div className="text-[11px] font-semibold tracking-wide text-churchBlue/60">
                                {language === "ta" ? "à®µà®¿à®°à¯ˆà®µà¯ à®‡à®£à¯ˆà®ªà¯à®ªà¯à®•à®³à¯" : "Quick links"}
                              </div>
                              <div className="mt-2 grid gap-2">
                                {buildMenuLayout(item).quickLinks.map((q) => (
                                  <Link
                                    key={`${item.id}:quick:${q.href}`}
                                    href={q.href}
                                    className="focus-ring flex items-center justify-between rounded-xl border border-churchBlue/10 bg-white px-3 py-2 text-sm font-semibold text-churchBlue/85 hover:bg-churchBlueSoft"
                                    onClick={() => setOpenMenu(null)}
                                    aria-label={`${q.labelEn} / ${q.labelTa}`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-churchBlueSoft text-churchBlue/85">
                                        <MenuIcon name={q.icon} />
                                      </span>
                                      <Lang en={q.labelEn} ta={q.labelTa} taClassName="font-tamil" />
                                    </span>
                                    <span className="text-churchBlue/50" aria-hidden="true">
                                      {"\u203A"}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <Link
            href="/care"
            className={[
              "btn btn-sm btn-primary whitespace-nowrap",
              careActive ? "ring-2 ring-white/80 ring-offset-2 ring-offset-transparent" : "",
            ].join(" ")}
            aria-current={careActive ? "page" : undefined}
          >
            <Lang
              en={t(ui.cta.requestCare, "en")}
              ta={t(ui.cta.requestCare, "ta")}
              taClassName="font-tamil"
            />
          </Link>

          <div
            className="relative"
            onMouseEnter={() => {
              cancelCloseMenu()
              setOpenMenu(null)
              setOfferingsOpen(true)
              setHoveredKey("offerings")
            }}
            onMouseLeave={() => setOfferingsOpen(false)}
          >
            <Link
              href="/give"
              className={[
                "btn btn-sm btn-offerings whitespace-nowrap",
                offeringsActive ? "ring-2 ring-white/80 ring-offset-2 ring-offset-transparent" : "",
              ].join(" ")}
              data-navkey="offerings"
              onPointerEnter={() => setHoveredKey("offerings")}
              onFocus={() => setHoveredKey("offerings")}
              onClick={() => setOfferingsOpen((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={offeringsOpen}
              aria-current={offeringsActive ? "page" : undefined}
            >
              <Lang en={t(ui.cta.offerings, "en")} ta={t(ui.cta.offerings, "ta")} taClassName="font-tamil" />
            </Link>

            {renderOfferings ? (
              <div
                className={[
                  "absolute right-0 mt-2 w-[22rem] overflow-hidden rounded-2xl border border-churchBlue/10 bg-white shadow-glow",
                  "origin-top-right transform-gpu transition-[opacity,transform] duration-150 ease-out",
                  offeringsOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none",
                ].join(" ")}
                role="dialog"
                aria-label={offeringsDialogLabel}
                onMouseEnter={() => setOfferingsOpen(true)}
                onMouseLeave={() => setOfferingsOpen(false)}
              >
                <div className="p-5">
                  <div className="text-sm font-semibold text-churchBlue">
                    {language === "ta" ? "à®¤à®šà®®à®ªà®¾à®•à®®à¯à®®à¯ à®•à¯Šà®Ÿà¯ˆà®•à®³à¯à®®à¯" : "Tithes & Offerings"}
                  </div>
                  <p className={["mt-2 text-sm leading-relaxed text-churchBlue/75", language === "ta" ? "font-tamil" : ""].join(" ")}>
                    {language === "ta"
                      ? "à®¤à¯‡à®µà®©à¯ à®•à¯Šà®Ÿà¯à®¤à¯à®¤à®¤à®±à¯à®•à®¾à®© à®¨à®©à¯à®±à®¿, à®µà®¿à®šà¯à®µà®¾à®šà®®à¯, à®®à®±à¯à®±à¯à®®à¯ à®…à®©à¯à®ªà®¿à®©à¯ à®…à®Ÿà¯ˆà®¯à®¾à®³à®®à®¾à®• à®¨à®¾à®®à¯ à®•à¯Šà®Ÿà¯ˆà®•à¯à®•à®¿à®±à¯‹à®®à¯."
                      : "We give as an act of worship, gratitude, and faithfulness."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 font-semibold text-churchBlue/80">
                      Malachi 3:10
                    </span>
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 font-semibold text-churchBlue/80">
                      2 Corinthians 9:7
                    </span>
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 font-semibold text-churchBlue/80">
                      Proverbs 3:9
                    </span>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <Link href="/give" className="btn btn-sm btn-offerings w-full" onClick={() => setOfferingsOpen(false)}>
                      {language === "ta" ? "à®•à¯Šà®Ÿà¯à®™à¯à®•à®³à¯" : "Give"}
                    </Link>
                    <Link
                      href="/contact"
                      className="btn btn-sm btn-secondary w-full"
                      onClick={() => setOfferingsOpen(false)}
                    >
                      {language === "ta" ? "à®‰à®¤à®µà®¿" : "Need help?"}
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <LanguageToggle />

          <Link
            href="/search"
            className="group focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-[transform,background-color,box-shadow] hover:bg-white/15 hover:shadow-[0_14px_40px_rgb(0_0_0_/_0.22)] active:scale-95"
            aria-label={searchLabel}
            onClick={() => {
              setOfferingsOpen(false)
              setOpenMenu(null)
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
            >
              <path
                d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16.5 16.5 21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
            aria-label={open ? mobileMenuCloseLabel : mobileMenuOpenLabel}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? mobileMenuCloseLabel : mobileMenuOpenLabel}
            </span>
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

      {renderMobileMenu ? (
        <div
          className={[
            "fixed inset-0 z-[70] md:hidden",
            "transition-opacity duration-200 ease-out",
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden={!open}
        >
          <button
            type="button"
            aria-label={mobileMenuCloseLabel}
            className="absolute inset-0 bg-churchBlue/50 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            className={[
              "absolute right-0 top-0 h-dvh w-[min(94vw,26rem)] border-l border-churchBlue/10 bg-white shadow-[0_24px_80px_rgb(15_23_42_/_0.35)]",
              "transform-gpu transition-transform duration-200 ease-out",
              open ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
          >
            <div className="flex h-full flex-col">
              <div className="sticky top-0 z-10 border-b border-churchBlue/10 bg-white/95 px-4 py-3 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-churchBlue">Menu</span>
                  <button
                    type="button"
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-churchBlue/15 bg-churchBlueSoft text-churchBlue"
                    onClick={() => setOpen(false)}
                    aria-label={mobileMenuCloseLabel}
                  >
                    <span aria-hidden="true" className="text-lg leading-none">
                      {"\u00D7"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3">
                <div className="grid gap-2 px-2">
                  <Link href="/care" onClick={() => setOpen(false)} className="btn btn-md btn-primary w-full">
                    {t(ui.cta.requestCare, language)}
                  </Link>
                  <Link href="/give" onClick={() => setOpen(false)} className="btn btn-md btn-offerings w-full">
                    {language === "ta" ? "à®¤à®šà®®à®ªà®¾à®•à®®à¯à®®à¯ à®•à¯Šà®Ÿà¯ˆà®•à®³à¯à®®à¯" : "Tithes & Offerings"}
                  </Link>
                  <Link href="/search" onClick={() => setOpen(false)} className="btn btn-md btn-secondary w-full">
                    {language === "ta" ? "à®¤à¯‡à®Ÿà®²à¯" : "Search"}
                  </Link>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {navItems.map((item) => {
                    if (item.type === "link") {
                      const isActive = item.href === activeHref
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={[
                            "focus-ring block rounded-xl border border-transparent px-4 py-3 text-sm transition",
                            isActive
                              ? "bg-churchBlueSoft text-churchBlue border-stagePurple/25 shadow-[0_0_0_1px_rgb(var(--stage-purple)_/_0.14),0_10px_24px_rgb(var(--stage-purple)_/_0.12)]"
                              : "text-churchBlue/80 hover:bg-churchBlueSoft hover:text-churchBlue",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between">
                            <span>{t(ui.nav[item.key], language)}</span>
                            <span className="text-churchBlue/60" aria-hidden="true">
                              {"\u203A"}
                            </span>
                          </div>
                        </Link>
                      )
                    }

                    const isExpanded = Boolean(mobileSections[item.id])
                    const label = (() => {
                      if (item.id === "ourChurch") return t(ui.navGroups.ourChurch, language)
                      if (item.id === "getInvolved") return t(ui.navGroups.getInvolved, language)
                      if (item.id === "resources") return language === "ta" ? "Resources" : "Resources"
                      return t(ui.nav.ministries, language)
                    })()

                    return (
                      <div key={item.id} className="px-2">
                        <button
                          type="button"
                          className="focus-ring flex min-h-11 w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-churchBlue hover:bg-churchBlueSoft"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setMobileSections((v) => ({ ...v, [item.id]: !Boolean(v[item.id]) }))
                          }
                        >
                          <span className={language === "ta" ? "font-tamil" : undefined}>{label}</span>
                          <span className="text-xs text-churchBlue/70" aria-hidden="true">
                            {isExpanded ? "\u2212" : "+"}
                          </span>
                        </button>
                        {isExpanded ? (
                          <div className="mt-1 space-y-1">
                            {buildMenuLayout(item).flatItems.map((sub) => {
                              const isActive = sub.href === activeHref
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setOpen(false)}
                                  className={[
                                    "focus-ring block rounded-xl border border-transparent px-4 py-3 text-sm transition",
                                    isActive
                                      ? "bg-churchBlueSoft text-churchBlue border-stagePurple/25 shadow-[0_0_0_1px_rgb(var(--stage-purple)_/_0.14),0_10px_24px_rgb(var(--stage-purple)_/_0.12)]"
                                      : "text-churchBlue/80 hover:bg-churchBlueSoft hover:text-churchBlue",
                                  ].join(" ")}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-churchBlueSoft text-churchBlue/85">
                                        <MenuIcon name={menuIconForHref(sub.href)} />
                                      </span>
                                      <span>{t(ui.nav[sub.key], language)}</span>
                                    </span>
                                    <span className="text-churchBlue/60" aria-hidden="true">
                                      {"\u203A"}
                                    </span>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
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
  ariaLabel,
  title,
  dataNavKey,
  onPointerEnter,
}: {
  href: string
  active?: boolean
  children: ReactNode
  onClick?: () => void
  ariaLabel?: string
  title?: string
  dataNavKey?: string
  onPointerEnter?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      aria-label={ariaLabel}
      title={title}
      className={[
        "nav-link focus-ring relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium",
        active ? "active" : "",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
      data-navkey={dataNavKey}
    >
      {children}
    </Link>
  )
}
