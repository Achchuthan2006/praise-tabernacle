import type { Metadata } from "next"
import Link from "next/link"

import EventsArchive from "@/components/EventsArchive"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { events } from "@/lib/events"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Calendar",
  description: "Church calendar and upcoming events.",
  path: "/calendar",
})

export default function CalendarPage() {
  const hasGoogleEmbed = Boolean(siteConfig.calendar.googleEmbedUrl)
  const hasRoomBookingsEmbed = Boolean(siteConfig.calendar.roomBookingsEmbedUrl)

  return (
    <>
      <PageHeader
        titleEn="Calendar"
        titleTa="நாட்காட்டி"
        descriptionEn="Upcoming events + calendar subscription links"
        descriptionTa="நிகழ்வுகள் + நாட்காட்டி சந்தா இணைப்புகள்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="card">
                    <div className="card-content p-6 sm:p-8">
                      <div className="section-kicker">
                        <Lang en="Calendar" ta="நாட்காட்டி" taClassName="font-tamil" />
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                        <Lang
                          en="Full calendar (Google)"
                          ta="முழு நாட்காட்டி (Google)"
                          taClassName="font-tamil"
                        />
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                        <Lang
                          en="View upcoming gatherings in a calendar format. If the embed isn’t available, use the subscription links to add it to your phone."
                          ta="வரவிருக்கும் கூடுகைகளை நாட்காட்டி வடிவத்தில் பார்க்கலாம். Embed கிடைக்கவில்லை என்றால், சந்தா இணைப்புகளைப் பயன்படுத்தி உங்கள் கைப்பேசியில் சேர்க்கலாம்."
                          taClassName="font-tamil"
                        />
                      </p>

                      {hasGoogleEmbed ? (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                          <iframe
                            title="Google Calendar"
                            src={siteConfig.calendar.googleEmbedUrl}
                            className="h-[38rem] w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      ) : (
                        <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                          <p className="text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                            <Lang
                              en="Our full calendar view will be available soon. For now, browse upcoming events below or subscribe for updates."
                              ta="முழு நாட்காட்டி பார்வை விரைவில் கிடைக்கும். இப்போது கீழே உள்ள நிகழ்வுகளைப் பாருங்கள் அல்லது புதுப்பிப்புகளுக்காக சந்தா பெறுங்கள்."
                              taClassName="font-tamil"
                            />
                          </p>
                          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <a href="/calendar.ics" className="btn btn-md btn-primary">
                              <Lang
                                en="Subscribe via iCal (.ics)"
                                ta="iCal (.ics) மூலம் சந்தா"
                                taClassName="font-tamil"
                              />
                            </a>
                            <Link href="/events" className="btn btn-md btn-secondary">
                              <Lang en="View events" ta="நிகழ்வுகள்" taClassName="font-tamil" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Reveal className="h-full">
                    <div className="card h-full">
                      <div className="card-content p-6 sm:p-8">
                        <div className="section-kicker">
                          <Lang en="Subscribe" ta="சந்தா" taClassName="font-tamil" />
                        </div>
                        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                          <Lang
                            en="Get updates on your phone"
                            ta="உங்கள் கைப்பேசியில் புதுப்பிப்புகள்"
                            taClassName="font-tamil"
                          />
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                          <Lang
                            en="Subscribe once and receive updates automatically in Apple Calendar, Google Calendar, Outlook, or any iCal-compatible app."
                            ta="ஒருமுறை சந்தா பெற்றால், Apple Calendar, Google Calendar, Outlook அல்லது iCal ஆதரிக்கும் எந்த செயலியிலும் புதுப்பிப்புகள் தானாக வரும்."
                            taClassName="font-tamil"
                          />
                        </p>

                        <div className="mt-6 grid gap-3">
                          <a href="/calendar.ics" className="btn btn-md btn-primary">
                            <Lang
                              en="Subscribe via iCal (.ics)"
                              ta="iCal (.ics) மூலம் சந்தா"
                              taClassName="font-tamil"
                            />
                          </a>
                          {siteConfig.calendar.googleWebUrl ? (
                            <a
                              href={siteConfig.calendar.googleWebUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-md btn-secondary"
                            >
                              <Lang
                                en="Open in Google Calendar"
                                ta="Google Calendar-ல் திறக்க"
                                taClassName="font-tamil"
                              />
                            </a>
                          ) : null}
                          {siteConfig.calendar.googleIcalUrl ? (
                            <a
                              href={siteConfig.calendar.googleIcalUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-md btn-secondary"
                            >
                              <Lang
                                en="Google Calendar iCal link"
                                ta="Google Calendar iCal இணைப்பு"
                                taClassName="font-tamil"
                              />
                            </a>
                          ) : null}
                        </div>

                        <div className="mt-8 border-t border-churchBlue/10 pt-8">
                          <div className="section-kicker">
                            <Lang
                              en="Room bookings"
                              ta="அறை முன்பதிவு"
                              taClassName="font-tamil"
                            />
                          </div>
                          <h3 className="mt-3 text-xl font-semibold tracking-tight text-churchBlue">
                            <Lang
                              en="Availability"
                              ta="கிடைக்கும் நேரங்கள்"
                              taClassName="font-tamil"
                            />
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                            <Lang
                              en="Check availability before requesting a building or room booking."
                              ta="கட்டிடம் அல்லது அறை முன்பதிவை கோருவதற்கு முன் கிடைக்கும் நேரங்களை சரிபார்க்கவும்."
                              taClassName="font-tamil"
                            />
                          </p>

                          {hasRoomBookingsEmbed ? (
                            <div className="mt-6 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                              <iframe
                                title="Room bookings availability"
                                src={siteConfig.calendar.roomBookingsEmbedUrl}
                                className="h-[28rem] w-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                          ) : (
                            <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                              <p className="text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                                <Lang
                                  en="Availability viewing will be available soon. You can still request a date and we’ll follow up with confirmation."
                                  ta="காலியிட பார்வை விரைவில் கிடைக்கும். இப்போதும் தேதி/நேரம் கோரலாம்; உறுதிப்படுத்த நாங்கள் தொடர்பு கொள்வோம்."
                                  taClassName="font-tamil"
                                />
                              </p>
                            </div>
                          )}

                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <Link href="/bookings?type=room" className="btn btn-md btn-primary">
                              <Lang
                                en="Request booking"
                                ta="முன்பதிவு கோரிக்கை"
                                taClassName="font-tamil"
                              />
                            </Link>
                            <Link href="/contact" className="btn btn-md btn-secondary">
                              <Lang
                                en="Ask a question"
                                ta="கேள்வி கேளுங்கள்"
                                taClassName="font-tamil"
                              />
                            </Link>
                          </div>

                          {(siteConfig.calendar.roomBookingsWebUrl || siteConfig.calendar.roomBookingsIcalUrl) ? (
                            <div className="mt-6 grid gap-3">
                              {siteConfig.calendar.roomBookingsWebUrl ? (
                                <a
                                  href={siteConfig.calendar.roomBookingsWebUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-secondary"
                                >
                                  <Lang
                                    en="Open bookings calendar"
                                    ta="முன்பதிவு நாட்காட்டி திறக்க"
                                    taClassName="font-tamil"
                                  />
                                </a>
                              ) : null}
                              {siteConfig.calendar.roomBookingsIcalUrl ? (
                                <a
                                  href={siteConfig.calendar.roomBookingsIcalUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-secondary"
                                >
                                  <Lang
                                    en="Subscribe (bookings iCal)"
                                    ta="சந்தா (முன்பதிவு iCal)"
                                    taClassName="font-tamil"
                                  />
                                </a>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>

            <Reveal delay={1} className="mt-12">
              <EventsArchive events={events} />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
