export type BibleLanguage = "en" | "ta"

export const bibleBooks = [
  { id: "genesis", nameEn: "Genesis", nameTa: "ஆதியாகமம்", chapters: 50 },
  { id: "exodus", nameEn: "Exodus", nameTa: "யாத்திராகமம்", chapters: 40 },
  { id: "leviticus", nameEn: "Leviticus", nameTa: "லேவியராகமம்", chapters: 27 },
  { id: "numbers", nameEn: "Numbers", nameTa: "எண்ணாகமம்", chapters: 36 },
  { id: "deuteronomy", nameEn: "Deuteronomy", nameTa: "உபாகமம்", chapters: 34 },
  { id: "joshua", nameEn: "Joshua", nameTa: "யோசுவா", chapters: 24 },
  { id: "judges", nameEn: "Judges", nameTa: "நியாயாதிபதிகள்", chapters: 21 },
  { id: "ruth", nameEn: "Ruth", nameTa: "ரூத்", chapters: 4 },
  { id: "1-samuel", nameEn: "1 Samuel", nameTa: "1 சாமுவேல்", chapters: 31 },
  { id: "2-samuel", nameEn: "2 Samuel", nameTa: "2 சாமுவேல்", chapters: 24 },
  { id: "1-kings", nameEn: "1 Kings", nameTa: "1 இராஜாக்கள்", chapters: 22 },
  { id: "2-kings", nameEn: "2 Kings", nameTa: "2 இராஜாக்கள்", chapters: 25 },
  { id: "1-chronicles", nameEn: "1 Chronicles", nameTa: "1 நாளாகமம்", chapters: 29 },
  { id: "2-chronicles", nameEn: "2 Chronicles", nameTa: "2 நாளாகமம்", chapters: 36 },
  { id: "ezra", nameEn: "Ezra", nameTa: "எஸ்றா", chapters: 10 },
  { id: "nehemiah", nameEn: "Nehemiah", nameTa: "நெகேமியா", chapters: 13 },
  { id: "esther", nameEn: "Esther", nameTa: "எஸ்தர்", chapters: 10 },
  { id: "job", nameEn: "Job", nameTa: "யோபு", chapters: 42 },
  { id: "psalms", nameEn: "Psalms", nameTa: "சங்கீதம்", chapters: 150 },
  { id: "proverbs", nameEn: "Proverbs", nameTa: "நீதிமொழிகள்", chapters: 31 },
  { id: "ecclesiastes", nameEn: "Ecclesiastes", nameTa: "பிரசங்கி", chapters: 12 },
  { id: "song-of-solomon", nameEn: "Song of Solomon", nameTa: "உன்னதப்பாட்டு", chapters: 8 },
  { id: "isaiah", nameEn: "Isaiah", nameTa: "எசாயா", chapters: 66 },
  { id: "jeremiah", nameEn: "Jeremiah", nameTa: "எரேமியா", chapters: 52 },
  { id: "lamentations", nameEn: "Lamentations", nameTa: "புலம்பல்", chapters: 5 },
  { id: "ezekiel", nameEn: "Ezekiel", nameTa: "எசேக்கியேல்", chapters: 48 },
  { id: "daniel", nameEn: "Daniel", nameTa: "தானியேல்", chapters: 12 },
  { id: "hosea", nameEn: "Hosea", nameTa: "ஓசியா", chapters: 14 },
  { id: "joel", nameEn: "Joel", nameTa: "யோவேல்", chapters: 3 },
  { id: "amos", nameEn: "Amos", nameTa: "ஆமோஸ்", chapters: 9 },
  { id: "obadiah", nameEn: "Obadiah", nameTa: "ஒபதியா", chapters: 1 },
  { id: "jonah", nameEn: "Jonah", nameTa: "யோனா", chapters: 4 },
  { id: "micah", nameEn: "Micah", nameTa: "மீகா", chapters: 7 },
  { id: "nahum", nameEn: "Nahum", nameTa: "நாகூம்", chapters: 3 },
  { id: "habakkuk", nameEn: "Habakkuk", nameTa: "ஆபகூக்", chapters: 3 },
  { id: "zephaniah", nameEn: "Zephaniah", nameTa: "செப்பனியா", chapters: 3 },
  { id: "haggai", nameEn: "Haggai", nameTa: "ஆகாய்", chapters: 2 },
  { id: "zechariah", nameEn: "Zechariah", nameTa: "சகரியா", chapters: 14 },
  { id: "malachi", nameEn: "Malachi", nameTa: "மல்கியா", chapters: 4 },
  { id: "matthew", nameEn: "Matthew", nameTa: "மத்தேயு", chapters: 28 },
  { id: "mark", nameEn: "Mark", nameTa: "மாற்கு", chapters: 16 },
  { id: "luke", nameEn: "Luke", nameTa: "லூக்கா", chapters: 24 },
  { id: "john", nameEn: "John", nameTa: "யோவான்", chapters: 21 },
  { id: "acts", nameEn: "Acts", nameTa: "அப்போஸ்தலர்", chapters: 28 },
  { id: "romans", nameEn: "Romans", nameTa: "ரோமர்", chapters: 16 },
  { id: "1-corinthians", nameEn: "1 Corinthians", nameTa: "1 கொரிந்தியர்", chapters: 16 },
  { id: "2-corinthians", nameEn: "2 Corinthians", nameTa: "2 கொரிந்தியர்", chapters: 13 },
  { id: "galatians", nameEn: "Galatians", nameTa: "கலாத்தியர்", chapters: 6 },
  { id: "ephesians", nameEn: "Ephesians", nameTa: "எபேசியர்", chapters: 6 },
  { id: "philippians", nameEn: "Philippians", nameTa: "பிலிப்பியர்", chapters: 4 },
  { id: "colossians", nameEn: "Colossians", nameTa: "கொலோசெயர்", chapters: 4 },
  { id: "1-thessalonians", nameEn: "1 Thessalonians", nameTa: "1 தெசலோனிக்கேயர்", chapters: 5 },
  { id: "2-thessalonians", nameEn: "2 Thessalonians", nameTa: "2 தெசலோனிக்கேயர்", chapters: 3 },
  { id: "1-timothy", nameEn: "1 Timothy", nameTa: "1 தீமோத்தேயு", chapters: 6 },
  { id: "2-timothy", nameEn: "2 Timothy", nameTa: "2 தீமோத்தேயு", chapters: 4 },
  { id: "titus", nameEn: "Titus", nameTa: "தீத்து", chapters: 3 },
  { id: "philemon", nameEn: "Philemon", nameTa: "பிலேமோன்", chapters: 1 },
  { id: "hebrews", nameEn: "Hebrews", nameTa: "எபிரேயர்", chapters: 13 },
  { id: "james", nameEn: "James", nameTa: "யாக்கோபு", chapters: 5 },
  { id: "1-peter", nameEn: "1 Peter", nameTa: "1 பேதுரு", chapters: 5 },
  { id: "2-peter", nameEn: "2 Peter", nameTa: "2 பேதுரு", chapters: 3 },
  { id: "1-john", nameEn: "1 John", nameTa: "1 யோவான்", chapters: 5 },
  { id: "2-john", nameEn: "2 John", nameTa: "2 யோவான்", chapters: 1 },
  { id: "3-john", nameEn: "3 John", nameTa: "3 யோவான்", chapters: 1 },
  { id: "jude", nameEn: "Jude", nameTa: "யூதா", chapters: 1 },
  { id: "revelation", nameEn: "Revelation", nameTa: "வெளிப்படுத்தின விசேஷம்", chapters: 22 },
] as const

