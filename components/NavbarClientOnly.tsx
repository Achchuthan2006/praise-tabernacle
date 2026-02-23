"use client"

import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"

export default function NavbarClientOnly() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div aria-hidden="true" className="h-16 xl:h-20" />
  }

  return <Navbar />
}
