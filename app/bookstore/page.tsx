import type { Metadata } from "next"

import BookstoreCatalog from "@/components/BookstoreCatalog"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { storeItems } from "@/lib/books"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Bookstore",
  description: "Browse books, devotionals, Bibles, photo prints, and wall frames.",
  path: "/bookstore",
})

export default function BookstorePage() {
  return (
    <>
      <PageHeader
        titleEn="Bookstore"
        titleTa="புத்தகக் கடை"
        descriptionEn="Books, devotionals, Bibles, photo prints, and wall frames."
        descriptionTa="புத்தகங்கள், தியானங்கள், வேதாகமங்கள், புகைப்படங்கள், மற்றும் சுவர் அலங்காரங்கள்."
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <BookstoreCatalog items={storeItems} />
          </div>
        </Container>
      </section>
    </>
  )
}

