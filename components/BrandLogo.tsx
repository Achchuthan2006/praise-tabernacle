import Image from "next/image"

import { siteConfig } from "@/lib/site"

export default function BrandLogo({
  variant = "default",
  className,
  priority,
}: {
  variant?: "default" | "onDark"
  className?: string
  priority?: boolean
}) {
  const baseClassName = [
    "logo-icon h-auto w-[140px] select-none",
    variant === "onDark" ? "drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <>
      <span data-lang="en" lang="en">
        <Image
          src={siteConfig.branding.logoEnSrc}
          alt={siteConfig.nameEn}
          width={520}
          height={240}
          priority={priority}
          className={baseClassName}
        />
      </span>
      <span data-lang="ta" lang="ta">
        <Image
          src={siteConfig.branding.logoTaSrc}
          alt={siteConfig.nameTa}
          width={520}
          height={240}
          priority={priority}
          className={baseClassName}
        />
      </span>
    </>
  )
}
