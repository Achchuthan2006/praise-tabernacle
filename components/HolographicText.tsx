export default function HolographicText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span className={["holographic", className ?? ""].join(" ").trim()} data-text={text}>
      {text}
    </span>
  )
}

