import type { Metadata } from "next"
import Link from "next/link"

import SmallGroupFinder from "@/components/SmallGroupFinder"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { smallGroups } from "@/lib/groups"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Small Groups",
  description: "Find a small group to connect, pray, and grow together.",
  path: "/groups",
})

export default function GroupsPage() {
  return (
    <>
      <PageHeader
        titleEn="Small Groups"
        titleTa="சிறு குழுக்கள்"
        descriptionEn="A simple way to build friendships, study the Bible, and pray together."
        descriptionTa="நட்பு, வேதப் படிப்பு, ஜெபம் — எளிய இணைப்பு"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <SmallGroupFinder groups={smallGroups} />

            <Reveal className="mt-14">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-churchBlue">Not sure where to start?</h2>
                    <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
                      Send us a message and we&apos;ll help you find a group that fits your schedule.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={`/contact?message=${encodeURIComponent("Hi! I’d like help finding a small group that fits my schedule.")}`}
                      className="btn btn-md btn-primary"
                    >
                      Request a group
                    </Link>
                    <Link href="/visit" className="btn btn-md btn-secondary">
                      Plan your visit
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
