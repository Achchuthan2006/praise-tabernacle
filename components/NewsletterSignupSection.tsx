import Lang from "@/components/language/Lang"
import NewsletterSignupForm from "@/components/NewsletterSignupForm"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { siteConfig } from "@/lib/site"

export default function NewsletterSignupSection() {
  return (
    <section className="bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center">
                <div className="max-w-2xl">
                  <div className="section-kicker">
                    <Lang en="Newsletter" ta="செய்திமடல்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading">
                    <Lang en="Get church updates" ta="சபை புதுப்பிப்புகளைப் பெறுங்கள்" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                    <Lang
                      en="Join our email newsletter for upcoming events, prayer times, and community updates."
                      ta="வரவிருக்கும் நிகழ்வுகள், ஜெப நேரங்கள், சமூக செய்திகளுக்கான மின்னஞ்சல் புதுப்பிப்புகளுக்கு சேருங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <p className="mt-4 hidden text-xs text-churchBlue/65 lg:block">
                    <Lang
                      en={
                        <>
                          Prefer email? Write to{" "}
                          <a
                            className="underline underline-offset-2"
                            href={`mailto:${siteConfig.email}?subject=Newsletter%20Signup`}
                          >
                            {siteConfig.email}
                          </a>
                          .
                        </>
                      }
                      ta={
                        <>
                          மின்னஞ்சல் விருப்பமா? இங்கு எழுதுங்கள்:{" "}
                          <a
                            className="underline underline-offset-2 font-tamil"
                            href={`mailto:${siteConfig.email}?subject=Newsletter%20Signup`}
                          >
                            {siteConfig.email}
                          </a>
                          .
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <NewsletterSignupForm className="w-full" variant="section" noteId="homepage-newsletter-note" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
