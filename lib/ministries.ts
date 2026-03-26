export type MinistryCategory = "Life Stages" | "Special Ministries" | "Missions" | "General"

export type Ministry = {
  slug: string
  nameEn: string
  nameTa: string
  category: MinistryCategory
  tags: string[]
  summaryEn: string
  summaryTa: string
  detailsEn?: string
  detailsTa?: string
  programs?: {
    titleEn: string
    titleTa: string
    ageRangeEn: string
    ageRangeTa: string
    timeEn: string
    timeTa: string
    descriptionEn: string
    descriptionTa: string
  }[]
  safetyNotesEn?: string[]
  safetyNotesTa?: string[]
  gallery?: { src: string; alt: string }[]
  whatToExpectEn?: string[]
  whatToExpectTa?: string[]
  nextStepsEn?: string[]
  nextStepsTa?: string[]
  photoSrc?: string
  locationDetailsEn?: string[]
  locationDetailsTa?: string[]
  teamMembers?: {
    name: string
    roleEn: string
    roleTa: string
    photoSrc?: string
    email?: string
  }[]
  youtubeVideoId?: string
  youtubePlaylistId?: string
  meetingTimeEn: string
  meetingTimeTa: string
  locationEn: string
  locationTa: string
  contactName: string
  contactEmail: string
}

const defaultContactEmail = "pastormano@praisetabernacle.org"

