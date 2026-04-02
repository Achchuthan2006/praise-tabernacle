export type Language = "en" | "ta"

export const DEFAULT_LANGUAGE: Language = "en"
export const LANGUAGE_STORAGE_KEY = "pt_lang"

const LANGUAGE_PREFIX_RE = /^\/(en|ta)(?=\/|$)/

export function isLanguage(value: string): value is Language {
  return value === "en" || value === "ta"
}

export function stripLanguagePrefix(path: string): string {
  if (!path) return "/"
  const stripped = path.replace(LANGUAGE_PREFIX_RE, "")
  return stripped || "/"
}

export function localizePath(path: string, lang: Language): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path

  const suffixIndex = path.search(/[?#]/)
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex)
  const suffix = suffixIndex === -1 ? "" : path.slice(suffixIndex)
  const normalizedPath = stripLanguagePrefix(pathname)

  if (normalizedPath === "/") {
    return `/${lang}${suffix}`
  }

  return `/${lang}${normalizedPath}${suffix}`
}
