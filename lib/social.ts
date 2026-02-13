import { siteConfig } from "@/lib/site"

export type SocialPost = {
  id: string
  platform: "Instagram" | "YouTube" | "Facebook"
  title: string
  excerpt: string
  href: string
  dateLabel: string
}

export type SocialImage = {
  id: string
  src: string
  alt: string
}

const instagramHref = siteConfig.instagramUrl || "https://www.instagram.com/"
const facebookHref = siteConfig.facebookUrl || "https://www.facebook.com/"
const youtubeHref = siteConfig.youtubeChannelUrl || "https://www.youtube.com/"

export const socialFeed: SocialPost[] = [
  {
    id: "p1",
    platform: "Instagram",
    title: "Sunday service highlights",
    excerpt: "A few moments from worship, prayer, and a short word of encouragement.",
    href: instagramHref,
    dateLabel: "This week",
  },
  {
    id: "p2",
    platform: "YouTube",
    title: "Latest sermon upload",
    excerpt: "Watch the most recent message from Sunday service.",
    href: youtubeHref,
    dateLabel: "Latest",
  },
  {
    id: "p3",
    platform: "Facebook",
    title: "Community updates",
    excerpt: "Upcoming events, prayer focus, and announcements.",
    href: facebookHref,
    dateLabel: "This month",
  },
]

export const instagramWallImages: SocialImage[] = [
  { id: "ig1", src: "/photos/home/church-life.webp", alt: "Church life" },
  { id: "ig2", src: "/photos/home/kids-ministry.webp", alt: "Kids ministry" },
  { id: "ig3", src: "/photos/home/adults-fellowship.webp", alt: "Adults fellowship" },
  { id: "ig4", src: "/photos/home/church-front.webp", alt: "Church front" },
  { id: "ig5", src: "/photos/home/church-front-2.webp", alt: "Church front" },
  { id: "ig6", src: "/photos/home/church-life.webp", alt: "Worship moments" },
]