export const ministries: Ministry[] = [
  {
    slug: "kids",
    nameEn: "Sunday School (Kids)",
    nameTa: "\u0b93\u0baf\u0bcd\u0bb5\u0bc1\u0ba8\u0bbe\u0bb3\u0bcd \u0baa\u0bbe\u0b9f\u0b9a\u0bbe\u0bb2\u0bc8",
    category: "Life Stages",
    tags: ["Kids", "Family"],
    summaryEn: "A safe, joyful place for children to learn the Bible and grow in faith.",
    summaryTa:
      "\u0b95\u0bc1\u0bb4\u0ba8\u0bcd\u0ba4\u0bc8\u0b95\u0bb3\u0bcd \u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0daf\u0bbf\u0bb2\u0bcd \u0bb5\u0bb3\u0bb0 \u0b89\u0ba4\u0bb5\u0bc1\u0bae\u0bcd \u0baa\u0bbe\u0ba4\u0bc1\u0b95\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0ba9 \u0b87\u0b9f\u0bae\u0bcd.",
    detailsEn:
      "Our kids ministry helps children discover God's love through age-appropriate Bible lessons, worship, and activities in a safe and caring environment.",
    detailsTa:
      "\u0b95\u0bc1\u0bb4\u0ba8\u0bcd\u0ba4\u0bc8\u0b95\u0bb3\u0bcd \u0ba4\u0bb0\u0bc1\u0ba3\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0b85\u0ba9\u0bc1\u0baa\u0bb5\u0bae\u0bbe\u0b95 \u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1, \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bc6\u0baf\u0bb2\u0bcd\u0baa\u0bbe\u0b9f\u0bc1\u0b95\u0bb3\u0bc2\u0b9f\u0ba9\u0bcd \u0ba4\u0bc7\u0bb5\u0ba9\u0bbf\u0ba9\u0bcd \u0b85\u0ba9\u0bcd\u0baa\u0bc8 \u0b85\u0bb1\u0bbf\u0ba8\u0bcd\u0ba4\u0bc1 \u0bb5\u0bb3\u0bb0 \u0b89\u0ba4\u0bb5\u0bc1\u0bae\u0bcd \u0baa\u0bbe\u0ba4\u0bc1\u0b95\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0ba9 \u0b9a\u0bc2\u0bb4\u0bb2\u0bcd.",
    programs: [
      {
        titleEn: "Nursery",
        titleTa: "\u0b95\u0bc1\u0bb4\u0ba8\u0bcd\u0ba4\u0bc8 \u0baa\u0bb0\u0bbe\u0bae\u0bb0\u0bbf\u0baa\u0bcd\u0baa\u0bc1",
        ageRangeEn: "Ages 2-4",
        ageRangeTa: "\u0bb5\u0baf\u0ba4\u0bc1 2-4",
        timeEn: "Sundays \u00b7 9:30 AM",
        timeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 \u00b7 9:30 AM",
        descriptionEn: "Gentle care, songs, and a simple Bible story.",
        descriptionTa: "\u0bae\u0bc6\u0ba9\u0bcd\u0bae\u0bc8\u0baf\u0bbe\u0ba9 \u0b95\u0bc6\u0bb3\u0bcd\u0bb3\u0bc1\u0bae\u0bcd, \u0baa\u0bbe\u0b9f\u0bb2\u0bcd\u0b95\u0bb3\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b8e\u0bb3\u0bbf\u0baf \u0bb5\u0bc7\u0ba4\u0ba9\u0bcd\u0ba4\u0bbf\u0bb0 \u0b95\u0ba4\u0bc8.",
      },
      {
        titleEn: "Kids",
        titleTa: "\u0b95\u0bc1\u0bb4\u0ba8\u0bcd\u0ba4\u0bc8\u0b95\u0bb3\u0bcd",
        ageRangeEn: "Ages 5-8",
        ageRangeTa: "\u0bb5\u0baf\u0ba4\u0bc1 5-8",
        timeEn: "Sundays \u00b7 9:30 AM",
        timeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 \u00b7 9:30 AM",
        descriptionEn: "Bible lesson, memory verse, and creative activities.",
        descriptionTa: "\u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1, \u0bb5\u0b9a\u0ba9\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0ba8\u0bbf\u0ba9\u0bc8\u0bb5\u0bc1, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0baa\u0b9f\u0bc8\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd.",
      },
      {
        titleEn: "Preteens",
        titleTa: "\u0b87\u0bb3\u0bae\u0bcd \u0b9a\u0bbf\u0bb1\u0bc1\u0bb5\u0bb0\u0bcd",
        ageRangeEn: "Ages 9-12",
        ageRangeTa: "\u0bb5\u0baf\u0ba4\u0bc1 9-12",
        timeEn: "Sundays \u00b7 9:30 AM",
        timeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 \u00b7 9:30 AM",
        descriptionEn: "Deeper teaching, group discussion, and prayer.",
        descriptionTa: "\u0b86\u0bb4\u0bae\u0bbe\u0ba9 \u0baa\u0bcb\u0ba4\u0ba9\u0bc8, \u0b95\u0bc1\u0bb4\u0bc1 \u0b89\u0bb0\u0bc8\u0baf\u0bbe\u0b9f\u0bb2\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9c\u0bc6\u0baa\u0bae\u0bcd.",
      },
    ],
    safetyNotesEn: [
      "Secure check-in with matching pickup tags.",
      "Two-adult guideline for all kids spaces.",
      "Allergy and special care notes welcomed.",
    ],
    safetyNotesTa: [
      "\u0baa\u0bbe\u0ba4\u0bc1\u0b95\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0ba9 check-in \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0baa\u0bca\u0bb0\u0bc1\u0ba8\u0bcd\u0ba4\u0bc1\u0bae\u0bcd pickup \u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bc6\u0bb2\u0bcd\u0b95\u0bb3\u0bcd.",
      "\u0b95\u0bc1\u0bb4\u0ba8\u0bcd\u0ba4\u0bc8\u0b95\u0bb3\u0bcd \u0b87\u0b9f\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0b87\u0bb0\u0ba3\u0bcd\u0b9f\u0bc1 \u0baa\u0bc6\u0bb0\u0bbf\u0baf\u0bb5\u0bb0\u0bcd \u0bb5\u0bbf\u0ba4\u0bbf.",
      "\u0b92\u0bb5\u0bc1\u0ba4 \u0b9a\u0bbf\u0bb1\u0baa\u0bcd\u0baa\u0bc1 \u0b95\u0bb5\u0ba9\u0bae\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd \u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0baa\u0bc1.",
    ],
    gallery: [
      { src: "/photos/home/kids-ministry.webp", alt: "Kids ministry class" },
      { src: "/photos/home/church-life.webp", alt: "Kids worship moment" },
      { src: "/photos/home/adults-fellowship.webp", alt: "Family community time" },
      { src: "/photos/home/church-front.webp", alt: "Families arriving at church" },
    ],
    whatToExpectEn: ["Simple check-in", "Bible lesson and memory verse", "Fun, safe activities"],
    whatToExpectTa: ["எளிய check-in", "வேதாகமப் பாடம் மற்றும் வசனம்", "மகிழ்ச்சியான பாதுகாப்பான செயல்கள்"],
    nextStepsEn: ["Ask about age groups", "Plan your first Sunday", "Connect with the kids team"],
    nextStepsTa: ["வயது குழுக்கள் பற்றி கேளுங்கள்", "முதல் ஞாயிறை திட்டமிடுங்கள்", "குழந்தைகள் குழுவுடன் தொடர்பு கொள்ளுங்கள்"],
    photoSrc: "/photos/home/kids-ministry.webp",
    locationDetailsEn: [
      "Children check in at the family welcome desk in the main lobby before service.",
      "Nursery and early years rooms are located in the lower-level classrooms.",
      "Parents receive pickup guidance and classroom information on arrival.",
    ],
    locationDetailsTa: [
      "ஆராதனைக்கு முன் குடும்ப வரவேற்பு மேசையில் குழந்தைகள் பதிவு செய்யப்படுகிறார்கள்.",
      "நர்சரி மற்றும் சிறுவர் வகுப்பறைகள் கீழ்தள வகுப்பறைகளில் உள்ளன.",
      "வருகை தரும் பெற்றோருக்கு வகுப்பறை மற்றும் குழந்தைகளை அழைத்து செல்லும் தகவல் வழங்கப்படும்.",
    ],
    teamMembers: [
      {
        name: "Kids Welcome Team",
        roleEn: "Lobby check-in and parent support",
        roleTa: "நுழைவாயில் பதிவு மற்றும் பெற்றோர் உதவி",
        photoSrc: "/photos/home/church-front.webp",
        email: defaultContactEmail,
      },
      {
        name: "Sunday Lesson Team",
        roleEn: "Bible lesson leaders and classroom teachers",
        roleTa: "வேதாகமப் பாட ஆசிரியர்கள் மற்றும் வகுப்பு வழிநடத்துநர்கள்",
        photoSrc: "/photos/home/kids-ministry.webp",
        email: defaultContactEmail,
      },
      {
        name: "Family Care Volunteers",
        roleEn: "Pickup coordination and family follow-up",
        roleTa: "குழந்தைகளை அழைத்து செல்லும் ஒருங்கிணைப்பு மற்றும் குடும்ப பிந்தொடர்பு",
        photoSrc: "/photos/home/adults-fellowship.webp",
        email: defaultContactEmail,
      },
    ],
    // Optional: add a Kids/VBS YouTube video id or playlist id.
    youtubeVideoId: "",
    youtubePlaylistId: "",
    meetingTimeEn: "Sundays • 9:30 AM",
    meetingTimeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 • 9:30 AM",
    locationEn: "Lower-level classrooms, Praise Tabernacle",
    locationTa: "பிரேஸ் டேபர்னாக்கிள் கீழ்தள வகுப்பறைகள்",
    contactName: "Sunday School Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "youth",
    nameEn: "Youth Gathering",
    nameTa: "\u0bb5\u0bbe\u0bb2\u0bbf\u0baa \u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd",
    category: "Life Stages",
    tags: ["Youth", "Community"],
    summaryEn: "A welcoming space for youth to connect, ask questions, and follow Jesus together.",
    summaryTa:
      "\u0b87\u0bb3\u0bc8\u0baf\u0bcb\u0bb0\u0bcd \u0b87\u0ba3\u0bc8\u0ba8\u0bcd\u0ba4\u0bc1 \u0bb5\u0bb3\u0bb0, \u0b95\u0bc7\u0bb3\u0bcd\u0bb5\u0bbf\u0b95\u0bb3\u0bcd \u0b95\u0bc7\u0b9f\u0bcd\u0b95, \u0b87\u0baf\u0bc7\u0b9a\u0bc1\u0bb5\u0bc8 \u0baa\u0bbf\u0ba9\u0bcd\u0ba4\u0bca\u0b9f\u0bb0 \u0b92\u0bb0\u0bc1 \u0ba8\u0b9f\u0bcd\u0baa\u0bc1 \u0b87\u0b9f\u0bae\u0bcd.",
    detailsEn:
      "Youth gatherings are built around friendship, Scripture, and honest conversations. Students are encouraged to grow in faith, character, and community.",
    detailsTa:
      "\u0bb5\u0bbe\u0bb2\u0bbf\u0baa \u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd \u0ba8\u0b9f\u0bcd\u0baa\u0bc1, \u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0ba8\u0bc7\u0bb0\u0bae\u0bbe\u0ba9 \u0baa\u0bc7\u0b9a\u0bc1\u0bb5\u0bbe\u0bb0\u0bcd\u0ba4\u0bcd\u0ba4\u0bc8\u0b95\u0bb3\u0bc8 \u0bae\u0bc8\u0baf\u0bae\u0bbe\u0b95\u0b95\u0bcd \u0b95\u0bc6\u0bbe\u0bb3\u0bcd\u0bb3\u0bc1\u0bae\u0bcd. \u0bb5\u0bbf\u0b9a\u0bc1\u0bb5\u0bbe\u0b9a\u0bae\u0bcd, \u0ba8\u0bb2\u0bcd\u0bb2\u0b95\u0bae\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bc2\u0bb4\u0bb2\u0bcd \u0ba4\u0bc7\u0b9f\u0bbf \u0bb5\u0bb3\u0bb0 \u0b89\u0ba4\u0bb5\u0bc1\u0bae\u0bcd.",
    programs: [
      {
        titleEn: "Middle School",
        titleTa: "\u0b87\u0b9f\u0bc8\u0ba8\u0bbf\u0bb2\u0bc8 \u0bae\u0bbe\u0ba3\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd",
        ageRangeEn: "Grades 6-8",
        ageRangeTa: "\u0ba4\u0bb0\u0bae\u0bcd 6-8",
        timeEn: "Sundays \u00b7 11:00 AM",
        timeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 \u00b7 11:00 AM",
        descriptionEn: "Interactive teaching, small-group discussion, and prayer.",
        descriptionTa: "\u0b89\u0b9f\u0ba9\u0b9f\u0bbf \u0baa\u0bcb\u0ba4\u0ba9\u0bc8, \u0b9a\u0bbf\u0bb1\u0bc1 \u0b95\u0bc1\u0bb4\u0bc1 \u0b89\u0bb0\u0bc8\u0baf\u0bbe\u0b9f\u0bb2\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9c\u0bc6\u0baa\u0bae\u0bcd.",
      },
      {
        titleEn: "High School",
        titleTa: "\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8 \u0bae\u0bbe\u0ba3\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd",
        ageRangeEn: "Grades 9-12",
        ageRangeTa: "\u0ba4\u0bb0\u0bae\u0bcd 9-12",
        timeEn: "Sundays \u00b7 11:00 AM",
        timeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 \u00b7 11:00 AM",
        descriptionEn: "Scripture, mentorship, and leadership development.",
        descriptionTa: "\u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1, \u0bb5\u0bb4\u0bbf\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bb2\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0ba4\u0bb2\u0bc8\u0bae\u0bc8 \u0bb5\u0bb3\u0bb0\u0bcd\u0b9a\u0bcd\u0b9a\u0bbf.",
      },
      {
        titleEn: "Young Adults",
        titleTa: "\u0b87\u0bb3\u0bae\u0bcd \u0baa\u0bc6\u0bb0\u0bbf\u0baf\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd",
        ageRangeEn: "Ages 18-24",
        ageRangeTa: "\u0bb5\u0baf\u0ba4\u0bc1 18-24",
        timeEn: "Monthly \u00b7 Dates announced",
        timeTa: "\u0bae\u0bbe\u0ba4\u0bae\u0bcd \u00b7 \u0ba4\u0bc7\u0ba4\u0bbf \u0b85\u0bb1\u0bbf\u0bb5\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd",
        descriptionEn: "Community nights focused on faith, life, and purpose.",
        descriptionTa: "\u0bb5\u0bbf\u0b9a\u0bc1\u0bb5\u0bbe\u0b9a\u0bae\u0bcd, \u0bb5\u0bb4\u0b95\u0bcd\u0b95\u0bc8, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0ba8\u0bcb\u0b95\u0bcd\u0b95\u0bae\u0bcd \u0bae\u0b9a\u0bc2\u0bb1 \u0b95\u0bc2\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bc8\u0b95\u0bb3\u0bcd.",
      },
    ],
    safetyNotesEn: [
      "Two-adult guideline for all youth spaces.",
      "Clear expectations for respect and inclusion.",
      "Parents/guardians can connect with leaders anytime.",
    ],
    safetyNotesTa: [
      "\u0b87\u0bb3\u0bc8\u0b9e\u0bb0\u0bcd \u0b87\u0b9f\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0b87\u0bb0\u0ba3\u0bcd\u0b9f\u0bc1 \u0baa\u0bc6\u0bb0\u0bbf\u0baf\u0bb5\u0bb0\u0bcd \u0bb5\u0bbf\u0ba4\u0bbf.",
      "\u0bae\u0bb0\u0bbf\u0baf\u0bbe\u0ba4\u0bc8 \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bc7\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0bc8 \u0b95\u0bc1\u0bb1\u0bbf\u0ba4\u0bcd\u0ba4 \u0ba4\u0bc6\u0bb3\u0bbf\u0bb5\u0bbe\u0ba9 \u0b8e\u0ba4\u0bbf\u0bb0\u0bcd\u0baa\u0bbE\u0bb0\u0bcd\u0baA\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd.",
      "\u0baa\u0bc6\u0bb1\u0bcd\u0bb1\u0bcb\u0bb0\u0bcd/\u0b95\u0bbe\u0bb5\u0bb2\u0bb0\u0bcd\u0b95\u0bb3\u0bcd \u0b8e\u0baa\u0bcd\u0baa\u0bcb\u0ba4\u0bc1\u0bae\u0bcd \u0b8e\u0ba4\u0bbf\u0bb0\u0bcd\u0baA\u0bbE\u0bb0\u0bcd\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0bb3\u0bcd\u0bb3\u0bae\u0bbe\u0ba9\u0bca\u0b9f\u0bc1 \u0ba4\u0bb2\u0bc8\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bbc\u0b9f\u0ba9\u0bcd \u0ba4\u0bca\u0b9f\u0bb0\u0bcd\u0baa\u0bc1 \u0b95\u0bca\u0bb3\u0bcd\u0bb3\u0bb2\u0bbe\u0bae\u0bcd.",
    ],
    gallery: [
      { src: "/photos/home/church-life.webp", alt: "Youth discussion circle" },
      { src: "/photos/home/adults-fellowship.webp", alt: "Youth community time" },
      { src: "/photos/home/kids-ministry.webp", alt: "Youth worship moment" },
      { src: "/photos/home/church-front-2.webp", alt: "Church entrance before gathering" },
    ],
    whatToExpectEn: ["Short Bible teaching", "Discussion and prayer", "Community time"],
    whatToExpectTa: ["குறுகிய போதனை", "விவாதம் மற்றும் ஜெபம்", "சமூக நேரம்"],
    nextStepsEn: ["Bring a friend", "Ask about youth events", "Join a serving team"],
    nextStepsTa: ["ஒருவரை அழைத்து வாருங்கள்", "இளைஞர் நிகழ்வுகள் பற்றி கேளுங்கள்", "சேவை குழுவில் சேருங்கள்"],
    photoSrc: "/photos/home/church-life.webp",
    locationDetailsEn: [
      "Youth meets in the fellowship hall after the main worship gathering.",
      "Small-group circles use side classrooms and the youth lounge when available.",
      "Parents can speak with leaders at the end of the session near the lobby.",
    ],
    locationDetailsTa: [
      "முக்கிய ஆராதனைக்குப் பிறகு இளைஞர்கள் கூட்டரங்கில் கூடுகின்றனர்.",
      "சிறு குழு சந்திப்புகள் பக்க வகுப்பறைகள் மற்றும் இளைஞர் லவுஞ்சில் நடக்கின்றன.",
      "சந்திப்பு முடிந்ததும் லாபி அருகே தலைவர்களுடன் பெற்றோர் பேசலாம்.",
    ],
    teamMembers: [
      {
        name: "Youth Leaders",
        roleEn: "Weekly gathering hosts and mentors",
        roleTa: "வாராந்திர சந்திப்பு வழிநடத்துநர்கள் மற்றும் வழிகாட்டிகள்",
        photoSrc: "/photos/home/church-life.webp",
        email: defaultContactEmail,
      },
      {
        name: "Small Group Mentors",
        roleEn: "Discussion leaders for middle and high school students",
        roleTa: "இடைநிலை மற்றும் மேல்நிலை மாணவர்களுக்கான உரையாடல் வழிநடத்துநர்கள்",
        photoSrc: "/photos/home/adults-fellowship.webp",
        email: defaultContactEmail,
      },
      {
        name: "Worship & Media Support",
        roleEn: "Music, slides, and youth event setup",
        roleTa: "இசை, திரைகள் மற்றும் இளைஞர் நிகழ்ச்சி அமைப்பு உதவி",
        photoSrc: "/photos/home/church-front-2.webp",
        email: defaultContactEmail,
      },
    ],
    meetingTimeEn: "Sundays • 11:00 AM",
    meetingTimeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 • 11:00 AM",
    locationEn: "Fellowship hall and youth rooms, Praise Tabernacle",
    locationTa: "பிரேஸ் டேபர்னாக்கிள் கூட்டரங்கு மற்றும் இளைஞர் அறைகள்",
    contactName: "Youth Leaders",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "prayer-care",
    nameEn: "Prayer Ministry",
    nameTa: "\u0b9c\u0bc6\u0baa\u0bae\u0bcd",
    category: "Special Ministries",
    tags: ["Prayer", "Care"],
    summaryEn: "Prayer support and gentle care for anyone who needs encouragement.",
    summaryTa:
      "\u0b9c\u0bc6\u0baa \u0b86\u0ba4\u0bb0\u0bb5\u0bc1\u0bae\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0baa\u0bb0\u0bbe\u0bae\u0bb0\u0bbf\u0baa\u0bcd\u0baa\u0bc1.",
    detailsEn:
      "Prayer is at the centre of our church. If you need prayer or support, we would be honored to stand with you.",
    detailsTa:
      "\u0b9c\u0bc6\u0baa\u0bae\u0bcd \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0baa\u0bc8\u0baf\u0bbf\u0ba9\u0bcd \u0bae\u0bc8\u0baf\u0bae\u0bcd. \u0b9c\u0bc6\u0baa\u0bae\u0bcd \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0b89\u0ba4\u0bb5\u0bbf \u0ba4\u0bc7\u0bb5\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd \u0baa\u0bcb\u0ba4\u0bc1, \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b9f\u0ba9\u0bcd \u0ba8\u0bbf\u0bb1\u0bcd\u0b95 \u0ba8\u0bbe\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0bae\u0bcd \u0bae\u0bb0\u0bbf\u0baf\u0bbe\u0ba4\u0bc8 \u0b85\u0b9f\u0bc8\u0b95\u0bbf\u0bb1\u0bcb\u0bae\u0bcd.",
    whatToExpectEn: ["Prayer support", "Confidential care", "Connection to pastoral support as needed"],
    whatToExpectTa: ["ஜெப ஆதரவு", "ரகசியமான அக்கறை", "தேவைக்கேற்ப மேய்ப்பர் உதவி இணைப்பு"],
    nextStepsEn: ["Submit a prayer request", "Join prayer times", "Request pastoral care"],
    nextStepsTa: ["ஜெப வேண்டுகோள் சமர்ப்பிக்கவும்", "ஜெப நேரங்களில் சேருங்கள்", "மேய்ப்பர் அக்கறை கோருங்கள்"],
    photoSrc: "/event-prayer.svg",
    locationDetailsEn: [
      "Wednesday morning prayer meets in the sanctuary prayer area.",
      "Private care conversations are arranged in a quieter follow-up room when needed.",
      "Pastoral care appointments can also be scheduled by email.",
    ],
    locationDetailsTa: [
      "புதன்கிழமை காலை ஜெபம் சந்நிதி ஜெபப்பகுதியில் நடைபெறும்.",
      "தனிப்பட்ட பராமரிப்பு உரையாடல்கள் தேவையானபோது அமைதியான அறையில் ஏற்பாடு செய்யப்படும்.",
      "மேய்ப்பர் ஆலோசனை நேரங்களை மின்னஞ்சல் மூலம் முன்பதிவு செய்யலாம்.",
    ],
    teamMembers: [
      {
        name: "Prayer Team",
        roleEn: "Intercession during services and weekly prayer gatherings",
        roleTa: "ஆராதனைகளிலும் வாராந்திர ஜெப நேரங்களிலும் ஜெப ஆதரவு",
        photoSrc: "/photos/home/church-front.webp",
        email: defaultContactEmail,
      },
      {
        name: "Care Follow-up Team",
        roleEn: "Confidential response and check-ins through the week",
        roleTa: "ரகசியமான பதில்கள் மற்றும் வாரம் முழுவதும் பிந்தொடர்பு",
        photoSrc: "/photos/home/adults-fellowship.webp",
        email: defaultContactEmail,
      },
      {
        name: "Pastoral Support",
        roleEn: "Pastoral prayer and next-step guidance",
        roleTa: "மேய்ப்பரின் ஜெப ஆதரவும் அடுத்த படி வழிகாட்டுதலும்",
        photoSrc: "/photos/pastor/pastor-mano.jpg",
        email: defaultContactEmail,
      },
    ],
    meetingTimeEn: "Wednesdays • 10:30 AM + monthly prayer times",
    meetingTimeTa: "\u0baa\u0bc1\u0ba4\u0ba9\u0bcd • 10:30 AM",
    locationEn: "Sanctuary prayer space and care rooms, Praise Tabernacle",
    locationTa: "பிரேஸ் டேபர்னாக்கிள் சந்நிதி ஜெபப்பகுதி மற்றும் பராமரிப்பு அறைகள்",
    contactName: "Prayer Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "bible-study",
    nameEn: "Bible Study (Livestream)",
    nameTa: "\u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1",
    category: "Special Ministries",
    tags: ["Bible Study", "Livestream"],
    summaryEn: "A midweek time to study Scripture together through livestream.",
    summaryTa:
      "\u0b86\u0ba9\u0bcd\u0bb2\u0bc8\u0ba9\u0bcd \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1.",
    detailsEn:
      "Join our midweek Bible study online. We read Scripture, learn together, and pray as a church family.",
    detailsTa:
      "\u0b86\u0ba9\u0bcd\u0bb2\u0bc8\u0ba9\u0bcd \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0ba8\u0b9f\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0ba8\u0b9f\u0bc1\u0bb5\u0bbe\u0bb0 \u0bb5\u0bc7\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b9a\u0bc7\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd. \u0bb5\u0bc7\u0ba4\u0bae\u0bcd \u0baa\u0b9f\u0bbf\u0ba4\u0bcd\u0ba4\u0bc1, \u0b92\u0ba9\u0bcd\u0bb1\u0bbe\u0b95 \u0b95\u0bb1\u0bcd\u0baa\u0bc1\u0bae\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9c\u0bc6\u0baa\u0bbf\u0ba4\u0bcd\u0ba4\u0bc1 \u0b87\u0ba3\u0bc8\u0ba8\u0bcd\u0ba4\u0bc1 \u0bb5\u0bb3\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd.",
    whatToExpectEn: ["Scripture reading", "Short teaching", "Prayer time"],
    whatToExpectTa: ["வேத வாசிப்பு", "குறுகிய போதனை", "ஜெப நேரம்"],
    nextStepsEn: ["Watch the livestream", "Invite a friend", "Follow along with notes"],
    nextStepsTa: ["நேரலை பார்க்கவும்", "ஒருவரை அழைக்கவும்", "குறிப்புகளுடன் பின்தொடரவும்"],
    photoSrc: "/event-teaching.svg",
    meetingTimeEn: "Thursdays • 7:30 PM",
    meetingTimeTa: "\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0ba9\u0bcd • 7:30 PM",
    locationEn: "Online (livestream)",
    locationTa: "\u0b86\u0ba9\u0bcd\u0bb2\u0bc8\u0ba9\u0bcd (\u0ba8\u0bc7\u0bb0\u0bb2\u0bc8)",
    contactName: "Bible Study Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "womens",
    nameEn: "Women\u2019s Prayer",
    nameTa: "\u0baa\u0bc6\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0b9c\u0bc6\u0baa\u0b95\u0bcd\u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd",
    category: "Special Ministries",
    tags: ["Women", "Prayer"],
    summaryEn: "Monthly prayer and encouragement for women.",
    summaryTa:
      "\u0baa\u0bc6\u0ba3\u0bcd\u0b95\u0bb3\u0bcd\u0b95\u0bcd\u0b95\u0bbe\u0ba9 \u0bae\u0bbe\u0ba4 \u0b9c\u0bc6\u0baa\u0b95\u0bcd\u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd.",
    detailsEn:
      "A welcoming monthly gathering for women to pray, encourage one another, and grow in faith together.",
    detailsTa:
      "\u0baa\u0bc6\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0b92\u0ba9\u0bcd\u0bb1\u0bbe\u0b95 \u0b9c\u0bc6\u0baa\u0bbf\u0ba4\u0bcd\u0ba4\u0bc1, \u0b89\u0bb1\u0bcd\u0b9a\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0bcd \u0baa\u0bbf\u0bb1\u0bb5\u0bc1\u0bae\u0bcd, \u0bb5\u0bbf\u0b9a\u0bc1\u0bb5\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0bb5\u0bb3\u0bb0 \u0b92\u0bb0\u0bc1 \u0bae\u0bbe\u0ba4 \u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd.",
    whatToExpectEn: ["Prayer and worship", "Encouragement and conversation", "A respectful, supportive space"],
    whatToExpectTa: ["ஜெபம் மற்றும் ஆராதனை", "உற்சாகம் மற்றும் உரையாடல்", "மரியாதையுள்ள ஆதரவு சூழல்"],
    nextStepsEn: ["Join the next gathering", "Bring a friend", "Request prayer"],
    nextStepsTa: ["அடுத்த கூடுகையில் சேருங்கள்", "ஒருவரை அழைத்து வாருங்கள்", "ஜெபம் கோருங்கள்"],
    photoSrc: "/event-family.svg",
    meetingTimeEn: "2nd Saturday • 10:30 AM",
    meetingTimeTa: "\u0b87\u0bb0\u0ba3\u0bcd\u0b9f\u0bbe\u0bb5\u0ba4\u0bc1 \u0b9a\u0ba9\u0bbf • 10:30 AM",
    locationEn: "On-site at church",
    locationTa: "\u0b9a\u0baa\u0bc8 \u0bb5\u0bb3\u0bbe\u0b95\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd",
    contactName: "Women\u2019s Prayer Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "mens",
    nameEn: "Men\u2019s Ministry",
    nameTa: "\u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0bc7\u0bb5\u0bc8",
    category: "Special Ministries",
    tags: ["Men", "Discipleship"],
    summaryEn: "Brotherhood, prayer, and practical discipleship for men of all ages.",
    summaryTa:
      "\u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd\u0b95\u0bcd\u0b95\u0bbe\u0ba9 \u0b9a\u0b95\u0bcb\u0ba4\u0bb0\u0ba4\u0bcd\u0ba4\u0bc1\u0bb5\u0bae\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bc0\u0b9f\u0ba4\u0bcd\u0ba4\u0bc1\u0bb5\u0bae\u0bcd.",
    detailsEn:
      "Men's ministry is a place to build brotherhood, pray together, and grow in practical discipleship.",
    detailsTa:
      "\u0b9a\u0b95\u0bcb\u0ba4\u0bb0\u0ba4\u0bcd\u0ba4\u0bc1\u0bb5\u0bae\u0bcd, \u0b9c\u0bc6\u0baa\u0bae\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0ba8\u0b9f\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0b9a\u0bc0\u0b9f\u0ba4\u0bcd\u0ba4\u0bc1\u0bb5\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0bb5\u0bb3\u0bb0 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd\u0b95\u0bcd\u0b95\u0bbe\u0ba9 \u0b92\u0bb0\u0bc1 \u0b87\u0b9f\u0bae\u0bcd.",
    whatToExpectEn: ["Prayer and encouragement", "Biblical discussion", "Simple next steps for daily life"],
    whatToExpectTa: ["ஜெபம் மற்றும் உற்சாகம்", "வேதாகம உரையாடல்", "நாளாந்த வாழ்க்கைக்கான நடைமுறை அடுத்த படிகள்"],
    nextStepsEn: ["Join a meeting", "Ask about small groups", "Serve with a team"],
    nextStepsTa: ["ஒரு கூடுகையில் சேருங்கள்", "சிறு குழுக்கள் பற்றி கேளுங்கள்", "ஒரு குழுவுடன் சேவை செய்யுங்கள்"],
    photoSrc: "/event-community.svg",
    locationDetailsEn: [
      "Most outreach teams meet first in the church lobby for prayer and assignments.",
      "Serve locations vary across Mississauga depending on the project and partner organization.",
      "Volunteers receive the exact meetup address and arrival details before each outreach day.",
    ],
    locationDetailsTa: [
      "பல சமூக சேவை குழுக்கள் முதலில் சபை லாபியில் ஜெபத்திற்கும் ஒழுங்கமைப்பிற்கும் கூடுகின்றன.",
      "சேவை நடைபெறும் இடங்கள் திட்டத்திற்கும் கூட்டாளி அமைப்பிற்கும் ஏற்ப மிசிசாகா முழுவதும் மாறுபடும்.",
      "ஒவ்வொரு சேவை நாளுக்கும் முன் துல்லியமான சந்திப்பு முகவரி மற்றும் வருகை விவரங்கள் அனுப்பப்படும்.",
    ],
    teamMembers: [
      {
        name: "Outreach Coordinator",
        roleEn: "Schedules projects and community partnerships",
        roleTa: "சேவை திட்டங்களும் சமூக கூட்டாண்மைகளும் ஒருங்கிணைப்பு",
        photoSrc: "/photos/home/church-front.webp",
        email: defaultContactEmail,
      },
      {
        name: "Community Support Volunteers",
        roleEn: "Food support, visits, and practical care",
        roleTa: "உணவு உதவி, வீட்டு வருகைகள் மற்றும் நடைமுறை பராமரிப்பு",
        photoSrc: "/photos/home/adults-fellowship.webp",
        email: defaultContactEmail,
      },
      {
        name: "Hospitality & Follow-up Team",
        roleEn: "Welcome, registration, and follow-up connection",
        roleTa: "வரவேற்பு, பதிவு மற்றும் பிந்தொடர்பு இணைப்பு",
        photoSrc: "/photos/home/church-life.webp",
        email: defaultContactEmail,
      },
    ],
    meetingTimeEn: "1st Saturday • 9:30 AM",
    meetingTimeTa: "\u0b9a\u0ba9\u0bbf • 9:30 AM",
    locationEn: "On-site / small groups (varies)",
    locationTa: "\u0b9a\u0baa\u0bc8 / \u0b9a\u0bbf\u0bb1\u0bc1 \u0b95\u0bc1\u0bb4\u0bc1\u0b95\u0bcd\u0b95\u0bb3\u0bcd (\u0bae\u0bbe\u0bb1\u0bc1\u0baa\u0b9f\u0bc1\u0bae\u0bcd)",
    contactName: "Men\u2019s Ministry Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "outreach",
    nameEn: "Outreach",
    nameTa: "\u0b9a\u0bae\u0bc2\u0b95 \u0b9a\u0bc7\u0bb5\u0bc8",
    category: "Special Ministries",
    tags: ["Outreach", "Community"],
    summaryEn: "Serve Mississauga through practical help, visits, and community support.",
    summaryTa:
      "\u0ba8\u0ba9\u0bcd\u0ba4\u0bbf \u0b9a\u0bc7\u0bb5\u0bc8\u0baf\u0bc2\u0b9f\u0ba9\u0bcd \u0b9a\u0bae\u0bc2\u0b95\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0b89\u0ba4\u0bb5\u0bbf \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bae\u0bcd.",
    detailsEn:
      "Outreach helps us love our neighbours through practical support, visits, and community partnerships.",
    detailsTa:
      "\u0b89\u0ba4\u0bb5\u0bbf, \u0bb5\u0bbf\u0b9a\u0bbf\u0b9f\u0bcd, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bae\u0bc2\u0b95 \u0b87\u0ba3\u0bc8\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bc2\u0b9f\u0ba9\u0bcd \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0ba8\u0b95\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0b89\u0bb3\u0bcd\u0bb3 \u0bae\u0b95\u0bcd\u0b95\u0bb3\u0bc8 \u0b85\u0ba9\u0bcd\u0baa\u0bc1\u0b9f\u0ba9\u0bcd \u0b9a\u0bc7\u0bb5\u0bbf\u0b95\u0bcd\u0b95 \u0b92\u0bb0\u0bc1 \u0b9a\u0bc7\u0bb5\u0bc8.",
    whatToExpectEn: ["Serve projects", "Opportunities to help families", "Prayer and planning"],
    whatToExpectTa: ["சேவை திட்டங்கள்", "குடும்பங்களுக்கு உதவி வாய்ப்புகள்", "ஜெபமும் திட்டமிடலும்"],
    nextStepsEn: ["Ask about upcoming outreaches", "Join a serve day", "Partner with a team"],
    nextStepsTa: ["வரவிருக்கும் சேவை பற்றி கேளுங்கள்", "ஒரு சேவை நாளில் சேருங்கள்", "ஒரு குழுவுடன் இணைந்திடுங்கள்"],
    photoSrc: "/event-community.svg",
    meetingTimeEn: "Monthly • Dates announced",
    meetingTimeTa: "\u0bae\u0bbe\u0ba4\u0bae\u0bcd • \u0ba4\u0bc7\u0ba4\u0bbf \u0b85\u0bb1\u0bbf\u0bb5\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd",
    locationEn: "Mississauga outreach sites and church lobby meetup point",
    locationTa: "மிசிசாகா சமூக சேவை இடங்கள் மற்றும் சபை லாபி சந்திப்பு இடம்",
    contactName: "Outreach Coordinator",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "missions",
    nameEn: "Missions (Local & Global)",
    nameTa: "\u0bae\u0bbf\u0bb7\u0ba9\u0bcd (\u0b89\u0bb3\u0bcd\u0bb3\u0bc2\u0bb0\u0bcd & \u0b89\u0bb2\u0b95\u0bae\u0bcd)",
    category: "Missions",
    tags: ["Missions", "Outreach"],
    summaryEn: "Support local and global mission work through prayer, giving, and service.",
    summaryTa:
      "\u0b9c\u0bc6\u0baa\u0bae\u0bcd, \u0b95\u0bca\u0b9f\u0bc8, \u0b9a\u0bc7\u0bb5\u0bc8 \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0bae\u0bbf\u0bb7\u0ba9\u0bc8 \u0b86\u0ba4\u0bb0\u0bbf\u0ba4\u0bcd\u0ba4\u0bb2\u0bcd.",
    detailsEn:
      "We partner in missions by praying, giving, and serving. Our heart is to support gospel work locally and globally.",
    detailsTa:
      "\u0b9c\u0bc6\u0baa\u0bae\u0bcd, \u0b95\u0bca\u0b9f\u0bc8, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bc7\u0bb5\u0bc8 \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0bae\u0bbf\u0bb7\u0ba9\u0bc8 \u0b86\u0ba4\u0bb0\u0bbf\u0ba4\u0bcd\u0ba4\u0bb2\u0bcd \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b87\u0ba4\u0baf\u0bae\u0bcd. \u0b89\u0bb3\u0bcd\u0bb3\u0bc2\u0bb0\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b89\u0bb2\u0b95\u0bae\u0bcd \u0b85\u0bb3\u0bb5\u0bbf\u0bb2\u0bcd \u0b9a\u0bc1\u0bb5\u0bbf\u0b9a\u0bc7\u0bb7 \u0ba8\u0bb1\u0bcd\u0b9a\u0bc6\u0baf\u0bcd\u0ba4\u0bbf \u0baa\u0ba3\u0bbf\u0b95\u0bb3\u0bc8 \u0b86\u0ba4\u0bb0\u0bbf\u0b95\u0bcd\u0b95 \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bc1\u0b95\u0bbf\u0bb1\u0bcb\u0bae\u0bcd.",
    whatToExpectEn: ["Prayer updates", "Giving opportunities", "Serve projects (as available)"],
    whatToExpectTa: ["ஜெப புதுப்பிப்புகள்", "கொடுக்கும் வாய்ப்புகள்", "சேவை திட்டங்கள் (சாத்தியமானவரை)"],
    nextStepsEn: ["View missions partners", "Give to missions", "Contact the missions team"],
    nextStepsTa: ["மிஷன் கூட்டாளிகளை பாருங்கள்", "மிஷனுக்கு கொடுங்கள்", "மிஷன் குழுவை தொடர்புகொள்ளுங்கள்"],
    photoSrc: "/event-community.svg",
    meetingTimeEn: "Quarterly • Updates shared",
    meetingTimeTa: "\u0b95\u0bbe\u0bb2\u0bbe\u0ba3\u0bcd\u0b9f\u0bc1 • \u0baa\u0bc1\u0ba4\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd",
    locationEn: "On-site / online (varies)",
    locationTa: "\u0b9a\u0baa\u0bc8 / \u0b86\u0ba9\u0bcd\u0bb2\u0bc8\u0ba9\u0bcd (\u0bae\u0bbe\u0bb1\u0bc1\u0baa\u0b9f\u0bc1\u0bae\u0bcd)",
    contactName: "Missions Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "worship-tech",
    nameEn: "Worship & Tech",
    nameTa: "\u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 & \u0ba4\u0bca\u0bb4\u0bbf\u0bb2\u0bcd\u0ba8\u0bc1\u0b9f\u0bcd\u0baa\u0bae\u0bcd",
    category: "Special Ministries",
    tags: ["Worship", "Media"],
    summaryEn: "Serve with music, sound, livestream, and media to support worship.",
    summaryTa:
      "\u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8\u0baf\u0bc8 \u0b86\u0ba4\u0bb0\u0bbf\u0b95\u0bcd\u0b95 \u0b87\u0b9a\u0bc8, \u0b92\u0bb2\u0bbf, \u0ba8\u0bc7\u0bb0\u0bb2\u0bc8 \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0b9a\u0bc7\u0bb5\u0bc8.",
    detailsEn:
      "Help create a clear, distraction-free worship environment through music, audio, livestream, and media support.",
    detailsTa:
      "\u0b87\u0b9a\u0bc8, \u0b92\u0bb2\u0bbf, \u0ba8\u0bc7\u0bb0\u0bb2\u0bc8, \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0bae\u0bc0\u0b9f\u0bbf\u0baf\u0bbe \u0b86\u0ba4\u0bb0\u0bb5\u0bc1 \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 \u0ba4\u0bc6\u0bb3\u0bbf\u0bb5\u0bbe\u0b95 \u0ba8\u0b9f\u0b95\u0bcd\u0b95 \u0b89\u0ba4\u0bb5\u0bc1\u0bae\u0bcd.",
    whatToExpectEn: ["Training and support", "Rotation schedules", "Serving behind the scenes"],
    whatToExpectTa: ["பயிற்சி மற்றும் ஆதரவு", "மாறும் அட்டவணை", "பின்புற சேவை"],
    nextStepsEn: ["Ask about training", "Try a Sunday rotation", "Serve with media"],
    nextStepsTa: ["பயிற்சி பற்றி கேளுங்கள்", "ஒரு ஞாயிறு முறை முயற்சிக்கவும்", "மீடியாவுடன் சேவை செய்யுங்கள்"],
    photoSrc: "/event-teaching.svg",
    meetingTimeEn: "Sundays • Before and during service",
    meetingTimeTa: "\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1 • \u0b86\u0bb0\u0bbe\u0ba4\u0ba9\u0bc8 \u0bae\u0bc1\u0ba9\u0bcd/\u0baa\u0bcb\u0ba4\u0bc1",
    locationEn: "On-site at church",
    locationTa: "\u0b9a\u0baa\u0bc8 \u0bb5\u0bb3\u0bbe\u0b95\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd",
    contactName: "Worship & Tech Team",
    contactEmail: defaultContactEmail,
  },
  {
    slug: "membership",
    nameEn: "Membership Class",
    nameTa: "\u0b89\u0bb1\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0ba9\u0bb0\u0bcd \u0bb5\u0b95\u0bc1\u0baa\u0bcd\u0baa\u0bc1",
    category: "General",
    tags: ["Newcomers", "Next Steps"],
    summaryEn: "Learn our story, beliefs, and how to get connected as a member.",
    summaryTa:
      "\u0b89\u0bb1\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0ba9\u0bb0\u0bcd \u0b86\u0ba4\u0bb0\u0bb5\u0bc1 \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b85\u0ba3\u0bc1\u0baa\u0bb5\u0bae\u0bcd.",
    detailsEn:
      "Membership is a simple next step for those who want to commit to the life of our church family with accountability and care.",
    detailsTa:
      "\u0b89\u0bb1\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0ba9\u0bb0\u0bcd\u0b86\u0ba4\u0bb0\u0bb5\u0bc1 \u0b8e\u0ba9\u0bcd\u0baa\u0ba4\u0bc1, \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0baa\u0bc8 \u0b95\u0bc1\u0b9f\u0bc1\u0bae\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0baa\u0bc6\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0bbe\u0b95 \u0b87\u0ba3\u0bc8\u0ba8\u0bcd\u0ba4\u0bc1 \u0ba8\u0b9f\u0b95\u0bcd\u0b95 \u0b92\u0bb0\u0bc1 \u0b8e\u0bb3\u0bbf\u0baf \u0b85\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4 \u0baa\u0b9f\u0bbf.",
    whatToExpectEn: ["A short class", "Beliefs and values", "How to get connected"],
    whatToExpectTa: ["குறுகிய வகுப்பு", "நம்பிக்கைகள் மற்றும் மதிப்புகள்", "இணைவது எப்படி"],
    nextStepsEn: ["Attend the class", "Ask questions", "Request membership info"],
    nextStepsTa: ["வகுப்பில் கலந்து கொள்ளுங்கள்", "கேள்விகள் கேளுங்கள்", "உறுப்பினர் விவரம் கேளுங்கள்"],
    photoSrc: "/event-teaching.svg",
    meetingTimeEn: "Seasonal • By announcement",
    meetingTimeTa: "\u0b95\u0bbe\u0bb2\u0b95\u0bbe\u0bb2\u0bae\u0bcd • \u0b85\u0bb1\u0bbf\u0bb5\u0bbf\u0baa\u0bcd\u0baa\u0bc1",
    locationEn: "On-site at church",
    locationTa: "\u0b9a\u0baa\u0bc8 \u0bb5\u0bb3\u0bbe\u0b95\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd",
    contactName: "Church Office",
    contactEmail: defaultContactEmail,
  },
]

export const ministryBySlug = new Map(ministries.map((m) => [m.slug, m]))

export const ministryCategories: MinistryCategory[] = [
  "Life Stages",
  "Special Ministries",
  "Missions",
  "General",
]
