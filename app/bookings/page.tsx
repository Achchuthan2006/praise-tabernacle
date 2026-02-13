import type { Metadata } from "next"
import Link from "next/link"

import BookingRequestForm from "@/components/BookingRequestForm"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Bookings",
  description: "Request building rental or meeting room reservations at Praise Tabernacle.",
  path: "/bookings",
})

export default function BookingsPage({ searchParams }: { searchParams?: { type?: string } }) {
  const type = searchParams?.type === "room" ? "room" : "building"
  const hasRoomBookingsEmbed = Boolean(siteConfig.calendar.roomBookingsEmbedUrl)

  return (
    <>
      <PageHeader
        titleEn="Bookings"
        titleTa="முன்பதிவுகள்"
        descriptionEn="Request building rental or meeting room reservations. We’ll follow up to confirm availability."
        descriptionTa="கட்டிட வாடகை அல்லது கூட்ட அறை முன்பதிவு கோரலாம். கிடைப்பை உறுதிப்படுத்த நாங்கள் தொடர்பு கொள்வோம்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Link
                href="/bookings?type=building"
                className={["btn btn-sm", type === "building" ? "btn-primary" : "btn-secondary"].join(" ")}
              >
                <Lang en="Building rental" ta="கட்டிடம்" taClassName="font-tamil" />
              </Link>
              <Link
                href="/bookings?type=room"
                className={["btn btn-sm", type === "room" ? "btn-primary" : "btn-secondary"].join(" ")}
              >
                <Lang en="Meeting room" ta="கூட்ட அறை" taClassName="font-tamil" />
              </Link>
              <Link href="/calendar" className="btn btn-sm btn-secondary">
                <Lang en="Calendar" ta="நாட்காட்டி" taClassName="font-tamil" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Reveal>
                  <BookingRequestForm
                    bookingType={type}
                    titleEn={type === "building" ? "Request a building rental" : "Request a meeting room"}
                    titleTa={type === "building" ? "கட்டிட வாடகையை கோருங்கள்" : "கூட்ட அறையை கோருங்கள்"}
                    subtitleEn={
                      type === "building"
                        ? "Tell us your preferred date/time and details. We’ll reply to confirm availability, pricing, and guidelines."
                        : "Request a room reservation for meetings, classes, or ministry needs. We’ll reply to confirm availability."
                    }
                    subtitleTa={
                      type === "building"
                        ? "தேதி/நேரம் மற்றும் விவரங்களை பகிருங்கள். கிடைப்பு, கட்டணம், மற்றும் வழிகாட்டுதல்களை உறுதிப்படுத்த பதில் அளிப்போம்."
                        : "கூட்டம், வகுப்பு, அல்லது சேவைக்காக அறை முன்பதிவை கோருங்கள். கிடைப்பை உறுதிப்படுத்த பதில் அளிப்போம்."
                    }
                  />
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={1}>
                  <div className="card">
                    <div className="card-content p-8">
                      <div className="section-kicker">
                        <Lang en="Availability" ta="கிடைப்புகள்" taClassName="font-tamil" />
                      </div>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                        <Lang
                          en="Check dates"
                          ta="தேதிகளை சரிபார்க்க"
                          taClassName="font-tamil"
                        />
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                        <Lang
                          en="If the availability calendar is enabled, you can check open slots before submitting."
                          ta="Availability நாட்காட்டி இருந்தால், கோரிக்கைக்கு முன் காலியிடங்களைப் பார்க்கலாம்."
                          taClassName="font-tamil"
                        />
                      </p>

                      {hasRoomBookingsEmbed ? (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                          <iframe
                            title="Room bookings availability"
                            src={siteConfig.calendar.roomBookingsEmbedUrl}
                            className="h-[26rem] w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      ) : (
                        <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                          <p className="text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                            <Lang
                              en="Availability viewing is not configured yet. You can still request a date and we’ll confirm."
                              ta="Availability அமைக்கப்படவில்லை. இருந்தாலும் தேதி/நேரத்தை கோரலாம் — நாங்கள் உறுதிப்படுத்துவோம்."
                              taClassName="font-tamil"
                            />
                          </p>
                        </div>
                      )}

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Link href="/learn/building-rental" className="btn btn-sm btn-secondary">
                          <Lang en="Rental info" ta="வாடகை விவரம்" taClassName="font-tamil" />
                        </Link>
                        <Link href="/contact" className="btn btn-sm btn-secondary">
                          <Lang en="Ask a question" ta="கேள்வி கேளுங்கள்" taClassName="font-tamil" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

