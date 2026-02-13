"use client"

export default function PrintButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      className="btn btn-sm btn-secondary"
      onClick={() => window.print()}
    >
      {label}
    </button>
  )
}

