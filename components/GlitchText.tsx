export default function GlitchText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span className={["glitch", className ?? ""].join(" ").trim()} data-text={text}>
      {text}
    </span>
  )
}

