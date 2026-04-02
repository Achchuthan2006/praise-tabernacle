import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description: "Bible study tools, sermons, articles, magazines, and practical guides from Praise Tabernacle.",
  path: "/resources",
})

const featuredResources = [
  {
    href: "/bible",
    titleEn: "Read the Bible",
    titleTa: "வேதாகமத்தை வாசிக்க",
    bodyEn: "Open Scripture, browse the Tamil Bible link, and explore Bible study tools.",
    bodyTa: "வேதாகமத்தைத் திறந்து வாசிக்கவும், தமிழ் வேதாகம இணைப்பைப் பயன்படுத்தவும், வேதாகமப் படிப்பு உதவிகளை காணவும்.",
    ctaEn: "Open Bible",
    ctaTa: "வேதாகமத்தைத் திற",
  },
  {
    href: "/sermons",
    titleEn: "Sermons Archive",
    titleTa: "பிரசங்க களஞ்சியம்",
    bodyEn: "Watch recent messages, browse by topic, and revisit series in Tamil and English.",
    bodyTa: "சமீபத்திய செய்திகளைப் பாருங்கள், தலைப்புகளின்படி தேடுங்கள், தமிழ் மற்றும் ஆங்கில தொடர்களை மீண்டும் காணுங்கள்.",
    ctaEn: "Browse sermons",
    ctaTa: "பிரசங்கங்களைப் பார்",
  },
  {
    href: "/blog",
    titleEn: "Blog & Articles",
    titleTa: "வலைப்பதிவு மற்றும் கட்டுரைகள்",
    bodyEn: "Read devotionals, church updates, testimonies, and practical encouragement.",
    bodyTa: "ஆவிக்குரிய சிந்தனைகள், சபை அறிவிப்புகள், சாட்சிகள், மற்றும் நடைமுறை ஊக்கங்களை வாசிக்கவும்.",
    ctaEn: "Read articles",
    ctaTa: "கட்டுரைகளை வாசிக்க",
  },
  {
    href: "/magazine",
    titleEn: "Monthly Magazine",
    titleTa: "மாத இதழ்",
    bodyEn: "Open the latest digital magazine and download available issues.",
    bodyTa: "சமீபத்திய டிஜிட்டல் இதழைப் பார்க்கவும், கிடைக்கும் பதிப்புகளை பதிவிறக்கவும்.",
    ctaEn: "View magazine",
    ctaTa: "இதழைப் பார்",
  },
] as const

const studyTools = [
  {
    href: "/bible-studies",
    titleEn: "Bible Studies",
    titleTa: "வேதாகமப் படிப்புகள்",
    bodyEn: "Video teaching sessions for spiritual growth and practical discipleship.",
    bodyTa: "ஆவிக்குரிய வளர்ச்சிக்கும் நடைமுறை சீஷத்துவத்திற்குமான வீடியோ போதனைகள்.",
  },
  {
    href: "/devotionals",
    titleEn: "Devotionals",
    titleTa: "தினசரி தியானங்கள்",
    bodyEn: "Short reflections with Scripture and encouragement for daily life.",
    bodyTa: "வேதாகம வசனங்களுடன் தினசரி வாழ்க்கைக்கான குறுங்கால தியானங்கள் மற்றும் ஊக்கம்.",
  },
  {
    href: "/calendar",
    titleEn: "Calendar & Dates",
    titleTa: "அட்டவணை மற்றும் தேதிகள்",
    bodyEn: "Stay aware of special services, classes, and upcoming church gatherings.",
    bodyTa: "சிறப்பு ஆராதனைகள், வகுப்புகள், மற்றும் வரவிருக்கும் சபை நிகழ்வுகளை அறிந்து கொள்ளுங்கள்.",
  },
] as const

const practicalGuides = [
  {
    href: "/learn/baptism",
    titleEn: "Baptism",
    titleTa: "ஞானஸ்நானம்",
  },
  {
    href: "/learn/community-safety",
    titleEn: "Community Safety",
    titleTa: "சமூக பாதுகாப்பு",
  },
  {
    href: "/learn/building-rental",
    titleEn: "Building Rental",
    titleTa: "கட்டிடம் வாடகை",
  },
  {
    href: "/learn/weddings",
    titleEn: "Weddings",
    titleTa: "திருமணங்கள்",
  },
] as const

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        titleEn="Resources"
        titleTa="வளங்கள்"
        descriptionEn="Helpful tools for worship, learning, reading, and growing throughout the week."
        descriptionTa="வாரம் முழுவதும் ஆராதனை, கற்றல், வாசிப்பு, மற்றும் ஆவிக்குரிய வளர்ச்சிக்கான உதவிகரமான வளங்கள்."
      />

      <section className="section-soft-stage">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="premium-surface p-8 md:p-10">
                <div className="section-kicker">
                  <Lang en="Library" ta="நூலகம்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Everything in one place" ta="அனைத்தும் ஒரே இடத்தில்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="This page gathers the main teaching, reading, and practical church resources so you can find what you need quickly."
                    ta="இந்தப் பக்கம் முக்கியமான போதனை, வாசிப்பு, மற்றும் நடைமுறை சபை வளங்களை ஒரே இடத்தில் சேர்க்கிறது; தேவையானதை விரைவாகக் காணலாம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredResources.map((item, idx) => (
                <Reveal key={item.href} delay={idx === 0 ? 0 : idx === 1 ? 1 : idx === 2 ? 2 : 3}>
                  <div className="card flex h-full flex-col p-7">
                    <h2 className="text-xl font-semibold tracking-tight text-churchBlue">
                      <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={item.bodyEn} ta={item.bodyTa} taClassName="font-tamil" />
                    </p>
                    <div className="mt-6">
                      <Link href={item.href} className="btn btn-md btn-secondary w-full">
                        <Lang en={item.ctaEn} ta={item.ctaTa} taClassName="font-tamil" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <div className="premium-surface p-8">
                  <div className="section-kicker">
                    <Lang en="Study Tools" ta="படிப்பு உதவிகள்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading mt-2">
                    <Lang en="Keep growing during the week" ta="வாரம் முழுவதும் வளர்ந்து கொள்ளுங்கள்" taClassName="font-tamil" />
                  </h2>
                  <div className="mt-6 grid gap-4">
                    {studyTools.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="card focus-ring block p-5"
                      >
                        <div className="text-base font-semibold text-churchBlue">
                          <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-churchBlue/75">
                          <Lang en={item.bodyEn} ta={item.bodyTa} taClassName="font-tamil" />
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={1}>
                <div className="premium-surface p-8">
                  <div className="section-kicker">
                    <Lang en="Practical Guides" ta="நடைமுறை வழிகாட்டிகள்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading mt-2">
                    <Lang en="Helpful information for church life" ta="சபை வாழ்க்கைக்கான உதவிகரமான தகவல்கள்" taClassName="font-tamil" />
                  </h2>
                  <div className="mt-6 space-y-3">
                    {practicalGuides.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="card focus-ring flex items-center justify-between px-5 py-4 text-sm font-semibold text-churchBlue"
                      >
                        <span>
                          <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                        </span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
