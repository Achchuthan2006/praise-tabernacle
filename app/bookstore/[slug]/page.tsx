import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { getStoreItemBySlug } from "@/lib/books"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const book = getStoreItemBySlug(resolvedParams.slug)
  if (!book) return { title: "Bookstore" }
  return pageMetadata({
    title: book.title,
    description: book.shortDescription,
    path: `/bookstore/${book.slug}`,
    image: book.imageSrc,
  })
}

export default async function BookDetailPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const book = getStoreItemBySlug(resolvedParams.slug)
  if (!book) notFound()

  const subject = encodeURIComponent(`Book order: ${book.title}`)
  const body = encodeURIComponent(
    `Hello Praise Tabernacle,\n\nI would like to purchase:\n- ${book.title} (${book.priceCad.toFixed(2)} CAD)\n\nName:\nPhone:\nPickup/Delivery:\n\nThank you.`,
  )
  const mailto = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`

  return (
    <>
      <PageHeader
        titleEn={book.title}
        titleTa="புத்தகம்"
        descriptionEn={book.shortDescription}
        descriptionTa={book.shortDescription}
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                    <div className="relative aspect-[16/10] w-full bg-churchBlueSoft">
                      <Image
                        src={book.imageSrc}
                        alt={book.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover"
                        quality={90}
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={1}>
                  <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        {book.author ? <div className="text-sm text-churchBlue/70">{book.author}</div> : null}
                        <div className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">{book.description}</div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex rounded-full border border-churchBlue/10 bg-churchBlueSoft px-4 py-2 text-sm font-semibold text-churchBlue/85">
                          ${book.priceCad.toFixed(2)} CAD
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={2}>
                  <div id="buy" className="mt-6 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <div className="text-sm font-semibold text-churchBlue">
                      <Lang en="Buy this book" ta="இந்த புத்தகத்தை வாங்க" taClassName="font-tamil" />
                    </div>
                    <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
                      <Lang
                        en="Tap Buy to email us your order. We’ll reply with pickup or delivery details."
                        ta="Buy-ஐ அழுத்தி உங்கள் ஆர்டரை மின்னஞ்சலில் அனுப்புங்கள். எடுப்பு/விநியோகம் விவரங்களுடன் நாங்கள் பதிலளிப்போம்."
                        taClassName="font-tamil"
                      />
                    </p>
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <a href={mailto} className="btn btn-md btn-primary">
                        <Lang en="Buy via email" ta="மின்னஞ்சல் மூலம்" taClassName="font-tamil" />
                      </a>
                      <Link href="/contact" className="btn btn-md btn-secondary">
                        <Lang en="Contact us" ta="தொடர்பு" taClassName="font-tamil" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="More" ta="மேலும்" taClassName="font-tamil" />
                  </div>
                  <div className="mt-4 grid gap-2">
                    <Link href="/bookstore" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Back to bookstore" ta="புத்தகக் கடை" taClassName="font-tamil" />
                    </Link>
                    <Link href="/sermons" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Sermon library" ta="பிரசங்க நூலகம்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
