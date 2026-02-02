import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Pastor",
  description: "Meet our pastor and leadership at Praise Tabernacle.",
}

export default function PastorPage() {
  return (
    <>
      <PageHeader
        titleEn="Pastor"
        titleTa="போதகர்"
        descriptionEn="Pastoral care with a calm, respectful, and family-friendly heart."
        descriptionTa="அமைதி, மரியாதை, குடும்ப அக்கறையுடன் கூடிய மேய்ப்புப் பராமரிப்பு."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
              <div className="grid h-full place-items-center bg-[radial-gradient(30rem_20rem_at_20%_20%,rgb(10_29_92_/0.08),transparent_60%)] p-10 text-center">
                <div>
                  <div className="text-sm font-semibold text-churchBlue">Pastor photo</div>
                  <div className="mt-1 text-sm text-churchBlue/70">
                    Add an image at `public/pastor-mano.jpg` when ready.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
              Pastor Mano Tharmalingam
            </h2>
            <p className="mt-2 text-sm text-churchBlue/70 font-tamil">
              போதகர் மனோ தர்மலிங்கம்
            </p>

            <div className="mt-6 space-y-4 text-sm text-churchBlue/75 sm:text-base">
              <p>
                Our pastor and leadership team are here to pray with you, listen, and
                help you take a gentle next step with Jesus — whether you’re new to
                faith or returning after a long time.
              </p>
              <p className="font-tamil">
                எங்கள் போதகரும் தலைமைக் குழுவும் உங்களுடன் சேர்ந்து ஜெபிக்கவும்,
                கேட்கவும், இயேசுவுடன் மெதுவான அடுத்த படியை எடுக்க உதவவும் இங்கே
                இருக்கிறார்கள் — நீங்கள் புதியவராக இருந்தாலும், நீண்ட இடைவெளிக்குப் பின்
                மீண்டும் வருகிறவராக இருந்தாலும்.
              </p>

              <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <h3 className="text-base font-semibold text-churchBlue">What we care about</h3>
                <p className="mt-1 text-sm text-churchBlue/70 font-tamil">எங்கள் அக்கறைகள்</p>
                <ul className="mt-4 grid gap-3 text-sm text-churchBlue/75">
                  <li className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                    Warm, Bible-based teaching that is easy to understand
                  </li>
                  <li className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                    Prayer and support for families, youth, and newcomers
                  </li>
                  <li className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                    A respectful space to ask questions and grow at your own pace
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
