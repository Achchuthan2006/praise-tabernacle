export type VisitHighlight = {
  id: string
  titleEn: string
  titleTa: string
  bodyEn: string
  bodyTa: string
}

export type VisitFaq = {
  id: string
  questionEn: string
  questionTa: string
  answerEn: string
  answerTa: string
}

export type PastoralVideo = {
  id: string
  nameEn: string
  nameTa: string
  roleEn: string
  roleTa: string
  videoId?: string
  descriptionEn: string
  descriptionTa: string
}

export const visitHighlights: VisitHighlight[] = [
  {
    id: "parking",
    titleEn: "Parking",
    titleTa: "வாகன நிறுத்தம்",
    bodyEn: "Free parking is available near our unit. Our team can help you find a spot.",
    bodyTa: "எங்கள் யூனிட்டுக்கு அருகில் இலவச வாகன நிறுத்தம் உள்ளது. உதவி வேண்டுமெனில் எங்களைப் பாருங்கள்.",
  },
  {
    id: "service-flow",
    titleEn: "Service flow",
    titleTa: "ஆராதனை நடைமுறை",
    bodyEn: "Worship, prayer, and a clear Bible message. Most services are 75–90 minutes.",
    bodyTa: "ஆராதனை, ஜெபம், வேத போதனை. பொதுவாக 75–90 நிமிடங்கள்.",
  },
  {
    id: "kids-checkin",
    titleEn: "Kids check-in",
    titleTa: "குழந்தைகள் செக்-இன்",
    bodyEn: "Safe, friendly kids check-in. Our team will help you get started.",
    bodyTa: "பாதுகாப்பான குழந்தைகள் செக்-இன். எங்கள் குழு வழிகாட்டும்.",
  },
]

export const visitFaqs: VisitFaq[] = [
  {
    id: "what-time",
    questionEn: "What time should I arrive?",
    questionTa: "எப்போது வருவது நல்லது?",
    answerEn: "Arrive 10–15 minutes early so you can park and settle in.",
    answerTa: "வாகன நிறுத்தம் மற்றும் இடம் பிடிக்க 10–15 நிமிடம் முன்பே வரவும்.",
  },
  {
    id: "kids",
    questionEn: "Is there a kids ministry?",
    questionTa: "குழந்தைகள் சேவை உள்ளதா?",
    answerEn: "Yes. Kids are welcomed and supported with safe check-in.",
    answerTa: "ஆம். பாதுகாப்பான செக்-இன் மூலம் குழந்தைகள் கவனிக்கப்படுவர்.",
  },
  {
    id: "language",
    questionEn: "Is the service in Tamil or English?",
    questionTa: "ஆராதனை தமிழ் அல்லது ஆங்கிலமா?",
    answerEn: "We offer English and Tamil services. See the service schedule on this page.",
    answerTa: "ஆங்கிலமும் தமிழிலும் சேவை உள்ளது. இந்தப் பக்கத்தின் அட்டவணையைப் பாருங்கள்.",
  },
  {
    id: "dress",
    questionEn: "What should I wear?",
    questionTa: "என்ன அணிய வேண்டும்?",
    answerEn: "Whatever is comfortable. There is no formal dress code.",
    answerTa: "உங்களுக்கு வசதியானதை அணியுங்கள். கட்டாய உடை விதி இல்லை.",
  },
]

export const pastoralTeamVideos: PastoralVideo[] = [
  {
    id: "pastor-mano",
    nameEn: "Pastor Mano Tharmalingam",
    nameTa: "போதகர் மனோ தர்மலிங்கம்",
    roleEn: "Senior Pastor",
    roleTa: "முதன்மை ஆசாரியர்",
    videoId: "",
    descriptionEn: "A short welcome and heart behind our Sunday gatherings.",
    descriptionTa: "ஞாயிறு ஆராதனைகளின் இதயம் குறித்து ஒரு குறுகிய அறிமுகம்.",
  },
  {
    id: "pastoral-team",
    nameEn: "Pastoral Team",
    nameTa: "மேய்ப்பர் குழு",
    roleEn: "Care & Prayer",
    roleTa: "அக்கறை & ஜெபம்",
    videoId: "",
    descriptionEn: "Meet the team that serves families and prays with care.",
    descriptionTa: "குடும்பங்களுக்கு சேவை செய்து ஜெபத்தில் துணைபுரியும் குழு.",
  },
]
