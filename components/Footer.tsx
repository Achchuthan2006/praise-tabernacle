import Link from "next/link"

import Container from "@/components/ui/Container"
import { siteConfig } from "@/lib/site"

const quickLinks = [
  { href: "/about", label: "About / எங்களைப் பற்றி" },
  { href: "/sermons", label: "Sermons / பிரசங்கங்கள்" },
  { href: "/events", label: "Events / நிகழ்வுகள்" },
  { href: "/contact", label: "Contact / தொடர்பு" },
]

export default function Footer() {
  return (
    <footer className="relative bg-churchBlue text-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold text-white">{siteConfig.nameEn}</div>
            <div className="mt-1 text-sm text-white/85 font-tamil">{siteConfig.nameTa}</div>
            <p className="mt-4 text-sm text-white/85">
              A warm Tamil & English church family in {siteConfig.locationShort}.
            </p>
            <p className="mt-3 text-sm text-white/85">
              {siteConfig.addressLines[0]}
              <br />
              {siteConfig.addressLines[1]}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Service Times</div>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              {siteConfig.serviceTimes.map((s) => (
                <li key={s.time} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white">{s.labelEn}</div>
                    <div className="font-tamil">{s.labelTa}</div>
                  </div>
                  <div className="whitespace-nowrap">{s.time}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="focus-ring text-white/85 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={siteConfig.youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/15"
              >
                YouTube
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="focus-ring inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/15"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/75 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {siteConfig.nameEn}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>{siteConfig.locationShort}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{siteConfig.phone}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
