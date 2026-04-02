import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"

const ministries = [
  {
    href: "/ministries/kids",
    titleEn: "Kids Ministry",
    titleTa: "à®•à¯à®´à®¨à¯à®¤à¯ˆà®•à®³à¯ à®Šà®´à®¿à®¯à®®à¯",
    bodyEn: "Safe, joyful, Bible-rich spaces where children can grow in faith.",
    bodyTa: "à®•à¯à®´à®¨à¯à®¤à¯ˆà®•à®³à¯ à®µà®¿à®šà¯à®µà®¾à®šà®¤à¯à®¤à®¿à®²à¯ à®µà®³à®° à®ªà®¾à®¤à¯à®•à®¾à®ªà¯à®ªà®¾à®©, à®®à®•à®¿à®´à¯à®šà¯à®šà®¿à®¯à®¾à®©, à®µà¯‡à®¤à®¾à®•à®® à®¨à®¿à®±à¯ˆà®¨à¯à®¤ à®‡à®Ÿà®™à¯à®•à®³à¯.",
  },
  {
    href: "/ministries/youth",
    titleEn: "Youth Ministry",
    titleTa: "à®‡à®³à¯ˆà®žà®°à¯ à®Šà®´à®¿à®¯à®®à¯",
    bodyEn: "A place for students and young adults to belong, ask questions, and lead boldly.",
    bodyTa: "à®®à®¾à®£à®µà®°à¯à®•à®³à¯à®®à¯ à®‡à®³à®®à¯ à®µà®¯à®¤à®¿à®©à®°à¯à®®à¯ à®šà¯‡à®°à¯à®¨à¯à®¤à®¿à®°à¯à®•à¯à®•, à®•à¯‡à®³à¯à®µà®¿à®•à®³à¯ à®•à¯‡à®•à¯à®•, à®¤à¯ˆà®°à®¿à®¯à®®à®¾à®• à®¤à®²à¯ˆà®®à¯ˆ à®µà®•à®¿à®•à¯à®• à®’à®°à¯ à®‡à®Ÿà®®à¯.",
  },
  {
    href: "/ministries/prayer-care",
    titleEn: "Prayer & Care",
    titleTa: "à®œà¯†à®ªà®®à¯ à®®à®±à¯à®±à¯à®®à¯ à®…à®•à¯à®•à®±à¯ˆ",
    bodyEn: "Walk with people through prayer, encouragement, healing, and practical care.",
    bodyTa: "à®œà¯†à®ªà®®à¯, à®Šà®•à¯à®•à®®à¯, à®šà¯à®•à®®à®³à®¿à®¤à¯à®¤à®²à¯, à®¨à®Ÿà¯ˆà®®à¯à®±à¯ˆ à®…à®•à¯à®•à®±à¯ˆ à®®à¯‚à®²à®®à¯ à®®à®•à¯à®•à®³à¯‹à®Ÿà¯ à®¨à®Ÿà®™à¯à®•à¯à®™à¯à®•à®³à¯.",
  },
  {
    href: "/ministries/outreach",
    titleEn: "Outreach & Missions",
    titleTa: "à®µà¯†à®³à®¿à®šà¯à®šà¯‡à®µà¯ˆ à®®à®±à¯à®±à¯à®®à¯ à®®à®¿à®·à®©à¯",
    bodyEn: "Share Christ's love in the city and support Gospel work beyond our church walls.",
    bodyTa: "à®¨à®•à®°à®¤à¯à®¤à®¿à®²à¯ à®•à®¿à®±à®¿à®¸à¯à®¤à¯à®µà®¿à®©à¯ à®…à®©à¯à®ªà¯ˆ à®ªà®•à®¿à®°à¯à®™à¯à®•à®³à¯; à®šà®ªà¯ˆà®•à¯à®•à¯ à®…à®ªà¯à®ªà®¾à®²à¯à®®à¯ à®šà¯à®µà®¿à®šà¯‡à®· à®ªà®£à®¿à®¯à¯ˆ à®†à®¤à®°à®¿à®¯à¯à®™à¯à®•à®³à¯.",
  },
]

export default function HomeMinistriesSection() {
  return (
    <section className="section-soft-stage">
      <Container className="section-padding">
        <div className="content-shell-wide premium-surface p-6 md:p-8 lg:p-10">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="section-kicker">
                  <Lang en="Ministries" ta="à®Šà®´à®¿à®¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en="Find your place to grow and serve" ta="à®µà®³à®°à¯à®µà®¤à®±à¯à®•à¯à®®à¯ à®šà¯‡à®µà¯ˆ à®šà¯†à®¯à¯à®µà®¤à®±à¯à®•à¯à®®à¯ à®‰à®™à¯à®•à®³à¯ à®‡à®Ÿà®¤à¯à®¤à¯ˆ à®•à®£à¯à®Ÿà¯à®ªà®¿à®Ÿà®¿à®¯à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </h2>
                <p className="section-lead mt-4">
                  <Lang
                    en="From children and youth to prayer, care, and outreach, every ministry is designed to help people belong and mature in Christ."
                    ta="à®•à¯à®´à®¨à¯à®¤à¯ˆà®•à®³à¯, à®‡à®³à¯ˆà®žà®°à¯, à®œà¯†à®ªà®®à¯, à®…à®•à¯à®•à®±à¯ˆ, à®µà¯†à®³à®¿à®šà¯à®šà¯‡à®µà¯ˆ à®µà®°à¯ˆ, à®’à®µà¯à®µà¯Šà®°à¯ à®Šà®´à®¿à®¯à®®à¯à®®à¯ à®®à®•à¯à®•à®³à¯ à®•à®¿à®±à®¿à®¸à¯à®¤à¯à®µà®¿à®²à¯ à®šà¯‡à®°à¯à®¨à¯à®¤à®¿à®°à¯à®•à¯à®•à®µà¯à®®à¯ à®µà®³à®°à¯à®µà®¤à®±à¯à®•à¯à®®à¯ à®µà®Ÿà®¿à®µà®®à¯ˆà®•à¯à®•à®ªà¯à®ªà®Ÿà¯à®Ÿà¯à®³à¯à®³à®¤à¯."
                    taClassName="font-tamil"
                  />
                </p>
              </div>

              <Link href="/ministries" className="btn btn-md btn-secondary">
                <Lang en="View All Ministries" ta="à®…à®©à¯ˆà®¤à¯à®¤à¯ à®Šà®´à®¿à®¯à®™à¯à®•à®³à¯ˆà®ªà¯ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ministries.map((ministry, index) => (
              <Reveal key={ministry.href} delay={index === 0 ? 0 : index === 1 ? 1 : 2}>
                <Link href={ministry.href} className="card h-full rounded-[28px] focus-ring">
                  <div className="card-content p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4941a]">Ministry</div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-churchBlue">
                      <Lang en={ministry.titleEn} ta={ministry.titleTa} taClassName="font-tamil" />
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-churchBlue/72">
                      <Lang en={ministry.bodyEn} ta={ministry.bodyTa} taClassName="font-tamil" />
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-churchBlue/78">
                      <Lang en="Explore ministry" ta="à®Šà®´à®¿à®¯à®¤à¯à®¤à¯ˆ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                      <span aria-hidden="true">›</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
