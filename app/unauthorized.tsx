import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"

export default function UnauthorizedPage() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)]">
      <Container className="section-padding">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-churchBlue/10 bg-white p-8 shadow-[0_24px_70px_-44px_rgba(15,84,118,0.45)] sm:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-churchBlue/10 bg-churchBlueSoft px-4 py-2 text-xs font-semibold tracking-[0.24em] text-churchBlue/70">
            <span className="rounded-full bg-white px-2 py-1 text-churchBlue">Access</span>
            <Lang en="This page is restricted" ta="இந்தப் பக்கம் கட்டுப்படுத்தப்பட்டுள்ளது" taClassName="font-tamil" />
          </div>

          <h1 className="section-heading mt-5 max-w-[12ch]">
            <Lang
              en="Let’s send you somewhere helpful."
              ta="உங்களுக்கு உதவியாக இருக்கும் இடத்துக்கு செல்லலாம்."
              taClassName="font-tamil"
            />
          </h1>

          <p className="section-lead mt-4 max-w-2xl">
            <Lang
              en="That page isn’t available for public browsing. You can continue with a normal church page below."
              ta="இந்தப் பக்கம் பொதுமக்கள் பார்வைக்கு கிடைக்காது. கீழே உள்ள சாதாரண சபை பக்கங்களில் ஒன்றிற்கு செல்லலாம்."
              taClassName="font-tamil"
            />
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-md btn-primary">
              <Lang en="Go Home" ta="முகப்புக்கு செல்லுங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/events" className="btn btn-md btn-secondary">
              <Lang en="View Events" ta="நிகழ்வுகளை பாருங்கள்" taClassName="font-tamil" />
            </Link>
            <Link href="/contact" className="btn btn-md btn-secondary">
              <Lang en="Contact Church" ta="சபையுடன் தொடர்புகொள்ள" taClassName="font-tamil" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
