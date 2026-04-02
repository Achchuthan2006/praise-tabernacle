"use client"

import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="bg-[linear-gradient(180deg,#f7fbff_0%,#eef5ff_100%)]">
      <Container className="section-padding">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-churchBlue/10 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(15,84,118,0.45)] sm:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-churchBlue/10 bg-churchBlueSoft px-4 py-2 text-xs font-semibold tracking-[0.24em] text-churchBlue/70">
            <span className="rounded-full bg-white px-2 py-1 text-churchBlue">Error</span>
            <Lang en="Something went wrong" ta="ஏதோ தவறு ஏற்பட்டது" taClassName="font-tamil" />
          </div>

          <h1 className="section-heading mt-5 max-w-[14ch]">
            <Lang
              en="We’re still here. Let’s get you back on track."
              ta="நாங்கள் இங்கே இருக்கிறோம். உங்களை சரியான வழிக்கு திருப்புகிறோம்."
              taClassName="font-tamil"
            />
          </h1>

          <p className="section-lead mt-4 max-w-2xl">
            <Lang
              en="A page or feature ran into a problem. You can try again, return home, or open a key church page below."
              ta="இந்தப் பக்கம் அல்லது வசதியில் ஒரு சிக்கல் ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கலாம், முகப்புக்கு திரும்பலாம், அல்லது கீழே உள்ள முக்கிய சபை பக்கங்களில் ஒன்றைத் திறக்கலாம்."
              taClassName="font-tamil"
            />
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => reset()} className="btn btn-md btn-primary">
              <Lang en="Try Again" ta="மீண்டும் முயற்சிக்க" taClassName="font-tamil" />
            </button>
            <Link href="/" className="btn btn-md btn-secondary">
              <Lang en="Go Home" ta="முகப்புக்கு செல்லுங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/contact" className="btn btn-md btn-secondary">
              <Lang en="Contact Church" ta="சபையுடன் தொடர்புகொள்ள" taClassName="font-tamil" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link href="/visit" className="focus-ring rounded-2xl border border-churchBlue/10 bg-churchBlueSoft/35 px-4 py-4 text-sm font-semibold text-churchBlue transition hover:bg-churchBlueSoft">
              <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/sermons" className="focus-ring rounded-2xl border border-churchBlue/10 bg-churchBlueSoft/35 px-4 py-4 text-sm font-semibold text-churchBlue transition hover:bg-churchBlueSoft">
              <Lang en="Watch Sermons" ta="பிரசங்கங்களை பாருங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/events" className="focus-ring rounded-2xl border border-churchBlue/10 bg-churchBlueSoft/35 px-4 py-4 text-sm font-semibold text-churchBlue transition hover:bg-churchBlueSoft">
              <Lang en="View Events" ta="நிகழ்வுகளை பாருங்கள்" taClassName="font-tamil" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
