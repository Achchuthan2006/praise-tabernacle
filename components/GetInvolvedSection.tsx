import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"

type Pathway = {
  titleEn: string
  titleTa: string
  descriptionEn: string
  descriptionTa: string
  href: string
  ctaEn: string
  ctaTa: string
}

function PathwayIcon({ icon }: { icon: "people" | "church" | "handshake" }) {
  if (icon === "church") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
        <path
          d="M12 3v3m0 0 4 2.6V21H8V8.6L12 6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M6 21h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M10.2 13.2h3.6m-3.6 3.3h3.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (icon === "handshake") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
        <path
          d="M8 12.2 6.4 10.6a2.1 2.1 0 0 0-3 0 2.1 2.1 0 0 0 0 3l2.5 2.5a4.5 4.5 0 0 0 6.4 0l2.6-2.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M16 12.2l1.6-1.6a2.1 2.1 0 0 1 3 0 2.1 2.1 0 0 1 0 3l-2.5 2.5a4.5 4.5 0 0 1-6.4 0l-1.1-1.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.1 13.1l2.1 2.1a1.6 1.6 0 0 0 2.2 0l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
      <path
        d="M16.5 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 16.5 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M7.5 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M21 20v-1.2a4.6 4.6 0 0 0-4.6-4.6h-1.7a4.6 4.6 0 0 0-4.6 4.6V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 20v-1a4 4 0 0 0-4-4H5.5A3.5 3.5 0 0 0 2 18.5V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

const pathways: Pathway[] = [
  {
    titleEn: "Join a Sunday Service",
    titleTa: "ஞாயிறு ஆராதனையில் கலந்து கொள்ளுங்கள்",
    descriptionEn: "Plan your first visit and meet friendly people who will help you feel at home.",
    descriptionTa: "முதல் வருகையை திட்டமிடுங்கள். நட்பான மக்கள் உங்களை வரவேற்று உதவுவார்கள்.",
    href: "/visit",
    ctaEn: "Plan Your Visit",
    ctaTa: "வருகையை திட்டமிடுங்கள்",
  },
  {
    titleEn: "Join a Ministry",
    titleTa: "ஒரு ஊழியத்தில் சேருங்கள்",
    descriptionEn: "Find a place to grow, serve, and build relationships in Tamil and English.",
    descriptionTa: "தமிழ் மற்றும் ஆங்கிலத்தில் வளர, சேவை செய்ய, மற்றும் உறவுகளை கட்டியெழுப்ப இடம் காணுங்கள்.",
    href: "/ministries",
    ctaEn: "Explore Ministries",
    ctaTa: "ஊழியங்களை பார்க்கவும்",
  },
  {
    titleEn: "Serve at Church",
    titleTa: "சபையில் சேவை செய்யுங்கள்",
    descriptionEn: "Help with welcome, worship, media, prayer, outreach, or practical support.",
    descriptionTa: "வரவேற்பு, ஆராதனை, ஊடகம், ஜெபம், வெளிச்சேவை, அல்லது நடைமுறை உதவி ஆகியவற்றில் சேவை செய்யலாம்.",
    href: "/contact",
    ctaEn: "Request to Serve",
    ctaTa: "சேவைக்கு விண்ணப்பிக்கவும்",
  },
]

const pathwayMeta = {
  "/visit": {
    detailEn: "Weekly worship • Prayer • Teaching",
    detailTa: "\u0bb5\u0bbe\u0bb0\u0bae\u0bcd \u0bb5\u0bb4\u0bbf\u0baa\u0bbe\u0b9f\u0bc1 \u2022 \u0b9c\u0bc6\u0baa\u0bae\u0bcd \u2022 \u0baa\u0bcb\u0ba4\u0ba9\u0bc8",
    accent: "family",
  },
  "/ministries": {
    detailEn: "Serve with teams that fit your gifts",
    detailTa: "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bbe\u0ba9 \u0b95\u0bc1\u0bb4\u0bc1\u0b95\u0bcd\u0b95\u0bb3\u0bcd",
    accent: "community",
  },
  "/contact": {
    detailEn: "Welcome • Media • Worship • Outreach",
    detailTa: "\u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0baa\u0bc1 \u2022 \u0b8a\u0b9f\u0b95\u0bae\u0bcd \u2022 \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 \u2022 \u0b9a\u0bc7\u0bb5\u0bc8",
    accent: "prayer",
  },
} as const

function getPathwayMeta(href: string) {
  return pathwayMeta[href as keyof typeof pathwayMeta] ?? {
    detailEn: "",
    detailTa: "",
    accent: "community" as const,
  }
}

export default function GetInvolvedSection() {
  return (
    <section className="bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Get involved" ta="ஈடுபடுங்கள்" />
                </div>
                <h2 className="section-heading">
                  <Lang en="Let's connect" ta="இணைவோம்" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Three simple pathways to take your next step."
                    ta="அடுத்த படியை எடுக்க மூன்று எளிய வழிகள்."
                  />
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pathways.map((p, idx) => (
              <Reveal key={p.href} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2} className="w-full min-w-0">
                {(() => {
                  const meta = getPathwayMeta(p.href)
                  return (
                    <article className="card card-accent-left h-full w-full min-w-0" data-accent={meta.accent}>
                  <div className="card-content p-7">
                    <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl border border-churchBlue/10 bg-churchBlueSoft text-churchBlue/80 shadow-glow">
                      <PathwayIcon
                        icon={p.href === "/ministries" ? "people" : p.href === "/contact" ? "handshake" : "church"}
                      />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                      <Lang en={p.titleEn} ta={p.titleTa} />
                    </h3>
                    {meta.detailEn ? (
                      <div className="mt-1 text-xs font-semibold tracking-wide text-churchBlue/55">
                        <Lang en={meta.detailEn} ta={meta.detailTa} taClassName="font-tamil" />
                      </div>
                    ) : null}
                    <div className="mt-3 h-0.5 w-12 rounded-full bg-churchGold/80" aria-hidden="true" />
                    <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={p.descriptionEn} ta={p.descriptionTa} />
                    </p>
                    <div className="mt-7">
                      <Link
                        href={p.href}
                        className={["btn btn-md w-full", idx === 0 ? "btn-primary" : "btn-secondary"].join(
                          " ",
                        )}
                      >
                        <Lang en={p.ctaEn} ta={p.ctaTa} />
                      </Link>
                    </div>
                  </div>
                    </article>
                  )
                })()}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
