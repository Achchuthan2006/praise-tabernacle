import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import { siteConfig } from "@/lib/site"
import { joinWithBullet, normalizeBullets } from "@/lib/text"

function stripSundayPrefix(value: string) {
  return normalizeBullets(value).replace(/^Sundays?\s*[•·-]\s*/i, "").trim()
}

export default function AnnouncementBar() {
  if (!siteConfig.topBar.enabled) return null

  const englishService = siteConfig.serviceTimes.find((service) => service.id === "english-service")
  const tamilService = siteConfig.serviceTimes.find((service) => service.id === "tamil-service")
  const englishTime = stripSundayPrefix(englishService?.time ?? "Sundays • 9:15 AM") || "9:15 AM"
  const tamilTime = stripSundayPrefix(tamilService?.time ?? "Sundays • 10:30 AM") || "10:30 AM"

  const serviceSummaryEn =
    siteConfig.topBar.announcementEn.trim() ||
    joinWithBullet([`English ${englishTime}`, `Tamil (English translation) ${tamilTime}`])

  const serviceSummaryTa =
    siteConfig.topBar.announcementTa.trim() ||
    joinWithBullet([`ஆங்கில ஆராதனை ${englishTime}`, `தமிழ் ஆராதனை (ஆங்கில மொழிபெயர்ப்பு) ${tamilTime}`])

  return (
    <div className="top-bar text-white">
      <Container className="top-bar-shell relative flex flex-col gap-2.5 py-2.5 lg:grid lg:grid-cols-[1fr,minmax(0,auto),1fr] lg:items-center lg:gap-6">
        <div className="hidden lg:block" aria-hidden="true" />

        <div className="top-bar-summary min-w-0 text-center text-[11px] font-semibold leading-tight text-white/95 lg:justify-self-center lg:text-xs">
          <span className="text-white/88">
            <Lang en="Service times:" ta="ஆராதனை நேரங்கள்:" taClassName="font-tamil" />
          </span>{" "}
          <Lang en={serviceSummaryEn} ta={serviceSummaryTa} taClassName="font-tamil" />
        </div>

        <div className="top-bar-actions flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center lg:justify-self-end">
          <Link
            href={siteConfig.topBar.watchLatestHref}
            className="focus-ring watch-btn top-bar-watch mx-auto inline-flex min-h-10 items-center justify-center rounded-full px-5 py-1.5 text-xs font-semibold sm:mx-0 sm:shrink-0"
          >
            <Lang
              en={siteConfig.topBar.watchLatestLabelEn}
              ta={siteConfig.topBar.watchLatestLabelTa}
              taClassName="font-tamil"
            />
            <span className="ml-1.5 text-sm" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
