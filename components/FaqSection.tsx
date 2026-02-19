"use client"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import { visitFaqs } from "@/lib/visit"

export default function FaqSection() {
  return (
    <section className="relative bg-churchBlueSoft">
      <Container className="section-padding">
        <div className="feature-box rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12">
          <div className="max-w-2xl">
            <div className="section-kicker">
              <Lang en="FAQ" ta="அடிக்கடி கேட்கப்படும் கேள்விகள்" taClassName="font-tamil" />
            </div>
            <h2 className="section-heading">
              <Lang en="Common questions" ta="பொதுவான கேள்விகள்" taClassName="font-tamil" />
            </h2>
            <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
              <Lang
                en="Quick answers about service times, kids check-in, and what to expect."
                ta="ஆராதனை நேரம், குழந்தைகள் check-in, மற்றும் நீங்கள் எதிர்பார்க்கக்கூடியவை பற்றிய சுருக்கமான பதில்கள்."
                taClassName="font-tamil"
              />
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
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
      </Container>
    </section>
  )
}
