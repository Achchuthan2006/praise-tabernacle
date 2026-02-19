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

  const hasAnnouncement = Boolean(siteConfig.topBar.announcementEn || siteConfig.topBar.announcementTa)
  const announcementEn = siteConfig.topBar.announcementEn || "Important update"
  const announcementTa =
    siteConfig.topBar.announcementTa ||
    siteConfig.topBar.announcementEn ||
    "\u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0baf \u0b85\u0bb1\u0bbf\u0bb5\u0bbf\u0baa\u0bcd\u0baa\u0bc1"
  const watchHref = siteConfig.topBar.watchLatestHref
  const watchLabelEn = siteConfig.topBar.watchLatestLabelEn
  const watchLabelTa = siteConfig.topBar.watchLatestLabelTa

  return (
    <div className="top-bar border-b border-white/10 bg-[linear-gradient(90deg,rgb(var(--primary-navy))_0%,rgb(var(--primary-purple))_55%,rgb(var(--primary-teal))_100%)] text-white">
      <Container className="py-1.5 md:py-2.5">
        <div className="flex items-center justify-center md:hidden">
          <Link
            href={watchHref}
            className="focus-ring watch-btn inline-flex min-h-10 items-center rounded-full px-3 py-1 text-[11px] font-semibold text-churchBlue"
          >
            <Lang en={watchLabelEn} ta={watchLabelTa} taClassName="font-tamil" />
            <span className="ml-1" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-white/90">
              <span className="font-semibold">
                <Lang en="Service times:" ta="\u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 \u0ba8\u0bc7\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bcd:" />
              </span>{" "}
              <Lang en={serviceSummaryEn} ta={serviceSummaryTa} taClassName="font-tamil" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LiveServiceIndicator />
            {hasAnnouncement ? (
              <Link
                href={siteConfig.topBar.announcementHref}
                className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15"
                aria-label="Announcement / \u0b85\u0bb1\u0bbf\u0bb5\u0bbf\u0baa\u0bcd\u0baa\u0bc1"
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
              href={watchHref}
              className="focus-ring watch-btn inline-flex min-h-11 items-center rounded-full px-4 py-1.5 text-xs font-semibold text-churchBlue"
            >
              <Lang en={watchLabelEn} ta={watchLabelTa} taClassName="font-tamil" />
              <span className="ml-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
