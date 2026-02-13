"use client"

import Image from "next/image"
import Link from "next/link"

import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import Lang from "@/components/language/Lang"
import Reveal from "@/components/ui/Reveal"
import { pastorProfile } from "@/lib/pastor"
import { siteConfig } from "@/lib/site"
import { pastoralTeamVideos, visitFaqs, visitHighlights } from "@/lib/visit"

export default function NewVisitorJourney() {
  const tourVideoId = siteConfig.visit?.virtualTourVideoId ?? ""
  const tourImage = siteConfig.visit?.virtualTourImageSrc ?? "/photos/home/church-life.webp"

  return (
    <section className="border-t border-churchBlue/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="section-kicker">
            <Lang en="I’m New" ta="நான் புதிது" taClassName="font-tamil" />
          </div>
          <h2 className="section-heading mt-2">
            <Lang en="Your first visit, made simple" ta="முதல் வருகை, எளிமையாக" taClassName="font-tamil" />
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
            <Lang
              en="Everything you need to feel comfortable on Sunday - parking, service flow, kids check-in, and next steps."
              ta="ஞாயிற்றுக்கிழமை வந்தபோது நிம்மதியாக இருக்க தேவையான அனைத்தும் - வாகன நிறுத்தம், ஆராதனை நடைமுறை, குழந்தைகள் செக்-இன், அடுத்த படிகள்."
              taClassName="font-tamil"
            />
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {visitHighlights.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 3) as 0 | 1 | 2}>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                  <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang en={item.bodyEn} ta={item.bodyTa} taClassName="font-tamil" />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <div className="text-sm font-semibold text-churchBlue/70">
                <Lang en="Virtual tour" ta="வசதிகள் சுற்றுப்பார்வை" taClassName="font-tamil" />
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                <Lang en="Take a quick look around" ta="எங்கள் இடத்தை ஒரு பார்வை" taClassName="font-tamil" />
              </h3>
              <div className="mt-4 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                {tourVideoId ? (
                  <div className="aspect-video w-full">
                    <YouTubeLiteEmbed
                      kind="video"
                      videoId={tourVideoId}
                      title="Virtual tour"
                      load="visible"
                      autoplayOnLoad={false}
                      posterQuality="hq"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={tourImage}
                      alt="Church interior"
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm text-churchBlue/70">
                <Lang
                  en="Want a guided tour? Ask someone at the door and we’ll help."
                  ta="நேரடி சுற்றுப்பார்வை வேண்டுமா? வாசலில் உள்ளவரிடம் கேளுங்கள்."
                  taClassName="font-tamil"
                />
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <div className="text-sm font-semibold text-churchBlue/70">
                <Lang en="FAQ" ta="அடிக்கடி கேட்கப்படும் கேள்விகள்" taClassName="font-tamil" />
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                <Lang en="Questions we hear often" ta="பலர் கேட்கும் கேள்விகள்" taClassName="font-tamil" />
              </h3>
              <div className="mt-5 space-y-4">
                {visitFaqs.map((faq) => (
                  <div key={faq.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-5 py-4">
                    <div className="text-sm font-semibold text-churchBlue">
                      <Lang en={faq.questionEn} ta={faq.questionTa} taClassName="font-tamil" />
                    </div>
                    <div className="mt-2 text-sm text-churchBlue/70">
                      <Lang en={faq.answerEn} ta={faq.answerTa} taClassName="font-tamil" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-churchBlue/70">
                  <Lang en="Meet the pastoral team" ta="மேய்ப்பர் குழுவை சந்திக்கவும்" taClassName="font-tamil" />
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                  <Lang en="A quick hello from our leaders" ta="எங்கள் தலைவர்களின் ஒரு சிறு அறிமுகம்" taClassName="font-tamil" />
                </h3>
              </div>
              <Link href="/pastor" className="btn btn-sm btn-secondary">
                <Lang en="Pastor page" ta="போதகர் பக்கம்" taClassName="font-tamil" />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {pastoralTeamVideos.map((video) => (
                <div key={video.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en={video.nameEn} ta={video.nameTa} taClassName="font-tamil" />
                  </div>
                  <div className="mt-1 text-xs font-semibold text-churchBlue/60">
                    <Lang en={video.roleEn} ta={video.roleTa} taClassName="font-tamil" />
                  </div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-churchBlue/10 bg-white">
                    {video.videoId ? (
                      <div className="aspect-video w-full">
                        <YouTubeLiteEmbed
                          kind="video"
                          videoId={video.videoId}
                          title={video.nameEn}
                          load="click"
                          autoplayOnLoad={false}
                          posterQuality="hq"
                        />
                      </div>
                    ) : (
                      <div className="grid aspect-video place-items-center bg-churchBlueSoft text-sm text-churchBlue/70">
                        Video coming soon
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-churchBlue/70">
                    <Lang en={video.descriptionEn} ta={video.descriptionTa} taClassName="font-tamil" />
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-white p-5">
              <div className="text-sm font-semibold text-churchBlue">
                <Lang en="Next steps after your visit" ta="வருகைக்கு பின் அடுத்த படிகள்" taClassName="font-tamil" />
              </div>
              <p className="mt-2 text-sm text-churchBlue/70">
                <Lang
                  en="We’d love to help you take the next step in faith and community."
                  ta="அடுத்த படியை எடுக்க உங்களுக்கு உதவ விரும்புகிறோம்."
                  taClassName="font-tamil"
                />
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/groups" className="btn btn-sm btn-secondary">
                  <Lang en="Join a group" ta="குழுவில் சேருங்கள்" taClassName="font-tamil" />
                </Link>
                <Link href="/serve" className="btn btn-sm btn-secondary">
                  <Lang en="Serve" ta="சேவை" taClassName="font-tamil" />
                </Link>
                <Link href="/membership" className="btn btn-sm btn-secondary">
                  <Lang en="Membership" ta="உறுப்பினர்" taClassName="font-tamil" />
                </Link>
                <Link href="/contact" className="btn btn-sm btn-primary">
                  <Lang en="Contact us" ta="தொடர்பு" taClassName="font-tamil" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-churchBlue/70">
                  <Lang en="Meet the pastor" ta="போதகரை சந்திக்கவும்" taClassName="font-tamil" />
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                  <Lang en="Pastor Mano Tharmalingam" ta={pastorProfile.nameTa} taClassName="font-tamil" />
                </h3>
                <p className="mt-2 text-sm text-churchBlue/70">
                  <Lang
                    en="If you’re new, we’d love to say hello and answer any questions."
                    ta="புதியவராக இருந்தால், உங்களை சந்தித்து உங்கள் கேள்விகளுக்கு பதில் அளிக்க விரும்புகிறோம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/pastor" className="btn btn-sm btn-secondary">
                  <Lang en="Pastor page" ta="போதகர் பக்கம்" taClassName="font-tamil" />
                </Link>
                <Link href="/contact" className="btn btn-sm btn-primary">
                  <Lang en="Send a message" ta="செய்தி அனுப்பு" taClassName="font-tamil" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
