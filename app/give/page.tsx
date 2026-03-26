import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { financialReports, givingCategories } from "@/lib/giving"
import { getGivingProviderCta, getGivingProviderLabel } from "@/lib/givingProvider"
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
    return raw.startsWith("http://") || raw.startsWith("https://")
      ? u.toString()
      : `${u.pathname}${u.search}${u.hash}`
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
  const givingConfig = siteConfig.giving ?? {}
  const onlineGivingUrl = givingConfig.onlineGivingUrl ?? ""
  const recurringGivingUrl = givingConfig.recurringGivingUrl ?? ""
  const textToGiveNumber = givingConfig.textToGiveNumber ?? ""
  const textToGiveKeyword = givingConfig.textToGiveKeyword ?? "GIVE"
  const processorName = givingConfig.processorName?.trim() ?? ""
  const qrCodes = givingConfig.qrCodes ?? []
  const providerLabel = getGivingProviderLabel(processorName, onlineGivingUrl)
  const providerCta = getGivingProviderCta(processorName, onlineGivingUrl)

  const hasOnlineGiving = Boolean(onlineGivingUrl)
  const hasRecurringGiving = Boolean(recurringGivingUrl)
  const configuredQrCodes = qrCodes.filter((qr) => qr.src && qr.src !== "/qr-give.svg")
  const availableFinancialReports = financialReports.filter((report) => Boolean(report.href))

  return (
    <>
      <PageHeader
        titleEn="Give"
        titleTa="கொடுங்கள்"
        descriptionEn="Thank you for supporting the church. Choose a giving option below."
        descriptionTa="சபையை ஆதரிப்பதற்காக நன்றி. கீழே உள்ள கொடை வழிகளில் ஒன்றைத் தேர்ந்தெடுக்கவும்."
      />

      <section className="bg-white give-page">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                  <Lang en="Giving with trust" ta="நம்பிக்கையுடன் கொடை" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Giving is always voluntary. If you choose to give, thank you. It helps us serve people, support families, and share the love of Jesus."
                    ta="கொடை எப்போதும் விருப்பமானது. நீங்கள் கொடுக்கத் தீர்மானித்தால், நன்றி. இது மக்களுக்கு சேவை செய்யவும், குடும்பங்களை ஆதரிக்கவும், மற்றும் இயேசுவின் அன்பை பகிரவும் உதவுகிறது."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            {!hasOnlineGiving ? (
              <Reveal className="mt-8">
                <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6 shadow-glow">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang
                      en="Online giving is almost ready"
                      ta="ஆன்லைன் கொடை இன்னும் இணைக்கப்படவில்லை"
                      taClassName="font-tamil"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="This page already supports a real secure giving provider such as Tithe.ly, Church Center, PayPal, or a Stripe-hosted payment link. The only missing step is adding the church's live giving URL."
                      ta="இந்த கொடைப் பக்கம் Tithe.ly, Church Center, அல்லது Stripe போன்ற உண்மையான கட்டண வழங்குநருக்குத் தயாராக இருக்கிறது. ஆனால் நேரடி processor link இன்னும் அமைக்கப்படவில்லை. இப்போது, நேரடி கொடை அல்லது சபை அலுவலகத்தை தொடர்புகொள்ளும் வழியை பயன்படுத்துங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Giving setup")}`}
                      className="btn btn-md btn-primary"
                    >
                      <Lang en="Contact the church" ta="சபையை தொடர்புகொள்ளுங்கள்" taClassName="font-tamil" />
                    </a>
                    <Link href="/visit" className="btn btn-md btn-secondary">
                      <Lang en="Plan an in-person visit" ta="நேரில் வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal>
                <GiveRow
                  titleEn="Online giving"
                  titleTa="ஆன்லைன் கொடை"
                  bodyEn={
                    processorName
                      ? `Give securely through ${providerLabel} using card, bank transfer, or the options available there.`
                      : "Give securely online using a card or bank transfer."
                  }
                  bodyTa={
                    processorName
                      ? `${processorName} மூலம் பாதுகாப்பாக கார்டு, வங்கி பரிமாற்றம், அல்லது அங்கு உள்ள வழிகளைப் பயன்படுத்தி கொடையளிக்கலாம்.`
                      : "கார்டு அல்லது வங்கி பரிமாற்றம் மூலம் பாதுகாப்பாக ஆன்லைனில் கொடையளிக்கலாம்."
                  }
                  accent="holiday"
                  icon="card"
                  badgeEn={hasOnlineGiving ? (processorName || "Secure link") : "Office assistance available"}
                  badgeTa={hasOnlineGiving ? (processorName || "பாதுகாப்பான இணைப்பு") : "சபை அலுவலக உதவி கிடைக்கும்"}
                  ctaHref={hasOnlineGiving ? onlineGivingUrl : "/give/online"}
                  ctaEn={hasOnlineGiving ? providerCta : "See giving options"}
                  ctaTa={hasOnlineGiving ? "பாதுகாப்பான கொடைப் பக்கத்தைத் திறக்க" : "கொடை வழிகளைப் பார்"}
                />
              </Reveal>

              <Reveal delay={1}>
                <GiveRow
                  titleEn="In person"
                  titleTa="நேரில்"
                  bodyEn="You can give during the service using the offering box."
                  bodyTa="ஆராதனை நேரத்தில் காணிக்கை பெட்டியின் மூலம் கொடையளிக்கலாம்."
                  accent="community"
                  icon="hand"
                />
              </Reveal>

              <Reveal delay={2}>
                <GiveRow
                  titleEn="Recurring giving"
                  titleTa="தொடர்ச்சியான கொடை"
                  bodyEn={
                    hasRecurringGiving
                      ? "Set a weekly or monthly gift to support ministry consistently."
                      : "Recurring giving will be available once a dedicated provider link is connected."
                  }
                  bodyTa={
                    hasRecurringGiving
                      ? "வாராந்திர அல்லது மாதாந்திர கொடையை அமைத்து, ஊழியத்தை தொடர்ந்து ஆதரிக்கலாம்."
                      : "தனியான provider link இணைக்கப்பட்டதும் தொடர்ச்சியான கொடை கிடைக்கும்."
                  }
                  accent="family"
                  icon="help"
                  badgeEn={hasRecurringGiving ? "Set it once" : "Available soon"}
                  badgeTa={hasRecurringGiving ? "ஒருமுறை அமைக்கவும்" : "விரைவில் கிடைக்கும்"}
                  ctaHref={hasRecurringGiving ? recurringGivingUrl : undefined}
                  ctaEn={hasRecurringGiving ? "Set recurring" : undefined}
                  ctaTa={hasRecurringGiving ? "தொடர்ச்சி கொடை அமைக்க" : undefined}
                />
              </Reveal>

              <Reveal delay={3}>
                <GiveRow
                  titleEn="Text-to-give"
                  titleTa="SMS கொடை"
                  bodyEn={
                    textToGiveNumber
                      ? `Text ${textToGiveKeyword} to ${textToGiveNumber} to give quickly.`
                      : "Text-to-give will be available once a number is configured."
                  }
                  bodyTa={
                    textToGiveNumber
                      ? `${textToGiveNumber} என்ற எண்ணுக்கு ${textToGiveKeyword} என்று SMS அனுப்புங்கள்.`
                      : "எண் அமைக்கப்பட்டதும் SMS கொடை கிடைக்கும்."
                  }
                  accent="prayer"
                  icon="help"
                  ctaHref={textToGiveNumber ? smsHref(textToGiveNumber, textToGiveKeyword) : undefined}
                  ctaEn={textToGiveNumber ? "Open Messages" : undefined}
                  ctaTa={textToGiveNumber ? "செய்திகளைத் திறக்க" : undefined}
                />
              </Reveal>

              <Reveal delay={2} className="sm:col-span-2">
                <GiveRow
                  titleEn="Partnership programs"
                  titleTa="கூட்டாண்மை திட்டங்கள்"
                  bodyEn="Prefer a structured monthly partnership? Explore the programs below."
                  bodyTa="ஒழுங்குபடுத்தப்பட்ட மாதாந்திர கூட்டாண்மை விருப்பமா? கீழே உள்ள திட்டங்களை பார்க்கவும்."
                  accent="teaching"
                  icon="help"
                  ctaHref="/partnership"
                  ctaEn="Partnership"
                  ctaTa="கூட்டாண்மை"
                />
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Giving categories" ta="கொடை வகைகள்" taClassName="font-tamil" />
                </div>
                <h3 className="section-heading mt-2">
                  <Lang en="Choose where your gift goes" ta="உங்கள் கொடை எங்கு செல்கிறது என்பதைத் தேர்ந்தெடுக்கவும்" taClassName="font-tamil" />
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
                      {hasOnlineGiving || hasRecurringGiving ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {hasOnlineGiving ? (
                            <a
                              href={withQueryParams(onlineGivingUrl, { category: cat.id })}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-primary"
                            >
                              <Lang en="Give online" ta="ஆன்லைனில் கொடு" taClassName="font-tamil" />
                            </a>
                          ) : null}
                          {hasRecurringGiving ? (
                            <a
                              href={withQueryParams(recurringGivingUrl, { category: cat.id })}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-secondary"
                            >
                              <Lang en="Set recurring" ta="தொடர்ச்சி கொடை அமைக்க" taClassName="font-tamil" />
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="If you'd like to give toward a specific special project, you can include a note at checkout when available, or contact us directly."
                    ta="ஒரு குறிப்பிட்ட சிறப்பு திட்டத்திற்காக கொடையளிக்க விரும்பினால், checkout-இல் குறிப்பு சேர்க்கலாம் அல்லது எங்களை நேரடியாக தொடர்புகொள்ளலாம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            {configuredQrCodes.length ? (
              <Reveal className="mt-12">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="QR codes" ta="QR குறியீடுகள்" taClassName="font-tamil" />
                  </div>
                  <h3 className="section-heading mt-2">
                    <Lang en="Quick mobile giving" ta="மொபைலில் விரைவு கொடை" taClassName="font-tamil" />
                  </h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {configuredQrCodes.map((qr) => (
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

            {availableFinancialReports.length ? (
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
                      ta="கிடைக்கும் போதெல்லாம் நிதி சுருக்கங்களையும் ஆண்டு அறிக்கைகளையும் வெளியிடுகிறோம்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-5 grid gap-2">
                    {availableFinancialReports.map((report) => (
                      <a key={report.id} href={report.href!} className="btn btn-sm btn-secondary">
                        <Lang en={report.labelEn} ta={report.labelTa} taClassName="font-tamil" />
                      </a>
                    ))}
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

        {badgeEn ? (
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs text-churchBlue/75">
              <Lang en={badgeEn} ta={badgeTa ?? badgeEn} taClassName="font-tamil" />
            </span>
          </div>
        ) : null}

        {ctaHref ? (
          <div className="mt-5">
            {isInternalHref(ctaHref) ? (
              <Link href={ctaHref} className="btn btn-sm btn-primary w-full sm:w-auto">
                <Lang en={ctaEn ?? "Contact"} ta={ctaTa ?? (ctaEn ?? "Contact")} taClassName="font-tamil" />
              </Link>
            ) : (
              <a
                href={ctaHref}
                target={isHttpHref(ctaHref) ? "_blank" : undefined}
                rel={isHttpHref(ctaHref) ? "noreferrer" : undefined}
                className="btn btn-sm btn-primary w-full sm:w-auto"
              >
                <Lang en={ctaEn ?? "Contact"} ta={ctaTa ?? (ctaEn ?? "Contact")} taClassName="font-tamil" />
              </a>
            )}
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
