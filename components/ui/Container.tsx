import type { ComponentProps } from "react"

export default function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={["mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}
