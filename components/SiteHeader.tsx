import AnnouncementBar from "@/components/AnnouncementBar"
import NavbarClientOnly from "@/components/NavbarClientOnly"

export default function SiteHeader() {
  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />
      <NavbarClientOnly />
    </div>
  )
}
