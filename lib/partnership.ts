export type PartnershipTierId = "young" | "family" | "business"

export type PartnershipTier = {
  id: PartnershipTierId
  titleEn: string
  titleTa: string
  subtitleEn: string
  subtitleTa: string
  suggestedMonthly: Array<{ labelEn: string; labelTa: string; amount: number }>
  outcomesEn: string[]
  outcomesTa: string[]
  noteEn?: string
  noteTa?: string
}

export const partnershipTiers: PartnershipTier[] = [
  {
    id: "young",
    titleEn: "Young Partners",
    titleTa: "இளைஞர் கூட்டாளர்கள்",
    subtitleEn: "For students and young adults who want to build a consistent giving habit.",
    subtitleTa: "மாணவர்கள் மற்றும் இளம் வயதினர் நிலையான கொடை பழக்கத்தை உருவாக்க உதவும் திட்டம்.",
    suggestedMonthly: [
      { labelEn: "$10/month", labelTa: "$10/மாதம்", amount: 10 },
      { labelEn: "$25/month", labelTa: "$25/மாதம்", amount: 25 },
      { labelEn: "$50/month", labelTa: "$50/மாதம்", amount: 50 },
    ],
    outcomesEn: [
      "Supports youth gatherings, mentoring, and discipleship resources.",
      "Helps fund worship/tech gear that keeps livestreams stable and clear.",
      "Provides outreach materials for inviting friends and serving neighbors.",
    ],
    outcomesTa: [
      "இளைஞர் கூடுகைகள், வழிகாட்டுதல், சீஷத்துவ வளங்கள் ஆகியவற்றிற்கு ஆதரவு.",
      "லைவ்ஸ்ட்ரீம் நிலைத்திருக்கும் வகையில் ஆராதனை/டெக் சாதனங்களுக்கு உதவி.",
      "நண்பர்களை அழைக்கவும் அயலாரை சேவிக்கவும் தேவையான வளங்களுக்கு உதவி.",
    ],
    noteEn: "Any amount helps — consistency matters more than size.",
    noteTa: "எவ்வளவு சிறியதாயினும் உதவும் — தொகையை விட நிலைத்த தன்மை முக்கியம்.",
  },
  {
    id: "family",
    titleEn: "Family Blessing",
    titleTa: "குடும்ப ஆசீர்வாதம்",
    subtitleEn: "For families who want to invest in next-generation ministry and care.",
    subtitleTa: "அடுத்த தலைமுறை சேவை மற்றும் அக்கறைக்கு குடும்பமாக முதலீடு செய்யும் திட்டம்.",
    suggestedMonthly: [
      { labelEn: "$75/month", labelTa: "$75/மாதம்", amount: 75 },
      { labelEn: "$150/month", labelTa: "$150/மாதம்", amount: 150 },
      { labelEn: "$300/month", labelTa: "$300/மாதம்", amount: 300 },
    ],
    outcomesEn: [
      "Funds kids ministry curriculum, VBS resources, and family events.",
      "Supports prayer & care follow-up for families walking through hard seasons.",
      "Helps keep the church space ready, welcoming, and safe each week.",
    ],
    outcomesTa: [
      "குழந்தைகள் சேவைக்கான பாடத்திட்டம், VBS வளங்கள், குடும்ப நிகழ்வுகள் ஆகியவற்றிற்கு உதவி.",
      "கடினமான காலங்களில் உள்ள குடும்பங்களுக்கு ஜெபம் & அக்கறை ஆதரவு/தொடர்பு உதவி.",
      "ஒவ்வொரு வாரமும் தேவாலயம் வரவேற்பாகவும் பாதுகாப்பாகவும் தயாராக இருக்க உதவி.",
    ],
  },
  {
    id: "business",
    titleEn: "Business Blessing",
    titleTa: "வணிக ஆசீர்வாதம்",
    subtitleEn: "For entrepreneurs and professionals partnering to expand outreach impact.",
    subtitleTa: "அவுட்ரீச் தாக்கத்தை விரிவுபடுத்த தொழில்முனைவோர்/தொழிலாளர்கள் இணையும் திட்டம்.",
    suggestedMonthly: [
      { labelEn: "$500/month", labelTa: "$500/மாதம்", amount: 500 },
      { labelEn: "$1,000/month", labelTa: "$1,000/மாதம்", amount: 1000 },
      { labelEn: "$2,500/month", labelTa: "$2,500/மாதம்", amount: 2500 },
    ],
    outcomesEn: [
      "Strengthens local outreach and benevolence for urgent needs.",
      "Helps support missions partners and special ministry projects.",
      "Enables media upgrades (audio, lighting, video) for better online ministry reach.",
    ],
    outcomesTa: [
      "உடனடி தேவைகளுக்கான சமூக சேவை மற்றும் உதவித் திட்டங்களை வலுப்படுத்தும்.",
      "மிஷன் கூட்டாளர்கள் மற்றும் சிறப்பு சேவை திட்டங்களுக்கு ஆதரவு.",
      "ஆன்லைன் சேவைக்கான மீடியா மேம்பாடுகள் (ஆடியோ/லைட்டிங்/வீடியோ) மூலம் விரிவான தாக்கம்.",
    ],
    noteEn: "If you prefer to sponsor a specific project, contact us and we’ll align it with ministry needs.",
    noteTa: "ஒரு குறிப்பிட்ட திட்டத்தை ஆதரிக்க விரும்பினால், எங்களை தொடர்பு கொள்ளுங்கள்; சேவை தேவைகளுடன் இணைப்போம்.",
  },
]