export type BibleBookId = (typeof bibleBooks)[number]["id"]

const booksById = new Map<BibleBookId, (typeof bibleBooks)[number]>(bibleBooks.map((b) => [b.id, b]))

export function isBibleBookId(value: string): value is BibleBookId {
  return booksById.has(value as BibleBookId)
}

export function getBookMeta(bookId: BibleBookId) {
  return booksById.get(bookId) ?? null
}

export function getBookLabel(bookId: BibleBookId, language: BibleLanguage) {
  const meta = getBookMeta(bookId)
  if (!meta) return bookId
  return language === "ta" ? meta.nameTa : meta.nameEn
}

export function getBookChaptersCount(bookId: BibleBookId) {
  return getBookMeta(bookId)?.chapters ?? 0
}

export function listBookIds() {
  return bibleBooks.map((b) => b.id) as BibleBookId[]
}

export function getBookNameEn(bookId: BibleBookId) {
  return getBookMeta(bookId)?.nameEn ?? bookId
}

export function getBookNameTa(bookId: BibleBookId) {
  return getBookMeta(bookId)?.nameTa ?? bookId
}

export const bookNameLookup: Record<string, BibleBookId> = (() => {
  const map = new Map<string, BibleBookId>()

  const add = (key: string, id: BibleBookId) => {
    map.set(
      key
        .toLowerCase()
        .replaceAll(".", " ")
        .replaceAll(/\s+/g, " ")
        .trim(),
      id,
    )
  }

  for (const b of bibleBooks) {
    add(b.nameEn, b.id)
    add(b.id.replaceAll("-", " "), b.id)
  }

  add("gen", "genesis")
  add("ex", "exodus")
  add("lev", "leviticus")
  add("num", "numbers")
  add("deut", "deuteronomy")
  add("jos", "joshua")
  add("jdg", "judges")
  add("judg", "judges")
  add("ps", "psalms")
  add("psa", "psalms")
  add("prov", "proverbs")
  add("ecc", "ecclesiastes")
  add("song", "song-of-solomon")
  add("sos", "song-of-solomon")
  add("isa", "isaiah")
  add("jer", "jeremiah")
  add("lam", "lamentations")
  add("ezek", "ezekiel")
  add("dan", "daniel")
  add("hos", "hosea")
  add("zep", "zephaniah")
  add("zech", "zechariah")
  add("mal", "malachi")
  add("mat", "matthew")
  add("matt", "matthew")
  add("mk", "mark")
  add("mrk", "mark")
  add("lk", "luke")
  add("jn", "john")
  add("jhn", "john")
  add("rom", "romans")
  add("1 cor", "1-corinthians")
  add("2 cor", "2-corinthians")
  add("gal", "galatians")
  add("eph", "ephesians")
  add("phil", "philippians")
  add("col", "colossians")
  add("1 thess", "1-thessalonians")
  add("2 thess", "2-thessalonians")
  add("1 tim", "1-timothy")
  add("2 tim", "2-timothy")
  add("phlm", "philemon")
  add("heb", "hebrews")
  add("jas", "james")
  add("jam", "james")
  add("1 pet", "1-peter")
  add("2 pet", "2-peter")
  add("1 jn", "1-john")
  add("2 jn", "2-john")
  add("3 jn", "3-john")
  add("rev", "revelation")

  return Object.fromEntries(map.entries()) as Record<string, BibleBookId>
})()

