import BrandLogo from "@/components/BrandLogo"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import { siteConfig } from "@/lib/site"
import { normalizeBullets } from "@/lib/text"
import Link from "next/link"

type FooterLink = {
  href: string
  labelEn: string
  labelTa: string
}

type FooterGroup = {
  titleEn: string
  titleTa: string
  links: FooterLink[]
}

type SocialLink = {
  href: string
  labelEn: string
  labelTa: string
}

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
      { href: "/bible", labelEn: "Bible", labelTa: "வேதாகமம்" },
    ],
  },
  {
    titleEn: "Learn About",
    titleTa: "அறிந்து கொள்ளுங்கள்",
    links: [
      { href: "/learn/baptism", labelEn: "Baptism", labelTa: "ஞானஸ்நானம்" },
      { href: "/learn/building-rental", labelEn: "Building Rental", labelTa: "கட்டிட பயன்பாடு" },
      { href: "/learn/community-safety", labelEn: "Community Safety", labelTa: "சமூக பாதுகாப்பு" },
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
      { href: "/ministries/prayer-care", labelEn: "Prayer & Care", labelTa: "ஜெபமும் அக்கறையும்" },
      { href: "/ministries/outreach", labelEn: "Outreach", labelTa: "சமூக சேவை" },
      { href: "/ministries/missions", labelEn: "Missions", labelTa: "மிஷன்" },
    ],
  },
]

function SocialIcon({ name }: { name: "youtube" | "facebook" | "instagram" }) {
  const cls = "h-4 w-4"

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.4 3.7-6.4 3.7Z" />
      </svg>
    )
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8v3.1h2.6v8h2.9Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.7 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const socialLinks: SocialLink[] = [
    {
      href: siteConfig.youtubeChannelUrl,
      labelEn: "YouTube",
      labelTa: "யூடியூப்",
    },
    {
      href: siteConfig.facebookUrl,
      labelEn: "Facebook",
      labelTa: "ஃபேஸ்புக்",
    },
    ...(siteConfig.instagramUrl
      ? [
          {
            href: siteConfig.instagramUrl,
            labelEn: "Instagram",
            labelTa: "இன்ஸ்டாகிராம்",
          } satisfies SocialLink,
        ]
      : []),
  ]

  return (
    <footer className="site-footer">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,3fr] lg:items-start">
          <div className="max-w-sm">
            <div className="logo-container">
              <BrandLogo variant="onDark" className="w-[120px] sm:w-[140px]" />
            </div>

            <p className="mt-6 text-sm leading-8 text-white/82">
              <Lang
                en={`A warm Tamil & English church family in ${siteConfig.locationShort}.`}
                ta={`${siteConfig.locationShort} நகரில் உள்ள ஒரு வரவேற்கும் தமிழ் மற்றும் ஆங்கில சபைக் குடும்பம்.`}
                taClassName="font-tamil"
              />
            </p>

            <div className="footer-glass-panel mt-6 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                <Lang en="Contact" ta="தொடர்பு" taClassName="font-tamil" />
              </div>

              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                  className="focus-ring block text-xl font-extrabold tracking-tight text-white transition-colors hover:text-[#ffd86a]"
                >
                  {siteConfig.phone}
                </a>

                <div className="text-base font-semibold leading-7 text-white/92">
                  <p>{siteConfig.addressLines[0]}</p>
                  <p>{siteConfig.addressLines[1]}</p>
                </div>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-white/78 transition-colors hover:text-white"
                >
                  <span className="text-white/45" aria-hidden="true">
                    {"\u2709"}
                  </span>
                  {siteConfig.email}
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {socialLinks.map((link) => {
                  const iconName =
                    link.labelEn === "YouTube"
                      ? "youtube"
                      : link.labelEn === "Facebook"
                        ? "facebook"
                        : "instagram"

                  return (
                    <a
                      key={link.labelEn}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link-pill focus-ring gap-2 text-sm font-semibold text-white/88"
                    >
                      <SocialIcon name={iconName} />
                      <Lang en={link.labelEn} ta={link.labelTa} taClassName="font-tamil" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.titleEn}>
                <h2 className="text-sm font-semibold text-white">
                  <Lang en={group.titleEn} ta={group.titleTa} taClassName="font-tamil" />
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {group.links.map((link) => (
                    <li key={`${group.titleEn}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="footer-link-pill focus-ring text-white/82"
                      >
                        <Lang en={link.labelEn} ta={link.labelTa} taClassName="font-tamil" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/72 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <div className="text-white/80">
              {siteConfig.serviceTimes.map((service) => (
                <p key={service.id}>{normalizeBullets(service.time)}</p>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-left md:text-right">
            <p>
              <Lang
                en={`© ${year} ${siteConfig.nameEn}. All rights reserved.`}
                ta={`© ${year} ${siteConfig.nameTa}. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.`}
                taClassName="font-tamil"
              />
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
