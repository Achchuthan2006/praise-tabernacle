import type { Metadata } from "next"

import GalleryGrid from "@/components/GalleryGrid"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { mediaPhotos } from "@/lib/media"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Photos",
  description: "Photos from Praise Tabernacle — worship, ministry, and community moments.",
  path: "/photos",
})

export default function PhotosPage() {
  const images = mediaPhotos.map((p) => p.src)
  return (
    <>
      <PageHeader
        titleEn="Photos"
        titleTa="புகைப்படங்கள்"
        descriptionEn="A glimpse of church life."
        descriptionTa="சபை வாழ்க்கையின் சில தருணங்கள்."
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <GalleryGrid images={images} />
          </div>
        </Container>
      </section>
    </>
  )
}
