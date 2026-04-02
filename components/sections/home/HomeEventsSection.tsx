import EventCard from "@/components/EventCard"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { type Event } from "@/lib/events"

type HomeEventsSectionProps = {
  state: "loading" | "ready" | "empty" | "error"
  events: Event[]
}

export default function HomeEventsSection({ state, events }: HomeEventsSectionProps) {
  const isLoading = state === "loading"
  const isError = state === "error"
  const isEmpty = state === "empty"
  const isReady = state === "ready"

  return (
    <section className="section-soft-stage" aria-live="polite" aria-busy={isLoading}>
      <Container className="section-padding">
        <div className="content-shell-wide premium-surface p-6 md:p-8">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Calendar" ta="à®¨à®¾à®Ÿà¯à®•à®¾à®Ÿà¯à®Ÿà®¿" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en="Upcoming Events" ta="à®µà®°à®µà®¿à®°à¯à®•à¯à®•à¯à®®à¯ à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯" taClassName="font-tamil" />
                </h2>
                <p className="section-lead mt-4 max-w-2xl">
                  <Lang
                    en="Plan ahead for church gatherings, community moments, and special services happening soon."
                    ta="à®šà®®à¯€à®ªà®¤à¯à®¤à®¿à®²à¯ à®¨à®Ÿà¯ˆà®ªà¯†à®± à®‰à®³à¯à®³ à®šà®ªà¯ˆ à®•à¯‚à®Ÿà¯à®•à¯ˆà®•à®³à¯, à®šà®®à¯‚à®• à®¤à®°à¯à®£à®™à¯à®•à®³à¯, à®®à®±à¯à®±à¯à®®à¯ à®šà®¿à®±à®ªà¯à®ªà¯ à®†à®°à®¾à®¤à®©à¯ˆà®•à®³à¯à®•à¯à®•à®¾à®• à®®à¯à®©à¯à®•à¯‚à®Ÿà¯à®Ÿà®¿à®¯à¯‡ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6">
            <div className="section-divider" aria-hidden="true" />
          </div>

          {isLoading ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading events">
              {Array.from({ length: 3 }, (_, idx) => (
                <div
                  key={`event-skeleton-${idx}`}
                  className="h-64 animate-pulse rounded-2xl border border-churchBlue/10 bg-white"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : null}

          {isReady ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : null}

          {isError ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
              <Lang
                en="We couldn't load upcoming events right now. Please try again from the full events page."
                ta="à®µà®°à®µà®¿à®°à¯à®•à¯à®•à¯à®®à¯ à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯ˆ à®‡à®ªà¯à®ªà¯‹à®¤à¯ à®à®±à¯à®± à®®à¯à®Ÿà®¿à®¯à®µà®¿à®²à¯à®²à¯ˆ. à®®à¯à®´à¯ à®¨à®¿à®•à®´à¯à®µà¯ à®ªà®•à¯à®•à®¤à¯à®¤à®¿à®²à¯ à®®à¯€à®£à¯à®Ÿà¯à®®à¯ à®®à¯à®¯à®±à¯à®šà®¿à®•à¯à®•à®µà¯à®®à¯."
                taClassName="font-tamil"
              />
            </div>
          ) : null}

          {isEmpty ? (
            <div className="mt-8 rounded-2xl border border-churchBlue/10 bg-white p-5 text-sm text-churchBlue/75">
              <Lang
                en="No upcoming one-time events are scheduled right now. Check the full events page for recurring gatherings."
                ta="à®‡à®ªà¯à®ªà¯‹à®¤à¯ à®®à¯à®©à¯à®ªà®¤à®¿à®µà¯ à®šà¯†à®¯à¯à®¯à®•à¯à®•à¯‚à®Ÿà®¿à®¯ à®’à®°à¯à®®à¯à®±à¯ˆ à®¨à®¿à®•à®´à¯à®µà¯à®•à®³à¯ à®‡à®²à¯à®²à¯ˆ. à®¤à¯Šà®Ÿà®°à¯à®®à¯ à®•à¯‚à®Ÿà¯à®•à¯ˆà®•à®³à¯à®•à¯à®•à¯ à®®à¯à®´à¯ à®¨à®¿à®•à®´à¯à®µà¯ à®ªà®•à¯à®•à®¤à¯à®¤à¯ˆ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯."
                taClassName="font-tamil"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
