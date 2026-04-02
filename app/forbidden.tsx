import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"

export default function ForbiddenPage() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)]">
      <Container className="section-padding">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-churchBlue/10 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(15,84,118,0.45)] sm:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-churchBlue/10 bg-churchBlueSoft px-4 py-2 text-xs font-semibold tracking-[0.24em] text-churchBlue/70">
            <span className="rounded-full bg-white px-2 py-1 text-churchBlue">Notice</span>
            <Lang en="This page isn’t available" ta="இந்தப் பக்கம் கிடைக்கவில்லை" taClassName="font-tamil" />
          </div>

          <h1 className="section-heading mt-5 max-w-[12ch]">
            <Lang
              en="We’ll keep you on the main path."
              ta="உங்களை முக்கிய பாதையில் வைத்திருக்கிறோம்."
              taClassName="font-tamil"
            />
          </h1>

          <p className="section-lead mt-4 max-w-2xl">
            <Lang
              en="The page you opened is not meant for public use. Head back to the main website and continue from there."
              ta="நீங்கள் திறந்த பக்கம் பொதுப் பயன்பாட்டிற்காக அல்ல. முக்கிய இணையதளத்திற்கு திரும்பி அங்கிருந்து தொடருங்கள்."
              taClassName="font-tamil"
            />
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-md btn-primary">
              <Lang en="Go Home" ta="முகப்புக்கு செல்லுங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/visit" className="btn btn-md btn-secondary">
              <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/prayer" className="btn btn-md btn-secondary">
              <Lang en="Request Prayer" ta="ஜெபம் கோருங்கள்" taClassName="font-tamil" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
