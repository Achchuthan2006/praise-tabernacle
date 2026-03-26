import AnnouncementBar from "@/components/AnnouncementBar"
import NavbarClientOnly from "@/components/NavbarClientOnly"

export default function SiteHeader() {
  return (
    <div className="relative z-50">
      <AnnouncementBar />
      <NavbarClientOnly />
    </div>
  )
}
