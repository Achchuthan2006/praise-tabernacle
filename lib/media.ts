export type MediaPhoto = {
  src: string
  fallbackSrc?: string
  alt: string
  label: string
  href?: string
}

export const mediaPhotos: MediaPhoto[] = [
  {
    src: "/photos/home/church-life.jpeg",
    fallbackSrc: "/event-family.svg",
    alt: "Church life at Praise Tabernacle",
    label: "Church Life",
    href: "/events",
  },
  {
    src: "/photos/home/adults-fellowship.jpeg",
    fallbackSrc: "/event-teaching.svg",
    alt: "Adults fellowship at Praise Tabernacle",
    label: "Fellowship",
    href: "/groups",
  },
  {
    src: "/photos/home/church-front.jpg",
    fallbackSrc: "/event-holiday.svg",
    alt: "Praise Tabernacle church front",
    label: "Church Front",
    href: "/visit",
  },
  {
    src: "/photos/home/church-front-2.jpeg",
    fallbackSrc: "/event-community.svg",
    alt: "Praise Tabernacle church building",
    label: "Our Church",
    href: "/about",
  },
  {
    src: "/photos/home/kids-ministry.jpeg",
    fallbackSrc: "/event-teaching.svg",
    alt: "Kids ministry at Praise Tabernacle",
    label: "Kids Ministry",
    href: "/ministries/kids",
  },
]
