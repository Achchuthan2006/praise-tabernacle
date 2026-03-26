type ProviderKey = "tithely" | "paypal" | "stripe" | "church-center" | "generic"

function normalize(value: string) {
  return value.trim().toLowerCase()
}

export function detectGivingProvider(processorName?: string, href?: string): ProviderKey {
  const name = normalize(processorName ?? "")
  const url = normalize(href ?? "")
  const source = `${name} ${url}`

  if (source.includes("tithe.ly") || source.includes("tithely")) return "tithely"
  if (source.includes("paypal")) return "paypal"
  if (source.includes("stripe")) return "stripe"
  if (source.includes("church center") || source.includes("churchcenter") || source.includes("planningcenter")) {
    return "church-center"
  }

  return "generic"
}

export function getGivingProviderLabel(processorName?: string, href?: string) {
  const key = detectGivingProvider(processorName, href)
  if (processorName?.trim()) return processorName.trim()

  switch (key) {
    case "tithely":
      return "Tithe.ly"
    case "paypal":
      return "PayPal"
    case "stripe":
      return "Stripe"
    case "church-center":
      return "Church Center"
    default:
      return "our secure giving provider"
  }
}

export function getGivingProviderCta(processorName?: string, href?: string) {
  const key = detectGivingProvider(processorName, href)
  const label = getGivingProviderLabel(processorName, href)

  switch (key) {
    case "paypal":
      return `Donate with ${label}`
    case "stripe":
      return `Give with ${label}`
    case "tithely":
      return `Give with ${label}`
    case "church-center":
      return `Open ${label}`
    default:
      return `Open ${label}`
  }
}
