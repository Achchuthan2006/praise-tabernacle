"use client"

import Link from "next/link"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"

export default function NotFound() {
  const { language } = useLanguage()

  return (
    <section className="bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow sm:p-10">
            <div className="section-kicker">
              <Lang en="Page not found" ta="பக்கம் கிடைக்கவில்லை" taClassName="font-tamil" />
            </div>

            <h1 className={["section-heading mt-3", language === "ta" ? "font-tamil" : ""].join(" ")}>
              <Lang
                en="We can’t find that page."
                ta="அந்த பக்கத்தை கண்டுபிடிக்க முடியவில்லை."
                taClassName="font-tamil"
              />
            </h1>

            <p className={["mt-4 text-sm text-churchBlue/75 sm:text-base", language === "ta" ? "font-tamil" : ""].join(" ")}>
              <Lang
                en="It may have moved, or the link may be incorrect. You can return to the homepage or choose a section below."
                ta="அந்தப் பக்கம் மாற்றப்பட்டிருக்கலாம், அல்லது இணைப்பு தவறாக இருக்கலாம். முகப்புப் பக்கத்திற்கு திரும்பலாம் அல்லது கீழே உள்ள பகுதிகளைத் தேர்ந்தெடுக்கலாம்."
                taClassName="font-tamil"
              />
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href="/" className="btn btn-md btn-primary w-full">
                <Lang en="Go to Home" ta="முகப்புக்கு செல்லுங்கள்" taClassName="font-tamil" />
              </Link>
              <Link href="/contact" className="btn btn-md btn-secondary w-full">
                <Lang en="Contact Us" ta="தொடர்பு கொள்ளுங்கள்" taClassName="font-tamil" />
              </Link>
              <Link href="/visit" className="btn btn-md btn-secondary w-full">
                <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
              </Link>
              <Link href="/events" className="btn btn-md btn-secondary w-full">
                <Lang en="View Events" ta="நிகழ்வுகளை பார்க்கவும்" taClassName="font-tamil" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

