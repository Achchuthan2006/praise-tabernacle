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
        <path d="M12 3v3m0 0 4 2.6V21H8V8.6L12 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 21h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.2 13.2h3.6m-3.6 3.3h3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
        <path d="M9.1 13.1l2.1 2.1a1.6 1.6 0 0 0 2.2 0l1.6-1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
      <path d="M16.5 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 16.5 11Z" stroke="currentColor" strokeWidth="1.8" />
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
    ctaTa: "ஊழியங்களை பாருங்கள்",
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
    detailTa: "வாரம் வழிபாடு • ஜெபம் • போதனை",
    accent: "family",
  },
  "/ministries": {
    detailEn: "Serve with teams that fit your gifts",
    detailTa: "உங்கள் வரங்களுக்கு ஏற்ற குழுக்கள்",
    accent: "community",
  },
  "/contact": {
    detailEn: "Welcome • Media • Worship • Outreach",
    detailTa: "வரவேற்பு • ஊடகம் • ஆராதனை • சேவை",
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
    <section className="section-soft-stage">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="premium-surface p-8 md:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="section-kicker">
                    <Lang en="Get involved" ta="ஈடுபடுங்கள்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading">
                    <Lang en="Let's connect" ta="இணைவோம்" taClassName="font-tamil" />
                  </h2>
                  <p className="section-lead mt-4">
                    <Lang
                      en="Three simple pathways to help you move from visiting to belonging, serving, and growing."
                      ta="வருகையிலிருந்து சேர்ந்திருக்கும் நிலைக்கும், சேவைக்கும், வளர்ச்சிக்கும் செல்ல மூன்று எளிய வழிகள்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="rounded-[28px] border border-churchBlue/10 bg-white/90 px-5 py-4 shadow-[0_18px_36px_rgb(18_27_62_/_0.07)]">
                  <div className="section-kicker">
                    <Lang en="Next step" ta="அடுத்த படி" taClassName="font-tamil" />
                  </div>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-churchBlue/72">
                    <Lang
                      en="Start with a visit, find your people, and discover where God is inviting you to serve."
                      ta="ஒரு வருகையுடன் தொடங்குங்கள், உங்கள் மக்களை கண்டுபிடியுங்கள், தேவன் உங்களை எந்த சேவைக்கு அழைக்கிறார் என்பதை அறியுங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {pathways.map((p, idx) => {
                  const meta = getPathwayMeta(p.href)
                  return (
                    <Reveal key={p.href} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2} className="w-full min-w-0">
                      <article className="card card-accent-left h-full w-full min-w-0" data-accent={meta.accent}>
                        <div className="card-content p-7">
                          <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl border border-churchBlue/10 bg-churchBlueSoft text-churchBlue/80 shadow-glow">
                            <PathwayIcon icon={p.href === "/ministries" ? "people" : p.href === "/contact" ? "handshake" : "church"} />
                          </div>
                          <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                            <Lang en={p.titleEn} ta={p.titleTa} taClassName="font-tamil" />
                          </h3>
                          {meta.detailEn ? (
                            <div className="mt-1 text-xs font-semibold tracking-wide text-churchBlue/55">
                              <Lang en={meta.detailEn} ta={meta.detailTa} taClassName="font-tamil" />
                            </div>
                          ) : null}
                          <div className="mt-3 h-0.5 w-12 rounded-full bg-churchGold/80" aria-hidden="true" />
                          <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                            <Lang en={p.descriptionEn} ta={p.descriptionTa} taClassName="font-tamil" />
                          </p>
                          <div className="mt-7">
                            <Link href={p.href} className={["btn btn-md w-full", idx === 0 ? "btn-primary" : "btn-secondary"].join(" ")}>
                              <Lang en={p.ctaEn} ta={p.ctaTa} taClassName="font-tamil" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
