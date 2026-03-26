import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { confirmNewsletterSubscription } from "@/lib/newsletter"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Newsletter Confirmation",
  description: "Confirm your Praise Tabernacle newsletter signup.",
  path: "/newsletter/confirm",
})

export default async function NewsletterConfirmPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const token = (resolvedSearchParams?.token ?? "").trim()
  const result = await confirmNewsletterSubscription(token)

  const isSuccess = result.status === "confirmed" || result.status === "already_confirmed"

  return (
    <>
      <PageHeader
        titleEn="Newsletter"
        titleTa="செய்திமடல்"
        descriptionEn="Email confirmation"
        descriptionTa="மின்னஞ்சல் உறுதிப்படுத்தல்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-2xl rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
            <div className={["text-sm font-semibold", isSuccess ? "text-emerald-700" : "text-churchBlue"].join(" ")}>
              <Lang
                en={
                  result.status === "confirmed"
                    ? "Subscription confirmed"
                    : result.status === "already_confirmed"
                      ? "Already confirmed"
                      : result.status === "expired"
                        ? "Confirmation link expired"
                        : "Invalid confirmation link"
                }
                ta={
                  result.status === "confirmed"
                    ? "சந்தா உறுதிப்படுத்தப்பட்டது"
                    : result.status === "already_confirmed"
                      ? "ஏற்கனவே உறுதிப்படுத்தப்பட்டுள்ளது"
                      : result.status === "expired"
                        ? "உறுதிப்படுத்தும் இணைப்பு காலாவதியானது"
                        : "செல்லுபடியாகாத உறுதிப்படுத்தல் இணைப்பு"
                }
                taClassName="font-tamil"
              />
            </div>

            <p className="mt-3 text-sm text-churchBlue/75 sm:text-base">
              <Lang
                en={
                  result.status === "confirmed"
                    ? "Thanks for confirming. You'll now receive church newsletter updates."
                    : result.status === "already_confirmed"
                      ? "This email address is already confirmed for newsletter updates."
                      : result.status === "expired"
                        ? "Please sign up again from the homepage so we can send you a fresh confirmation email."
                        : "That confirmation link is missing or invalid. Please try signing up again."
                }
                ta={
                  result.status === "confirmed"
                    ? "உறுதிப்படுத்தியதற்கு நன்றி. இனி சபை செய்திமடல் புதுப்பிப்புகளை பெறுவீர்கள்."
                    : result.status === "already_confirmed"
                      ? "இந்த மின்னஞ்சல் முகவரி ஏற்கனவே செய்திமடலுக்கு உறுதிப்படுத்தப்பட்டுள்ளது."
                      : result.status === "expired"
                        ? "புதிய உறுதிப்படுத்தல் மின்னஞ்சலை அனுப்ப, முகப்புப் பக்கத்தில் இருந்து மீண்டும் பதிவு செய்யவும்."
                        : "இந்த இணைப்பு தவறானது அல்லது இல்லை. தயவுசெய்து மீண்டும் பதிவு செய்யவும்."
                }
                taClassName="font-tamil"
              />
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-md btn-primary">
                <Lang en="Back to homepage" ta="முகப்புக்கு திரும்ப" taClassName="font-tamil" />
              </Link>
              <Link href="/contact" className="btn btn-md btn-secondary">
                <Lang en="Contact us" ta="எங்களை தொடர்புகொள்ள" taClassName="font-tamil" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
