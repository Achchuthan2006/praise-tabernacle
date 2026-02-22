import Link from "next/link"

import GlitchText from "@/components/GlitchText"
import LiveServiceIndicator from "@/components/LiveServiceIndicator"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import { siteConfig } from "@/lib/site"
import { joinWithBullet, splitDayTime } from "@/lib/text"

export default function AnnouncementBar() {
  if (!siteConfig.topBar.enabled) return null

  const serviceSummaryEn = joinWithBullet(
    siteConfig.serviceTimes.map((service) => {
      const { time } = splitDayTime(service.time)
      const label = service.labelEn.replace(" Service", "")
      return `${label} ${time}`
    }),
  )

  const serviceSummaryTa = joinWithBullet(
    siteConfig.serviceTimes.map((service) => {
      const { time } = splitDayTime(service.time)
      return `${service.labelTa} ${time}`
    }),
  )
  const serviceTimesCompact = joinWithBullet(
    siteConfig.serviceTimes.map((service) => splitDayTime(service.time).time),
  )
  const serviceSummaryEnCompact = `Sun ${serviceTimesCompact}`

  const hasAnnouncement = Boolean(siteConfig.topBar.announcementEn || siteConfig.topBar.announcementTa)
  const announcementEn = siteConfig.topBar.announcementEn || "Important update"
  const announcementTa = siteConfig.topBar.announcementTa || siteConfig.topBar.announcementEn || "முக்கிய அறிவிப்பு"

  return (
    <div className="top-bar border-b border-white/10 bg-[linear-gradient(90deg,rgb(var(--primary-navy))_0%,rgb(var(--primary-purple))_55%,rgb(var(--primary-teal))_100%)] text-white">
      <Container className="flex flex-col items-center gap-2 py-2 text-center sm:py-2.5 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="w-full min-w-0 md:w-auto">
          <div className="text-xs font-medium text-white/90">
            <span className="font-semibold">
              <Lang en="Service times:" ta="ஆராதனை நேரங்கள்:" />
            </span>{" "}
            <span className="hidden sm:inline">
              <Lang en={serviceSummaryEn} ta={serviceSummaryTa} taClassName="font-tamil" />
            </span>
            <span className="sm:hidden">
              <Lang en={serviceSummaryEnCompact} ta={serviceTimesCompact} taClassName="font-tamil" />
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 md:justify-end">
          <LiveServiceIndicator />
          {hasAnnouncement ? (
            <Link
              href={siteConfig.topBar.announcementHref}
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15 sm:w-auto"
              aria-label="Announcement / அறிவிப்பு"
              title={siteConfig.topBar.announcementTa || siteConfig.topBar.announcementEn}
            >
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold tracking-wide">
                NEW
              </span>
              <span className="min-w-0 max-w-[38ch]">
                <Lang
                  en={<GlitchText text={announcementEn} />}
                  ta={<GlitchText text={announcementTa} className="font-tamil" />}
                  enClassName="block truncate"
                  taClassName="block truncate font-tamil"
                />
              </span>
            </Link>
          ) : null}

          <Link
            href={siteConfig.topBar.watchLatestHref}
            className="focus-ring watch-btn inline-flex min-h-11 w-full items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold text-churchBlue sm:w-auto"
          >
            <span className="hidden sm:inline">
              <Lang en={siteConfig.topBar.watchLatestLabelEn} ta={siteConfig.topBar.watchLatestLabelTa} taClassName="font-tamil" />
            </span>
            <span className="sm:hidden">
              <Lang en="Watch" ta="பாருங்கள்" taClassName="font-tamil" />
            </span>
            <span className="ml-1" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
