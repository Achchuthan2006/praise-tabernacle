import type { Metadata } from "next"

import SermonList from "@/components/SermonList"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { sermons } from "@/lib/content"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch recent sermons in Tamil and English from Praise Tabernacle.",
}

export default function SermonsPage() {
  return (
    <>
      <PageHeader
        titleEn="Sermons"
        titleTa="பிரசங்கங்கள்"
        descriptionEn="Short, clear messages in Tamil and English to encourage your week."
        descriptionTa="உங்கள் வாரத்திற்கு ஊக்கமளிக்கும் குறுகிய, தெளிவான தமிழ் & ஆங்கில செய்திகள்."
      />

      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-churchBlue/70">
            Filter and browse sermons like YouTube - calmer and easier to read.
          </div>
          <a
            href={siteConfig.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center justify-center rounded-xl bg-churchBlue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-churchBlueLight"
          >
            View channel on YouTube
          </a>
        </div>

        <div className="mt-8">
          <SermonList sermons={sermons} />
        </div>
      </Container>
    </>
  )
}
