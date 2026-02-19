 import Link from "next/link"

import BrandLogo from "@/components/BrandLogo"
import Lang from "@/components/language/Lang"
import NewsletterSignupForm from "@/components/NewsletterSignupForm"
import GoogleMapEmbed from "@/components/GoogleMapEmbed"
import Container from "@/components/ui/Container"
import { siteConfig } from "@/lib/site"
import { normalizeBullets } from "@/lib/text"

type FooterLink = { href: string; labelEn: string; labelTa: string; external?: boolean }
type FooterGroup = { titleEn: string; titleTa: string; links: FooterLink[] }

const footerGroups: FooterGroup[] = [
  {
    titleEn: "About Us",
    titleTa: "எங்களைப் பற்றி",
    links: [
      { href: "/about", labelEn: "About", labelTa: "எங்களைப் பற்றி" },
      { href: "/about/beliefs", labelEn: "Beliefs", labelTa: "நம்பிக்கைகள்" },
      { href: "/about/history", labelEn: "History", labelTa: "வரலாறு" },
      { href: "/pastor", labelEn: "Leadership", labelTa: "தலைமை" },
      { href: "/about/denomination", labelEn: "Denomination", labelTa: "மத இணைப்பு" },
    ],
  },
  {
    titleEn: "Resources",
    titleTa: "வளங்கள்",
    links: [
      { href: "/events", labelEn: "Events", labelTa: "நிகழ்வுகள்" },
      { href: "/calendar", labelEn: "Calendar", labelTa: "நாட்காட்டி" },
      { href: "/blog", labelEn: "Blog", labelTa: "செய்திகள்" },
      { href: "/sermons", labelEn: "Livestream / Sermons", labelTa: "நேரலை / பிரசங்கங்கள்" },
      { href: "/bible", labelEn: "Bible (NKJV)", labelTa: "வேதாகமம் (NKJV)" },
    ],
  },
  {
    titleEn: "Learn About",
    titleTa: "அறிந்து கொள்ளுங்கள்",
    links: [
      { href: "/learn/baptism", labelEn: "Baptism", labelTa: "ஞானஸ்நானம்" },
      { href: "/learn/building-rental", labelEn: "Building Rental", labelTa: "கட்டிடம் வாடகை" },
      { href: "/learn/community-safety", labelEn: "Community Safety", labelTa: "பாதுகாப்பு" },
      { href: "/learn/weddings", labelEn: "Weddings", labelTa: "திருமணம்" },
    ],
  },
  {
    titleEn: "Ministries",
    titleTa: "ஊழியங்கள்",
    links: [
      { href: "/ministries", labelEn: "All Ministries", labelTa: "அனைத்து ஊழியங்கள்" },
      { href: "/ministries/kids", labelEn: "Kids", labelTa: "குழந்தைகள்" },
      { href: "/ministries/youth", labelEn: "Youth", labelTa: "இளைஞர்கள்" },
      { href: "/ministries/prayer-care", labelEn: "Prayer & Care", labelTa: "ஜெபம் & அக்கறை" },
      { href: "/ministries/outreach", labelEn: "Outreach", labelTa: "சமூக சேவை" },
      { href: "/ministries/missions", labelEn: "Missions", labelTa: "மிஷன்" },
    ],
  },
  {
    titleEn: "Connect",
    titleTa: "இணைப்பு",
    links: [
      { href: "/visit", labelEn: "Plan Your Visit", labelTa: "வருகையை திட்டமிடுங்கள்" },
      { href: "/care", labelEn: "Request Care", labelTa: "அக்கறை வேண்டுகோள்" },
      { href: "/groups", labelEn: "Small Groups", labelTa: "சிறு குழுக்கள்" },
      { href: "/serve", labelEn: "Serve", labelTa: "சேவை" },
      { href: "/membership", labelEn: "Membership", labelTa: "உறுப்பினர்" },
      { href: "/missions", labelEn: "Missions", labelTa: "மிஷன்" },
      { href: "/events", labelEn: "Join an Event", labelTa: "ஒரு நிகழ்வில் சேருங்கள்" },
      { href: "/give", labelEn: "Give Online", labelTa: "ஆன்லைன் கொடை" },
    ],
  },
  {
    titleEn: "Policies",
    titleTa: "கொள்கைகள்",
    links: [
      { href: "/privacy", labelEn: "Privacy Policy", labelTa: "தனியுரிமை" },
      { href: "/accessibility", labelEn: "Accessibility", labelTa: "அணுகல்" },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const mapsQuery = encodeURIComponent(siteConfig.addressLines.join(", "))
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`

  const socials: Array<{
    href: string
    label: string
    icon: "youtube" | "facebook" | "instagram" | "spotify" | "email"
  }> = [
    { href: siteConfig.youtubeChannelUrl, label: "YouTube", icon: "youtube" },
    ...(siteConfig.facebookUrl
      ? [{ href: siteConfig.facebookUrl, label: "Facebook", icon: "facebook" as const }]
      : []),
    ...(siteConfig.instagramUrl
      ? [{ href: siteConfig.instagramUrl, label: "Instagram", icon: "instagram" as const }]
      : []),
    ...(siteConfig.spotifyUrl
      ? [{ href: siteConfig.spotifyUrl, label: "Spotify", icon: "spotify" as const }]
      : []),
    { href: `mailto:${siteConfig.email}`, label: "Email", icon: "email" },
  ]

  return (
    <footer className="footer-wave relative bg-churchBlue text-white">
      <Container className="py-14">
        <div className="mx-auto max-w-md space-y-8 text-center md:hidden">
          <div>
            <div className="logo-container footer-logo-glow mx-auto">
              <BrandLogo variant="onDark" className="w-[170px]" />
            </div>
            <p className="mt-4 text-sm text-white/85">
              <Lang
                en={
                  <>
                    A warm Tamil &amp; English church family in {siteConfig.locationShort}.
                  </>
                }
                ta={
                  <>
                    {siteConfig.locationShort} à®¨à®•à®°à®¿à®²à¯ à®‰à®³à¯à®³ à®’à®°à¯ à®µà®°à®µà¯‡à®±à¯à®•à¯à®®à¯ à®¤à®®à®¿à®´à¯ &amp; à®†à®™à¯à®•à®¿à®² à®šà®ªà¯ˆà®•à¯ à®•à¯à®Ÿà¯à®®à¯à®ªà®®à¯.
                  </>
                }
              />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {socials.slice(0, 4).map((s) => (
              <a
                key={`mobile-${s.label}`}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className={[
                  "focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2",
                  "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white",
                  "transition-colors hover:bg-white/15",
                ].join(" ")}
                aria-label={s.label}
                title={s.label}
              >
                <Icon name={s.icon} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>

          <div className="text-sm text-white/85">
            <div className="text-xs font-semibold text-white/85">
              <Lang en="Address" ta="à®®à¯à®•à®µà®°à®¿" taClassName="font-tamil" />
            </div>
            <p className="mt-2">
              {siteConfig.addressLines[0]}
              <br />
              {siteConfig.addressLines[1]}
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-left backdrop-blur">
            <div className="text-sm font-semibold text-white">
              <Lang en="Newsletter" ta="à®šà¯†à®¯à¯à®¤à®¿à®®à®Ÿà®²à¯" />
            </div>
            <p className="mt-2 text-sm text-white/80">
              <Lang
                en="Get updates about events, prayer times, and church news."
                ta="à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯, à®œà¯†à®ª à®¨à¯‡à®°à®™à¯à®•à®³à¯, à®®à®±à¯à®±à¯à®®à¯ à®šà®ªà¯ˆ à®šà¯†à®¯à¯à®¤à®¿à®•à®³à¯ˆà®ªà¯ à®ªà®±à¯à®±à®¿à®¯ à®ªà¯à®¤à¯à®ªà¯à®ªà®¿à®ªà¯à®ªà¯à®•à®³à¯ˆ à®ªà¯†à®±à¯à®™à¯à®•à®³à¯."
              />
            </p>
            <NewsletterSignupForm variant="footer" className="mt-4" noteId="footer-newsletter-note-mobile" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            {footerGroups.map((group) => (
              <FooterAccordionGroup key={`mobile-acc-${group.titleEn}`} group={group} />
            ))}
            <FooterInfoAccordion />
          </div>
        </div>

        <div className="hidden gap-12 md:grid lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <div className="logo-container footer-logo-glow">
              <BrandLogo variant="onDark" className="w-[170px]" />
            </div>
            <p className="mt-4 text-sm text-white/85">
              <Lang
                en={
                  <>
                    A warm Tamil &amp; English church family in {siteConfig.locationShort}.
                  </>
                }
                ta={
                  <>
                    {siteConfig.locationShort} நகரில் உள்ள ஒரு வரவேற்கும் தமிழ் &amp; ஆங்கில சபைக் குடும்பம்.
                  </>
                }
              />
            </p>

            <div className="mt-4 text-sm text-white/85">
              <div className="text-xs font-semibold text-white/85">
                <Lang en="Address" ta="முகவரி" taClassName="font-tamil" />
              </div>
              <p className="mt-2">
                {siteConfig.addressLines[0]}
                <br />
                {siteConfig.addressLines[1]}
              </p>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                <GoogleMapEmbed
                  title="Google Map"
                  src={mapsEmbedUrl}
                  iframeClassName="h-36 w-full sm:h-40"
                  ctaClassName="btn btn-sm btn-secondary-invert"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className={[
                    "focus-ring inline-flex w-full items-center justify-center gap-2",
                    "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white",
                    "transition-colors hover:bg-white/15",
                    "sm:w-auto sm:justify-start",
                  ].join(" ")}
                  aria-label={s.label}
                  title={s.label}
                >
                  <Icon name={s.icon} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur sm:max-w-md lg:max-w-none">
              <div className="text-sm font-semibold text-white">
                <Lang en="Newsletter" ta="செய்திமடல்" />
              </div>
              <p className="mt-2 text-sm text-white/80">
                <Lang
                  en="Get updates about events, prayer times, and church news."
                  ta="நிகழ்வுகள், ஜெப நேரங்கள், மற்றும் சபை செய்திகளைப் பற்றிய புதுப்பிப்புகளை பெறுங்கள்."
                />
              </p>
              <NewsletterSignupForm variant="footer" className="mt-4" noteId="footer-newsletter-note" />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <FooterColumn key={group.titleEn} group={group} />
            ))}
            <FooterInfo />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-center text-xs text-white/75 md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <Lang
              en={
                <>
                  {"\u00a9"} {year} {siteConfig.nameEn}. All rights reserved.
                </>
              }
              ta={
                <>
                  {"\u00a9"} {year} {siteConfig.nameTa}. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.
                </>
              }
              taClassName="font-tamil"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <span>{siteConfig.locationShort}</span>
            <span className="hidden md:inline">{"\u2022"}</span>
            <span className="hidden md:inline">{siteConfig.phone}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({ group }: { group: FooterGroup }) {
  return (
    <div>
      <div className="text-sm font-semibold text-white">
        <Lang en={group.titleEn} ta={group.titleTa} />
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {group.links.map((l) => (
          <li key={`${l.href}-${l.labelEn}`}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-white/85 transition-colors hover:text-white"
              >
                <Lang en={l.labelEn} ta={l.labelTa} />
              </a>
            ) : (
              <Link href={l.href} className="focus-ring text-white/85 transition-colors hover:text-white">
                <Lang en={l.labelEn} ta={l.labelTa} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterAccordionGroup({ group }: { group: FooterGroup }) {
  return (
    <details className="rounded-2xl border border-white/15 bg-white/10 p-3">
      <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
        <Lang en={group.titleEn} ta={group.titleTa} />
        <span aria-hidden="true" className="text-white/60">
          +
        </span>
      </summary>
      <ul className="mt-3 space-y-2 text-sm">
        {group.links.map((l) => (
          <li key={`mobile-${l.href}-${l.labelEn}`}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring text-white/85 transition-colors hover:text-white"
              >
                <Lang en={l.labelEn} ta={l.labelTa} />
              </a>
            ) : (
              <Link href={l.href} className="focus-ring text-white/85 transition-colors hover:text-white">
                <Lang en={l.labelEn} ta={l.labelTa} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

function FooterInfo() {
  return (
    <div className="sm:col-span-2 lg:col-span-1">
      <div className="text-sm font-semibold text-white">
        <Lang en="Info" ta="தகவல்" />
      </div>
      <ul className="mt-3 space-y-2 text-sm text-white/85">
        {siteConfig.serviceTimes.map((s) => (
          <li key={s.time} className="space-y-1 leading-snug">
            <div className="text-white">
              <Lang en={s.labelEn} ta={s.labelTa} />
            </div>
            <div className="block text-white/85">{normalizeBullets(s.time)}</div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/15 pt-6 text-sm text-white/85">
        <div>
          <a
            className="focus-ring text-white/85 transition-colors hover:text-white"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
        </div>
        <div className="mt-2">{siteConfig.phone}</div>
      </div>
    </div>
  )
}

function FooterInfoAccordion() {
  return (
    <details className="rounded-2xl border border-white/15 bg-white/10 p-3">
      <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
        <Lang en="Info" ta="à®¤à®•à®µà®²à¯" />
        <span aria-hidden="true" className="text-white/60">
          +
        </span>
      </summary>
      <ul className="mt-3 space-y-2 text-sm text-white/85">
        {siteConfig.serviceTimes.map((s) => (
          <li key={`mobile-${s.time}`} className="space-y-1 leading-snug">
            <div className="text-white">
              <Lang en={s.labelEn} ta={s.labelTa} />
            </div>
            <div className="block text-white/85">{normalizeBullets(s.time)}</div>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-white/15 pt-4 text-sm text-white/85">
        <div>
          <a
            className="focus-ring text-white/85 transition-colors hover:text-white"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
        </div>
        <div className="mt-2">{siteConfig.phone}</div>
      </div>
    </details>
  )
}

function Icon({ name }: { name: "youtube" | "facebook" | "instagram" | "spotify" | "email" }) {
  const common = { width: 16, height: 16, fill: "currentColor", "aria-hidden": true } as const
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M21.8 8.001a3 3 0 0 0-2.113-2.12C17.97 5.4 12 5.4 12 5.4s-5.97 0-7.687.48A3 3 0 0 0 2.2 8C1.72 9.726 1.72 12 1.72 12s0 2.274.48 4a3 3 0 0 0 2.113 2.12c1.717.48 7.687.48 7.687.48s5.97 0 7.687-.48A3 3 0 0 0 21.8 16c.48-1.726.48-4 .48-4s0-2.274-.48-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
      </svg>
    )
  }
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.24 0-1.62.77-1.62 1.55V12h2.76l-.44 2.88h-2.32v6.99A10 10 0 0 0 22 12z" />
      </svg>
    )
  }
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.3A3.7 3.7 0 1 1 8.3 12 3.7 3.7 0 0 1 12 8.3zm0 2A1.7 1.7 0 1 0 13.7 12 1.7 1.7 0 0 0 12 10.3zM17.6 6.8a.6.6 0 1 1-.6.6.6.6 0 0 1 .6-.6z" />
      </svg>
    )
  }
  if (name === "spotify") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.59 14.47a.75.75 0 0 1-1.03.25A8.48 8.48 0 0 0 8.9 16a.75.75 0 0 1 .05-1.5 9.97 9.97 0 0 1 7.39 1.0.75.75 0 0 1 .25 1.03zm.86-2.61a.9.9 0 0 1-1.24.3 10.25 10.25 0 0 0-7.85-1.19.9.9 0 1 1-.45-1.74 12.05 12.05 0 0 1 9.23 1.41.9.9 0 0 1 .31 1.22zm.07-2.79A1.05 1.05 0 0 1 16.09 12a12.3 12.3 0 0 0-9.78-1.3 1.05 1.05 0 1 1-.6-2.01A14.4 14.4 0 0 1 17.2 10a1.05 1.05 0 0 1 .32 1.07z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5-8-5V6l8 5 8-5v2.2z" />
    </svg>
  )
}
