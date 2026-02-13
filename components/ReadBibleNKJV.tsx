import Link from "next/link"

import Container from "@/components/ui/Container"

const NKJV_GATEWAY_HREF =
  "https://www.biblegateway.com/versions/New-King-James-Version-NKJV-Bible/"

export default function ReadBibleNKJV() {
  return (
    <section className="bg-white">
      <Container className="pb-24 sm:pb-28">
        <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12 fade-up">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">Scripture</div>
              <h2 className="section-heading">Read the Bible (NKJV)</h2>
              <p className="mt-1 text-sm text-churchBlue/70">New King James Version</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm text-churchBlue/75 sm:text-base">
            Read the New King James Version (NKJV) online. We link to BibleGateway for the full NKJV text.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={NKJV_GATEWAY_HREF} target="_blank" rel="noreferrer" className="btn btn-md btn-primary">
              Start reading (BibleGateway)
            </a>
            <Link href="/bible" className="btn btn-md btn-secondary-soft">
              Open Bible page
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
