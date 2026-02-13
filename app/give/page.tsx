import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { financialReports, givingCategories } from "@/lib/giving"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Give",
  description: "Support the ministry of Praise Tabernacle through giving.",
  path: "/give",
})

function cleanPhoneDigits(value: string) {
  return String(value ?? "").replace(/[^\d]/g, "")
}

function smsHref(phone: string, body: string) {
  const digits = cleanPhoneDigits(phone)
  if (!digits) return ""
  // iOS uses `&body`, Android uses `?body`. `?&body` works well across most devices.
  return `sms:${digits}?&body=${encodeURIComponent(body)}`
}

function withQueryParams(href: string, params: Record<string, string>) {
  const raw = String(href ?? "").trim()
  if (!raw) return ""

  try {
    const u = new URL(raw, siteConfig.siteUrl)
    for (const [k, v] of Object.entries(params)) {
      if (!v) continue
      u.searchParams.set(k, v)
    }
    return raw.startsWith("http://") || raw.startsWith("https://") ? u.toString() : `${u.pathname}${u.search}${u.hash}`
  } catch {
    return raw
  }
}

function isInternalHref(href: string) {
  return String(href ?? "").startsWith("/")
}

function isHttpHref(href: string) {
  return /^https?:\/\//i.test(String(href ?? "").trim())
}

