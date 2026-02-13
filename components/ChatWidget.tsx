"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"
import { isWithinOfficeHours } from "@/lib/officeHours"
import { siteConfig } from "@/lib/site"

function buildWhatsAppHref(phoneDigits: string, text: string) {
  const digits = phoneDigits.replace(/[^\d]/g, "")
  const params = new URLSearchParams()
  params.set("text", text)
  return `https://wa.me/${digits}?${params.toString()}`
}

function Icon({ name }: { name: "chat" | "whatsapp" | "clock" | "close" }) {
  const cls = "h-5 w-5"
  if (name === "close") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path
          d="M12 21a9 9 0 0 0 7.7-13.7A9 9 0 0 0 3.2 18.9L2.5 22l3.2-.6A9 9 0 0 0 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 8.8c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .5.4l.7 1.7c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3-.1.5.3.7 1.3 1.9 2.8 2.6.2.1.4 0 .5-.1l.5-.5c.2-.2.4-.2.7-.1l1.7.7c.3.1.4.3.4.5 0 .7-.4 1.4-1 1.7-.6.3-1.3.3-2.5-.2-1.2-.5-2.4-1.5-3.4-2.7-1-1.2-1.6-2.5-1.8-3.3-.2-.8-.1-1.4.2-1.9Z"
          fill="currentColor"
          opacity="0.22"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path
        d="M12 21c5.2 0 9-3.6 9-8 0-4.4-3.8-8-9-8s-9 3.6-9 8c0 2.3 1.1 4.4 3 5.9L5 22l3.4-1.4c1.1.3 2.3.4 3.6.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 13h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 10h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

export default function ChatWidget() {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const update = () => setIsOnline(isWithinOfficeHours(new Date(), siteConfig.officeHours))
    update()
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [])

  const whatsappText = useMemo(() => {
    return language === "ta" ? siteConfig.whatsapp.defaultMessageTa : siteConfig.whatsapp.defaultMessageEn
  }, [language])

  const firstTimeText = useMemo(() => {
    return language === "ta" ? siteConfig.whatsapp.firstTimeMessageTa : siteConfig.whatsapp.firstTimeMessageEn
  }, [language])

  const whatsappHref = useMemo(() => {
    return buildWhatsAppHref(siteConfig.whatsapp.phoneE164Digits, whatsappText)
  }, [whatsappText])

  const firstTimeHref = useMemo(() => {
    return buildWhatsAppHref(siteConfig.whatsapp.phoneE164Digits, firstTimeText)
  }, [firstTimeText])

  const contactPrefill = encodeURIComponent(firstTimeText)
  const contactHref = `/contact?message=${contactPrefill}`

  const statusLabel = isOnline
    ? language === "ta"
      ? "இப்போது ஆன்லைன்"
      : "Online now"
    : language === "ta"
      ? "இப்போது ஆஃப்லைன்"
      : "Offline"

  return (
    <div
      className={[
        "fixed bottom-4 left-4 z-[89]",
        "pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]",
      ].join(" ")}
    >
      {open ? (
        <div className="mb-3 w-[19.5rem] overflow-hidden rounded-2xl border border-churchBlue/10 bg-white shadow-glow">
          <div className="flex items-start justify-between gap-3 border-b border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-churchBlue">
                <Lang en="Chat with us" ta="எங்களை தொடர்புகொள்ள" taClassName="font-tamil" />
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-churchBlue/70">
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    isOnline ? "bg-emerald-500" : "bg-churchBlue/35",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span className={language === "ta" ? "font-tamil" : ""}>{statusLabel}</span>
                <span className="text-churchBlue/45">•</span>
                <span className="inline-flex items-center gap-1 text-churchBlue/70">
                  <Icon name="clock" />
                  <span className={language === "ta" ? "font-tamil" : ""}>
                    {language === "ta" ? "திங்கள்–வெள்ளி 10–6" : "Mon–Fri 10–6"}
                  </span>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="focus-ring grid h-9 w-9 place-items-center rounded-xl border border-churchBlue/10 bg-white text-churchBlue/80 hover:bg-churchBlueSoft"
              onClick={() => setOpen(false)}
              aria-label={language === "ta" ? "மூடு" : "Close"}
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="p-4">
            <div className="grid gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-primary w-full"
                aria-label="WhatsApp"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="whatsapp" />
                  <Lang en={isOnline ? "Live chat (WhatsApp)" : "Chat on WhatsApp"} ta={isOnline ? "நேரடி அரட்டை (WhatsApp)" : "WhatsApp அரட்டை"} taClassName="font-tamil" />
                </span>
              </a>

              <a
                href={firstTimeHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-secondary w-full"
              >
                <Lang en="First-time visitor? (quick help)" ta="முதன்முறை வருகிறீர்களா? (உடனடி உதவி)" taClassName="font-tamil" />
              </a>

              <div className="grid gap-2 sm:grid-cols-2">
                <a href={`tel:${siteConfig.phone}`} className="btn btn-sm btn-secondary w-full">
                  <Lang en="Call" ta="அழைப்பு" taClassName="font-tamil" />
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn btn-sm btn-secondary w-full">
                  <Lang en="Email" ta="மின்னஞ்சல்" taClassName="font-tamil" />
                </a>
              </div>

              <Link href={contactHref} className="btn btn-sm btn-secondary-soft w-full" onClick={() => setOpen(false)}>
                <Lang en="Leave a message" ta="செய்தி விடுங்கள்" taClassName="font-tamil" />
              </Link>

              <Link href="/visit" className="btn btn-sm btn-secondary-soft w-full" onClick={() => setOpen(false)}>
                <Lang en="Plan your visit" ta="வருகையை திட்டமிட" taClassName="font-tamil" />
              </Link>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-churchBlue/65">
              <Lang
                en="If we’re offline, send a message and we’ll reply as soon as we can."
                ta="நாங்கள் ஆஃப்லைனில் இருந்தால், செய்தி விடுங்கள் — விரைவில் பதில் அளிப்போம்."
                taClassName="font-tamil"
              />
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className={[
          "focus-ring grid h-14 w-14 place-items-center rounded-full border border-churchBlue/10 shadow-glow",
          "bg-white text-churchBlue hover:bg-churchBlueSoft",
        ].join(" ")}
        onClick={() => setOpen((v) => !v)}
        aria-label={language === "ta" ? "அரட்டை" : "Chat"}
        aria-expanded={open}
      >
        <Icon name="chat" />
        <span className="sr-only">{language === "ta" ? "அரட்டை" : "Chat"}</span>
      </button>
    </div>
  )
}

