"use client"

import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[72px] border-b border-white/10 bg-[linear-gradient(to_right,rgba(15,23,42,0.92),rgba(30,64,175,0.85))]"
      aria-hidden="true"
    />
  ),
})

export default function NavbarClientOnly() {
  return <Navbar />
}