export default function GivePage() {
  const onlineGivingUrl = siteConfig.giving?.onlineGivingUrl ?? ""
  const recurringGivingUrl = siteConfig.giving?.recurringGivingUrl ?? ""
  const textToGiveNumber = siteConfig.giving?.textToGiveNumber ?? ""
  const textToGiveKeyword = siteConfig.giving?.textToGiveKeyword ?? "GIVE"
  const qrCodes = siteConfig.giving?.qrCodes ?? []

  return (
    <>
      <PageHeader
        titleEn="Give"
        titleTa="கொடுங்கள்"
        descriptionEn="Thank you for supporting the church. Choose a giving option below."
        descriptionTa="சபையை ஆதரிப்பதற்காக நன்றி. கீழே உள்ள கொடை வழிகளைப் பாருங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                  <Lang en="Giving with trust" ta="நம்பிக்கையுடன் கொடை" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Giving is always voluntary. If you choose to give, thank you - it helps us serve people, support families, and share the love of Jesus."
                    ta="கொடை விருப்பத்திற்கேற்ப. நீங்கள் கொடுக்க விரும்பினால், நன்றி — இது மக்களுக்கு சேவை செய்யவும், குடும்பங்களை ஆதரிக்கவும், இயேசுவின் அன்பை பகிரவும் உதவுகிறது."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal>
                <GiveRow
                  titleEn="Online giving"
                  accent="holiday"
                  icon="card"
                  badgeEn={onlineGivingUrl ? "Secure link" : "Set up needed"}
                  badgeTa={onlineGivingUrl ? "Secure link" : "Set up needed"}
                  titleTa="ஆன்லைன் கொடை"
                  bodyEn="Give securely online using a card or transfer."
                  bodyTa="கார்டு அல்லது டிரான்ஸ்ஃபர் மூலம் பாதுகாப்பாக கொடையளிக்கலாம்."
                  ctaHref="/give/online"
                  ctaEn="Donate online"
                  ctaTa="ஆன்லைன் கொடை"
                />
              </Reveal>
              <Reveal delay={1}>
                <GiveRow
                  titleEn="In person"
                  accent="community"
                  icon="hand"
                  titleTa="நேரில்"
                  bodyEn="You can give during service using the offering box."
                  bodyTa="ஆராதனை நேரத்தில் காணிக்கை பெட்டியின் மூலம் கொடுக்கலாம்."
                />
              </Reveal>
              <Reveal delay={2}>
                <GiveRow
                  titleEn="Recurring giving"
                  accent="family"
                  icon="help"
                  badgeEn={recurringGivingUrl ? "Set it once" : "Coming soon"}
                  badgeTa={recurringGivingUrl ? "ஒருமுறை அமை" : "விரைவில்"}
                  titleTa="மீண்டும் மீண்டும் கொடை"
                  bodyEn="Set a weekly or monthly gift to serve consistently."
                  bodyTa="வாரமோ மாதமோ மீண்டும் மீண்டும் கொடையளிக்கலாம்."
                  ctaHref={recurringGivingUrl || undefined}
                  ctaEn={recurringGivingUrl ? "Set recurring" : undefined}
                  ctaTa={recurringGivingUrl ? "மீள்கொடை அமை" : undefined}
                />
              </Reveal>
              <Reveal delay={3}>
                <GiveRow
                  titleEn="Text-to-give"
                  accent="prayer"
                  icon="help"
                  titleTa="SMS கொடை"
                  bodyEn={
                    textToGiveNumber
                      ? `Text ${textToGiveKeyword} to ${textToGiveNumber} to give quickly.`
                      : "Text-to-give will be available soon."
                  }
                  bodyTa={
                    textToGiveNumber
                      ? `${textToGiveNumber} என்ற எண்ணுக்கு ${textToGiveKeyword} என்று SMS அனுப்புங்கள்.`
                      : "SMS கொடை விரைவில் கிடைக்கும்."
                  }
                  ctaHref={textToGiveNumber ? smsHref(textToGiveNumber, textToGiveKeyword) : undefined}
                  ctaEn={textToGiveNumber ? "Open Messages" : undefined}
                  ctaTa={textToGiveNumber ? "Messages à®¤à®¿à®±" : undefined}
                />
              </Reveal>
              <Reveal delay={2} className="sm:col-span-2">
                <GiveRow
                  titleEn="Partnership programs"
                  titleTa="பங்குதாரர் திட்டங்கள்"
                  accent="teaching"
                  icon="help"
                  bodyEn="Prefer a structured monthly partnership? Explore the programs below."
                  bodyTa="மாதாந்திர அமைப்புடன் பங்களிக்க விரும்புகிறீர்களா? கீழே உள்ள திட்டங்களைப் பாருங்கள்."
                  ctaHref="/partnership"
                  ctaEn="Partnership"
                  ctaTa="பங்குதாரர்"
                />
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Giving categories" ta="கொடை வகைகள்" taClassName="font-tamil" />
                </div>
                <h3 className="section-heading mt-2">
                  <Lang en="Choose where your gift goes" ta="உங்கள் கொடை எங்கே போகும்" taClassName="font-tamil" />
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {givingCategories.map((cat) => (
                    <div key={cat.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={cat.titleEn} ta={cat.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-2 text-sm text-churchBlue/70">
                        <Lang en={cat.descriptionEn} ta={cat.descriptionTa} taClassName="font-tamil" />
                      </div>
                      {(onlineGivingUrl || recurringGivingUrl) ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {onlineGivingUrl ? (
                            <a
                              href={withQueryParams(onlineGivingUrl, { category: cat.id })}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-primary"
                            >
                              <Lang en="Give online" ta="ஆன்லைனில் கொடு" taClassName="font-tamil" />
                            </a>
                          ) : null}
                          {recurringGivingUrl ? (
                            <a
                              href={withQueryParams(recurringGivingUrl, { category: cat.id })}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-secondary"
                            >
                              <Lang en="Set recurring" ta="மீள்கொடை அமை" taClassName="font-tamil" />
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="If you’d like to give toward a specific special project, you can include a note at checkout (when available) or contact us."
                    ta="ஒரு குறிப்பிட்ட சிறப்பு திட்டத்திற்கு கொடுக்க விரும்பினால், (கிடைக்கும் போது) checkout-இல் குறிப்பை சேர்க்கலாம் அல்லது எங்களை தொடர்பு கொள்ளலாம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Recurring" ta="மீள்கொடை" taClassName="font-tamil" />
                </div>
                <h3 className="section-heading mt-2">
                  <Lang en="Set up recurring giving" ta="மீள்கொடை அமைக்க" taClassName="font-tamil" />
                </h3>
                <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-churchBlue/70 sm:text-base">
                  <li>
                    <Lang en="Choose a category (tithes, missions, building, or projects)." ta="ஒரு கொடை வகையைத் தேர்வுசெய்யுங்கள்." taClassName="font-tamil" />
                  </li>
                  <li>
                    <Lang en="Pick a schedule (weekly or monthly) that fits your budget." ta="வாராந்திரம் அல்லது மாதாந்திரம் தேர்வுசெய்யுங்கள்." taClassName="font-tamil" />
                  </li>
                  <li>
                    <Lang en="Update or pause anytime as needed." ta="தேவைக்கு ஏற்ப எப்போது வேண்டுமானாலும் மாற்றலாம்/நிறுத்தலாம்." taClassName="font-tamil" />
                  </li>
                </ol>
                <div className="mt-6">
                  {recurringGivingUrl ? (
                    <a href={recurringGivingUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                      <Lang en="Set recurring giving" ta="மீள்கொடை அமை" taClassName="font-tamil" />
                    </a>
                  ) : (
                    <div className="text-sm text-churchBlue/70 sm:text-base">
                      <Lang en="Recurring giving will be available soon." ta="மீள்கொடை விரைவில் கிடைக்கும்." taClassName="font-tamil" />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            {qrCodes.length ? (
              <Reveal className="mt-12">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="QR codes" ta="QR குறியீடுகள்" taClassName="font-tamil" />
                  </div>
                  <h3 className="section-heading mt-2">
                    <Lang en="Quick mobile giving" ta="மொபைலில் விரைவு கொடை" taClassName="font-tamil" />
                  </h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {qrCodes.map((qr) => (
                      <div
                        key={qr.src + qr.labelEn}
                        className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 text-center"
                      >
                        <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-2xl border border-churchBlue/10 bg-white">
                          <Image src={qr.src} alt={qr.labelEn} fill sizes="160px" className="object-contain p-3" />
                        </div>
                        <div className="mt-3 text-sm font-semibold text-churchBlue">
                          <Lang en={qr.labelEn} ta={qr.labelTa} taClassName="font-tamil" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}

            {financialReports.length ? (
              <Reveal className="mt-12">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="Transparency" ta="வெளிப்படை" taClassName="font-tamil" />
                  </div>
                  <h3 className="section-heading mt-2">
                    <Lang en="Financial reports" ta="நிதி அறிக்கைகள்" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm text-churchBlue/70 sm:text-base">
                    <Lang
                      en="We publish summaries and annual reports as they become available."
                      ta="அவை கிடைக்கும் போது நிதி சுருக்கங்களும் ஆண்டறிக்கைகளும் வெளியிடப்படும்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-5 grid gap-2">
                    {financialReports.map((report) =>
                      report.href ? (
                        <a key={report.id} href={report.href} className="btn btn-sm btn-secondary">
                          <Lang en={report.labelEn} ta={report.labelTa} taClassName="font-tamil" />
                        </a>
                      ) : (
                        <div
                          key={report.id}
                          className="btn btn-sm btn-secondary opacity-60 cursor-not-allowed"
                          aria-disabled="true"
                        >
                          <Lang en={report.labelEn} ta={report.labelTa} taClassName="font-tamil" />
                          {report.status === "coming_soon" ? (
                            <span className="ml-2 text-xs font-semibold text-churchBlue/60">Coming soon</span>
                          ) : null}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-4">
                    <Link href="/give/reports" className="btn btn-sm btn-secondary-soft">
                      <Lang en="See reporting notes" ta="அறிக்கை குறிப்புகள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal className="mt-12">
              <div className="border-t border-churchBlue/10 pt-8 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                <p>
                  <Lang
                    en="We aim to handle donations carefully and transparently."
                    ta="கொடைகளை கவனமாகவும் வெளிப்படையாகவும் நிர்வகிக்கிறோம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}

type GiveAccent = "prayer" | "teaching" | "community" | "family" | "youth" | "holiday"
type GiveIconName = "card" | "hand" | "help"

function GiveRow({
  titleEn,
  titleTa,
  bodyEn,
  bodyTa,
  accent,
  icon,
  badgeEn,
  badgeTa,
  ctaHref,
  ctaEn,
  ctaTa,
}: {
  titleEn: string
  titleTa: string
  bodyEn: string
  bodyTa: string
  accent: GiveAccent
  icon?: GiveIconName
  badgeEn?: string
  badgeTa?: string
  ctaHref?: string
  ctaEn?: string
  ctaTa?: string
}) {
  return (
    <div className="card card-accent-left" data-accent={accent}>
      <div className="card-content">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight text-churchBlue sm:text-lg">
              <Lang en={titleEn} ta={titleTa} taClassName="font-tamil" />
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
              <Lang en={bodyEn} ta={bodyTa} taClassName="font-tamil" />
            </p>
          </div>
          {icon ? (
            <div className="card-icon" aria-hidden="true">
              <GiveIcon name={icon} />
            </div>
          ) : null}
        </div>

        {badgeEn || ctaHref ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {badgeEn ? (
              <span className="inline-flex items-center rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs text-churchBlue/75">
                <Lang en={badgeEn} ta={badgeTa ?? badgeEn} taClassName="font-tamil" />
              </span>
            ) : (
              <span />
            )}
            {ctaHref ? (
              isInternalHref(ctaHref) ? (
                <Link href={ctaHref} className="btn btn-sm btn-primary whitespace-nowrap">
                  <Lang en={ctaEn ?? "Contact"} ta={ctaTa ?? (ctaEn ?? "Contact")} taClassName="font-tamil" />
                </Link>
              ) : (
                <a
                  href={ctaHref}
                  target={isHttpHref(ctaHref) ? "_blank" : undefined}
                  rel={isHttpHref(ctaHref) ? "noreferrer" : undefined}
                  className="btn btn-sm btn-primary whitespace-nowrap"
                >
                  <Lang en={ctaEn ?? "Contact"} ta={ctaTa ?? (ctaEn ?? "Contact")} taClassName="font-tamil" />
                </a>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function GiveIcon({ name }: { name: GiveIconName }) {
  switch (name) {
    case "card":
      return <IconCard />
    case "hand":
      return <IconHand />
    case "help":
      return <IconHelp />
  }
}

function IconCard() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M3.75 7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v9A2.25 2.25 0 0 1 18 18.75H6A2.25 2.25 0 0 1 3.75 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3.75 9h16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 14.25h3.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconHand() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M7.5 11.25V6.75a1.5 1.5 0 0 1 3 0v4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.5 11.25V6a1.5 1.5 0 0 1 3 0v5.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.5 11.25V6.75a1.5 1.5 0 0 1 3 0v8.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.75 11.25a1.5 1.5 0 0 0-3 0v1.25a7.5 7.5 0 0 0 7.5 7.5h1.25a7.5 7.5 0 0 0 7.5-7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10.2 9.3a2.2 2.2 0 0 1 4.3.6c0 1.4-1.25 2-1.9 2.5-.55.4-.6.7-.6 1.35v.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 17.6h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
