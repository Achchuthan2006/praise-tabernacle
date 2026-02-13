import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

const CP1252_REVERSE = new Map([
  [0x20ac, 0x80],
  [0x201a, 0x82],
  [0x0192, 0x83],
  [0x201e, 0x84],
  [0x2026, 0x85],
  [0x2020, 0x86],
  [0x2021, 0x87],
  [0x02c6, 0x88],
  [0x2030, 0x89],
  [0x0160, 0x8a],
  [0x2039, 0x8b],
  [0x0152, 0x8c],
  [0x017d, 0x8e],
  [0x2018, 0x91],
  [0x2019, 0x92],
  [0x201c, 0x93],
  [0x201d, 0x94],
  [0x2022, 0x95],
  [0x2013, 0x96],
  [0x2014, 0x97],
  [0x02dc, 0x98],
  [0x2122, 0x99],
  [0x0161, 0x9a],
  [0x203a, 0x9b],
  [0x0153, 0x9c],
  [0x017e, 0x9e],
  [0x0178, 0x9f],
])

function cp1252BytesFromString(value) {
  const bytes = []
  for (const ch of value) {
    const cp = ch.codePointAt(0)
    const mapped = CP1252_REVERSE.get(cp)
    if (mapped != null) {
      bytes.push(mapped)
      continue
    }
    if (cp <= 0xff) {
      bytes.push(cp)
      continue
    }
    return null
  }
  return Buffer.from(bytes)
}

function decodeCp1252MojibakeToUtf8(value) {
  const buf = cp1252BytesFromString(value)
  if (!buf) return null
  const decoded = buf.toString("utf8")
  if (decoded.includes("\uFFFD")) return null
  return decoded
}

const INDICATOR_RE = /(?:Ã|Â|â|à®|Ã Â)/u

function looksMojibake(value) {
  return INDICATOR_RE.test(value)
}

function fixString(value) {
  if (!looksMojibake(value)) return null

  let current = value
  for (let i = 0; i < 3; i += 1) {
    const decoded = decodeCp1252MojibakeToUtf8(current)
    if (!decoded || decoded === current) break
    current = decoded
    if (!looksMojibake(current)) break
  }

  if (current === value) return null
  if (current.includes("\uFFFD")) return null
  return current
}

function fixMixedText(value) {
  let changed = false
  let out = ""
  let run = ""
  let runIsByte = null

  const isCp1252Representable = (cp) => cp <= 0xff || CP1252_REVERSE.has(cp)

  const flush = () => {
    if (!run) return
    if (runIsByte) {
      const fixed = fixString(run)
      if (fixed) {
        out += fixed
        changed = true
      } else {
        out += run
      }
    } else {
      out += run
    }
    run = ""
  }

  for (const ch of value) {
    const cp = ch.codePointAt(0)
    const isByte = isCp1252Representable(cp)
    if (runIsByte === null) {
      runIsByte = isByte
      run = ch
      continue
    }
    if (isByte === runIsByte) {
      run += ch
      continue
    }
    flush()
    runIsByte = isByte
    run = ch
  }
  flush()

  if (!changed) return null
  if (out.includes("\uFFFD")) return null
  return out
}

function escapeForQuote(value, quote) {
  let out = value.replaceAll("\\", "\\\\")
  if (quote === "'") out = out.replaceAll("'", "\\'")
  if (quote === '"') out = out.replaceAll('"', '\\"')
  out = out.replaceAll("\r", "\\r").replaceAll("\n", "\\n").replaceAll("\t", "\\t")
  return out
}

function literalFromRawQuote(value, raw) {
  const quote = raw.startsWith("'") ? "'" : raw.startsWith('"') ? '"' : "`"
  if (quote === "`") {
    const escaped = value.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${")
    return `\`${escaped}\``
  }
  return `${quote}${escapeForQuote(value, quote)}${quote}`
}

function isTsx(filepath) {
  return filepath.endsWith(".tsx")
}

function fixFile(filepath) {
  const original = fs.readFileSync(filepath, "utf8")
  const kind = isTsx(filepath) ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const sourceFile = ts.createSourceFile(filepath, original, ts.ScriptTarget.Latest, true, kind)

  const replacements = []

  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const fixed = fixString(node.text)
      if (fixed) {
        const raw = original.slice(node.getStart(sourceFile), node.getEnd())
        const replacement = literalFromRawQuote(fixed, raw)
        replacements.push({ start: node.getStart(sourceFile), end: node.getEnd(), replacement })
      }
    }
    if (ts.isJsxText(node)) {
      const raw = original.slice(node.getStart(sourceFile), node.getEnd())
      const fixed = fixMixedText(raw)
      if (fixed) replacements.push({ start: node.getStart(sourceFile), end: node.getEnd(), replacement: fixed })
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (replacements.length === 0) return { changed: false, replacements: 0 }

  replacements.sort((a, b) => b.start - a.start)
  let updated = original
  for (const r of replacements) {
    updated = updated.slice(0, r.start) + r.replacement + updated.slice(r.end)
  }

  if (updated === original) return { changed: false, replacements: 0 }
  fs.writeFileSync(filepath, updated, "utf8")
  return { changed: true, replacements: replacements.length }
}

function normalizePath(p) {
  return p.split("/").join(path.sep)
}

const args = process.argv.slice(2)
const files =
  args.length > 0
    ? args
    : [
        "app/about/beliefs/page.tsx",
        "app/about/history/page.tsx",
        "app/about/denomination/page.tsx",
        "app/groups/page.tsx",
        "app/serve/page.tsx",
        "app/membership/page.tsx",
        "app/missions/page.tsx",
        "app/calendar/page.tsx",
        "app/learn/baptism/page.tsx",
        "app/learn/weddings/page.tsx",
        "app/learn/building-rental/page.tsx",
        "app/learn/community-safety/page.tsx",
        "lib/history.ts",
        "lib/denomination.ts",
        "lib/groups.ts",
        "lib/serve.ts",
        "lib/missions.ts",
        "lib/site.ts",
      ]

let changedCount = 0
let replacementCount = 0

for (const file of files) {
  const filepath = path.resolve(process.cwd(), normalizePath(file))
  if (!fs.existsSync(filepath)) {
    console.error(`[skip] missing: ${file}`)
    continue
  }
  const result = fixFile(filepath)
  if (result.changed) {
    changedCount += 1
    replacementCount += result.replacements
    console.log(`[fixed] ${file} (${result.replacements} strings)`)
  } else {
    console.log(`[ok] ${file}`)
  }
}

console.log(`Done. Changed ${changedCount} file(s), fixed ${replacementCount} string(s).`)
