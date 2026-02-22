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

  const serviceTimesCompact = joinWithBullet(siteConfig.serviceTimes.map((service) => splitDayTime(service.time).time))
  const serviceSummaryEnCompact = `Sun: ${joinWithBullet(
    siteConfig.serviceTimes.map((service) => {
      const { time } = splitDayTime(service.time)
      const shortLabel = service.labelEn.toLowerCase().includes("tamil") ? "TA" : "EN"
      return `${shortLabel} ${time}`
    }),
  )}`

  const hasAnnouncement = Boolean(siteConfig.topBar.announcementEn || siteConfig.topBar.announcementTa)
  const announcementEn = siteConfig.topBar.announcementEn || "Important update"
  const announcementTa = siteConfig.topBar.announcementTa || siteConfig.topBar.announcementEn || "முக்கிய அறிவிப்பு"

  return (
    <div className="top-bar border-b border-white/10 bg-[linear-gradient(90deg,rgb(var(--primary-navy))_0%,rgb(var(--primary-purple))_55%,rgb(var(--primary-teal))_100%)] text-white">
      <Container className="announcement-bar flex flex-col items-center gap-1 px-3 py-1.5 text-center sm:gap-2 sm:py-2.5 md:px-0 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="w-full min-w-0 lg:w-auto">
          <div className="text-[11px] font-medium text-white/90 sm:text-xs">
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

        <div className="flex w-full flex-col items-center justify-center gap-1 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-2 lg:justify-end">
          <LiveServiceIndicator />

          {hasAnnouncement ? (
            <Link
              href={siteConfig.topBar.announcementHref}
              className="focus-ring inline-flex min-h-10 w-full max-w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-white/15 sm:min-h-11 sm:w-auto sm:text-xs"
              aria-label="Announcement / அறிவிப்பு"
              title={siteConfig.topBar.announcementTa || siteConfig.topBar.announcementEn}
            >
              <span className="hidden rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold tracking-wide sm:inline">
                NEW
              </span>
              <span className="min-w-0 max-w-[36ch]">
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
            className="focus-ring watch-btn inline-flex min-h-10 w-full items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-churchBlue sm:min-h-11 sm:w-auto sm:px-4 sm:py-1.5 sm:text-xs"
          >
            <span className="hidden sm:inline">
              <Lang
                en={siteConfig.topBar.watchLatestLabelEn}
                ta={siteConfig.topBar.watchLatestLabelTa}
                taClassName="font-tamil"
              />
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
