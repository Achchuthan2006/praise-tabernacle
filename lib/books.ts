export type StoreCategory = "Devotionals" | "Bibles" | "Photos" | "Wall Frames"

export type StoreItem = {
  slug: string
  title: string
  author?: string
  category: StoreCategory
  priceCad: number
  imageSrc: string
  shortDescription: string
  description: string
}

export const storeItems: StoreItem[] = [
  {
    slug: "sample-devotional",
    title: "Sample Devotional",
    author: "Praise Tabernacle",
    category: "Devotionals",
    priceCad: 19.99,
    imageSrc: "/books/book-placeholder.svg",
    shortDescription: "A simple devotional to encourage your daily walk with Christ.",
    description:
      "Replace this sample book with your real inventory. Add a cover image in /public/books and update lib/books.ts with title, price, and details.",
  },
  {
    slug: "sample-bible-study-notes",
    title: "Sample Bible Study Notes",
    author: "Praise Tabernacle",
    category: "Devotionals",
    priceCad: 14.99,
    imageSrc: "/books/book-placeholder.svg",
    shortDescription: "Practical notes to help you grow in Scripture and prayer.",
    description:
      "This is a placeholder product. Add your real books, images, and pricing when ready.",
  },
  {
    slug: "sample-nkjv-bible",
    title: "Sample NKJV Bible",
    author: "New King James Version",
    category: "Bibles",
    priceCad: 34.99,
    imageSrc: "/books/book-placeholder.svg",
    shortDescription: "A placeholder product for an NKJV Bible.",
    description:
      "Add your real Bible products here (covers, editions, and pricing).",
  },
  {
    slug: "sample-photo-print",
    title: "Sample Photo Print",
    category: "Photos",
    priceCad: 9.99,
    imageSrc: "/books/book-placeholder.svg",
    shortDescription: "A sample photo print product (placeholder).",
    description:
      "Use this category for church photo prints, albums, or digital downloads (if offered).",
  },
  {
    slug: "sample-wall-frame",
    title: "Sample Wall Frame",
    category: "Wall Frames",
    priceCad: 24.99,
    imageSrc: "/books/book-placeholder.svg",
    shortDescription: "A sample wall frame product (placeholder).",
    description:
      "Use this category for wall frames, verse frames, or gifts (if offered).",
  },
]

export function getStoreItemBySlug(slug: string) {
  return storeItems.find((b) => b.slug === slug) ?? null
}
