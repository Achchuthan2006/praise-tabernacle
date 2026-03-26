import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { smallGroups } from "@/lib/groups"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Small Groups",
  description: "Find a small group to connect, pray, study Scripture, and grow together.",
  path: "/groups",
  keywords: ["Small groups", "Bible study groups", "Prayer groups", "Tamil church groups"],
})

export default function GroupsPage() {
  const featuredGroups = smallGroups.slice(0, 9)

  return (
    <>
      <PageHeader
        titleEn="Small Groups"
        titleTa="சிறு குழுக்கள்"
        descriptionEn="A simple way to build friendships, study the Bible, and pray together."
        descriptionTa="நட்பு வளர்க்க, வேதாகமம் கற்க, ஒன்றாக ஜெபிக்க உதவும் எளிய வழி."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <div className="section-kicker">
                  <Lang en="Community" ta="சமூக இணைப்பு" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang
                    en="Find the right group for your season"
                    ta="உங்கள் வாழ்க்கை நிலைக்கு பொருந்தும் குழுவை கண்டுபிடிக்கவும்"
                    taClassName="font-tamil"
                  />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="Our small groups are designed to help you know people, grow in Scripture, and stay encouraged through prayer and fellowship."
                    ta="எங்கள் சிறு குழுக்கள், மக்களை அறிந்து கொள்ளவும், வேதாகமத்தில் வளரவும், ஜெபத்தாலும் ஐக்கியத்தாலும் உற்சாகமடையவும் உதவுகின்றன."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact?message=Hi!%20I'd%20like%20help%20finding%20a%20small%20group." className="btn btn-md btn-primary">
                    <Lang en="Help me choose a group" ta="எனக்கு ஏற்ற குழுவைத் தேர்வுசெய்ய உதவுங்கள்" taClassName="font-tamil" />
                  </Link>
                  <a href={`mailto:${siteConfig.email}`} className="btn btn-md btn-secondary">
                    <Lang en="Email the office" ta="சபை அலுவலகத்திற்கு மின்னஞ்சல் அனுப்புங்கள்" taClassName="font-tamil" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredGroups.map((group, idx) => {
                const joinMessage = `Hi! I'd like to join the small group "${group.nameEn}" (${group.meetingTimeEn}).`
                return (
                  <Reveal key={group.id} delay={idx === 0 ? 0 : idx % 3 === 1 ? 1 : idx % 3 === 2 ? 2 : 3}>
                    <article className="flex h-full flex-col rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                      <div className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en={group.nameEn} ta={group.nameTa} taClassName="font-tamil" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={group.descriptionEn} ta={group.descriptionTa} taClassName="font-tamil" />
                      </p>

                      <div className="mt-5 space-y-2 text-sm text-churchBlue/75">
                        <p>
                          <span className="font-semibold text-churchBlue">
                            <Lang en="Time:" ta="நேரம்:" taClassName="font-tamil" />
                          </span>{" "}
                          <Lang en={group.meetingTimeEn} ta={group.meetingTimeTa} taClassName="font-tamil" />
                        </p>
                        <p>
                          <span className="font-semibold text-churchBlue">
                            <Lang en="Leader:" ta="தலைவர்:" taClassName="font-tamil" />
                          </span>{" "}
                          {group.contactName}
                        </p>
                        <p>
                          <span className="font-semibold text-churchBlue">
                            <Lang en="Where:" ta="இடம்:" taClassName="font-tamil" />
                          </span>{" "}
                          <Lang en={group.locationEn} ta={group.locationTa} taClassName="font-tamil" />
                        </p>
                      </div>

                      <div className="mt-6 grid gap-2 sm:grid-cols-2">
                        <a
                          href={`mailto:${group.contactEmail}?subject=${encodeURIComponent(`Small Group: ${group.nameEn}`)}&body=${encodeURIComponent(joinMessage)}`}
                          className="btn btn-sm btn-primary w-full"
                        >
                          <Lang en="Email to join" ta="சேர மின்னஞ்சல் அனுப்புங்கள்" taClassName="font-tamil" />
                        </a>
                        <Link
                          href={`/contact?message=${encodeURIComponent(joinMessage)}`}
                          className="btn btn-sm btn-secondary w-full"
                        >
                          <Lang en="Request callback" ta="திரும்ப அழைக்க கோருங்கள்" taClassName="font-tamil" />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-churchBlue">
                      <Lang en="Need help choosing a group?" ta="எந்த குழு உங்களுக்கு பொருந்தும் என்று தெரியவில்லையா?" taClassName="font-tamil" />
                    </h2>
                    <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
                      <Lang
                        en="Send us a message and we will help you find a group that matches your schedule and season of life."
                        ta="எங்களுக்கு ஒரு செய்தி அனுப்புங்கள். உங்கள் நேர அட்டவணைக்கும் வாழ்க்கை நிலைக்கும் பொருந்தும் குழுவை கண்டுபிடிக்க நாங்கள் உதவுவோம்."
                        taClassName="font-tamil"
                      />
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/contact?message=Hi!%20I'd%20like%20help%20finding%20a%20small%20group%20that%20fits%20my%20schedule."
                      className="btn btn-md btn-primary"
                    >
                      <Lang en="Request help" ta="உதவி கோருங்கள்" taClassName="font-tamil" />
                    </Link>
                    <a href={`mailto:${siteConfig.email}`} className="btn btn-md btn-secondary">
                      <Lang en="Email office" ta="அலுவலகத்திற்கு மின்னஞ்சல்" taClassName="font-tamil" />
                    </a>
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
