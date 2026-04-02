"use client"

import Lang from "@/components/language/Lang"
import Link from "@/components/language/LocalizedLink"
import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"

export default function NotFound() {
  const { language } = useLanguage()

  const quickLinks = [
    {
      href: "/",
      titleEn: "Homepage",
      titleTa: "முகப்பு",
      bodyEn: "Start again from the main landing page.",
      bodyTa: "முக்கிய முகப்பு பக்கத்திலிருந்து மீண்டும் தொடங்குங்கள்.",
    },
    {
      href: "/visit",
      titleEn: "Plan Your Visit",
      titleTa: "வருகையை திட்டமிடுங்கள்",
      bodyEn: "See service times, location, and what to expect.",
      bodyTa: "ஆராதனை நேரங்கள், இடம், மற்றும் என்ன எதிர்பார்க்கலாம் என்பதை பாருங்கள்.",
    },
    {
      href: "/events",
      titleEn: "Upcoming Events",
      titleTa: "வரவிருக்கும் நிகழ்வுகள்",
      bodyEn: "Browse gatherings, special services, and church life.",
      bodyTa: "கூட்டங்கள், சிறப்பு ஆராதனைகள், மற்றும் சபை நிகழ்வுகளை பாருங்கள்.",
    },
    {
      href: "/search",
      titleEn: "Search the Site",
      titleTa: "தளத்தை தேடுங்கள்",
      bodyEn: "Find sermons, pages, blog posts, and more.",
      bodyTa: "பிரசங்கங்கள், பக்கங்கள், பதிவுகள் மற்றும் மேலும் பலவற்றை கண்டுபிடியுங்கள்.",
    },
  ]

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)]">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-churchBlue/10 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(15,84,118,0.45)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-churchBlue/10 bg-churchBlueSoft px-4 py-2 text-xs font-semibold tracking-[0.24em] text-churchBlue/70">
                  <span className="rounded-full bg-white px-2 py-1 text-churchBlue">404</span>
                  <Lang en="Page not found" ta="பக்கம் கிடைக்கவில்லை" taClassName="font-tamil" />
                </div>

                <h1 className={["section-heading mt-5 max-w-[12ch]", language === "ta" ? "font-tamil" : ""].join(" ")}>
                  <Lang en="We can't find that page." ta="அந்தப் பக்கத்தை கண்டுபிடிக்க முடியவில்லை." taClassName="font-tamil" />
                </h1>

                <p className={["mt-4 max-w-2xl text-sm text-churchBlue/75 sm:text-base", language === "ta" ? "font-tamil" : ""].join(" ")}>
                  <Lang
                    en="It may have moved, or the link may be incorrect. Head back to the homepage, search the site, or jump into one of these helpful sections."
                    ta="இந்தப் பக்கம் மாற்றப்பட்டிருக்கலாம், அல்லது இணைப்பு தவறாக இருக்கலாம். முகப்புக்கு திரும்பவும், தளத்தை தேடவும், அல்லது கீழே உள்ள உதவிகரமான பகுதிகளில் ஒன்றைத் திறக்கவும்."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/" className="btn btn-md btn-primary">
                    <Lang en="Go to Home" ta="முகப்புக்கு செல்லுங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/search" className="btn btn-md btn-secondary">
                    <Lang en="Search the Site" ta="தளத்தை தேடுங்கள்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-churchBlue/10 bg-[linear-gradient(180deg,rgba(231,244,255,0.9),rgba(255,255,255,1))] p-5 sm:p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">
                  <Lang en="Helpful links" ta="உதவிகரமான இணைப்புகள்" taClassName="font-tamil" />
                </div>
                <div className="mt-4 grid gap-3">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="focus-ring rounded-2xl border border-churchBlue/10 bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-churchBlue/20 hover:bg-churchBlueSoft/40"
                    >
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className={["mt-1 text-sm text-churchBlue/70", language === "ta" ? "font-tamil" : ""].join(" ")}>
                        {language === "ta" ? item.bodyTa : item.bodyEn}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-churchBlue/10 pt-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/contact" className="btn btn-md btn-secondary w-full">
                  <Lang en="Contact Us" ta="எங்களை தொடர்புகொள்ளுங்கள்" taClassName="font-tamil" />
                </Link>
                <Link href="/visit" className="btn btn-md btn-secondary w-full">
                  <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
                </Link>
                <Link href="/events" className="btn btn-md btn-secondary w-full">
                  <Lang en="View Events" ta="நிகழ்வுகளை பாருங்கள்" taClassName="font-tamil" />
                </Link>
                <Link href="/sermons" className="btn btn-md btn-secondary w-full">
                  <Lang en="Watch Sermons" ta="பிரசங்கங்களை பாருங்கள்" taClassName="font-tamil" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
