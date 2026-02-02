import type { Metadata } from "next"
import Link from "next/link"

import EventCard from "@/components/EventCard"
import Hero from "@/components/Hero"
import SermonEmbed from "@/components/SermonEmbed"
import Container from "@/components/ui/Container"
import { upcomingEvents, sermons } from "@/lib/content"

export const metadata: Metadata = {
  title: "Home",
}

export default function Home() {
  const latest = sermons[0]

  return (
    <>
      <Hero />

      <section className="relative border-t border-churchBlue/10 bg-churchBlueSoft">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                Latest Sermon
              </h2>
              <p className="mt-1 text-sm text-churchBlue/70 font-tamil">
                சமீபத்திய பிரசங்கம்
              </p>
            </div>
            <p className="text-sm text-churchBlue/70">
              Watch, share, and be encouraged this week.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <SermonEmbed sermon={latest} />
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-white px-3 py-1 text-churchBlue/80 shadow-sm">
                  {latest.language === "en" ? "EN" : "TA"}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-churchBlue/80 shadow-sm">
                  {latest.language === "en" ? "English Service" : "Tamil Service"}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                  Join us this Sunday
                </h3>
                <p className="mt-2 text-sm text-churchBlue/75">
                  If you're new, you're welcome here. Come as you are.
                </p>
                <p className="mt-2 text-sm text-churchBlue/70 font-tamil">
                  நீங்கள் புதியவராக இருந்தால், அன்புடன் வரவேற்கிறோம். நீங்கள் இருப்பதுபோலவே வாருங்கள்.
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                    <div className="text-churchBlue font-medium">Tamil Service</div>
                    <div className="text-churchBlue/70">Sundays • 10:00 AM</div>
                  </div>
                  <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                    <div className="text-churchBlue font-medium">English Service</div>
                    <div className="text-churchBlue/70">Sundays • 6:00 PM</div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-churchBlue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-churchBlueLight"
                  >
                    Plan your visit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-churchBlue/10 bg-white">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                Upcoming Events
              </h2>
              <p className="mt-1 text-sm text-churchBlue/70 font-tamil">
                வரவிருக்கும் நிகழ்வுகள்
              </p>
            </div>
            <p className="text-sm text-churchBlue/70">Stay connected this month.</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-t border-churchBlue/10 bg-churchBlueSoft">
        <Container className="py-16 sm:py-20">
          <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                You're invited.
              </h2>
              <p className="mt-3 text-sm text-churchBlue/75 sm:text-base">
                Whether you're exploring faith, returning to church, or looking for a
                Tamil & English community — we'd love to meet you.
              </p>
              <p className="mt-2 text-sm text-churchBlue/70 sm:text-base font-tamil">
                விசுவாசத்தை அறிய விரும்பினாலும், சபைக்கு மீண்டும் வருகிறவராக இருந்தாலும்,
                தமிழ் & ஆங்கில சமூகத்தை தேடினாலும் — உங்களை சந்திக்க விரும்புகிறோம்.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center justify-center rounded-xl bg-churchBlue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-churchBlueLight"
                >
                  Plan Your Visit
                </Link>
                <Link
                  href="/sermons"
                  className="focus-ring inline-flex items-center justify-center rounded-xl border border-churchBlue/15 bg-churchBlueSoft px-5 py-3 text-sm font-semibold text-churchBlue transition-colors hover:bg-white"
                >
                  Watch Sermons
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

