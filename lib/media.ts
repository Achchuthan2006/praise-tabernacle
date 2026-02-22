export type MediaPhoto = {
  src: string
  fallbackSrc?: string
  alt: string
  label: string
  href?: string
}

export const mediaPhotos: MediaPhoto[] = [
  {
    src: "/photos/home/church-life.webp",
    fallbackSrc: "/photos/home/church-life.jpeg",
    alt: "Church life at Praise Tabernacle",
    label: "Church Life",
    href: "/events",
  },
  {
    src: "/photos/home/adults-fellowship.webp",
    fallbackSrc: "/photos/home/adults-fellowship.jpeg",
    alt: "Adults fellowship at Praise Tabernacle",
    label: "Fellowship",
    href: "/groups",
  },
  {
    src: "/photos/home/church-front.webp",
    fallbackSrc: "/photos/home/church-front.jpg",
    alt: "Praise Tabernacle church front",
    label: "Church Front",
    href: "/visit",
  },
  {
    src: "/photos/home/church-front-2.webp",
    fallbackSrc: "/photos/home/church-front-2.jpeg",
    alt: "Praise Tabernacle church building",
    label: "Our Church",
    href: "/about",
  },
  {
    src: "/photos/home/kids-ministry.webp",
    fallbackSrc: "/photos/home/kids-ministry.jpeg",
    alt: "Kids ministry at Praise Tabernacle",
    label: "Kids Ministry",
    href: "/ministries/kids",
  },
]
