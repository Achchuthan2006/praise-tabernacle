export type PastorProfile = {
  nameEn: string
  nameTa: string
  roleEn: string
  roleTa: string
  photoSrc: string
  photoFallbackSrc?: string
  bioEn: string[]
  bioTa: string[]
  ministryFocusEn: string[]
  ministryFocusTa: string[]
  educationEn: string[]
  educationTa: string[]
  credentialsEn: string[]
  credentialsTa: string[]
  yearsOfServiceEn?: string
  yearsOfServiceTa?: string
  officeHoursEn?: string
  officeHoursTa?: string
  familyEn?: string
  familyTa?: string
  contactEmail: string
  introVideoId?: string
}

export const pastorProfile: PastorProfile = {
  nameEn: "Pastor Mano Tharmalingam",
  nameTa: "போதகர் மனோ தர்மலிங்கம்",
  roleEn: "Senior Pastor",
  roleTa: "முதன்மை போதகர்",
  photoSrc: "/Pastor%20Mano.jpg",
  photoFallbackSrc: "/photos/pastor/pastor-placeholder.svg",
  bioEn: [
    "Pastor Mano serves Praise Tabernacle with a calm, prayerful, and Christ-centred heart.",
    "His ministry emphasises clear Bible teaching, pastoral care, and helping Tamil and English families take practical next steps in faith.",
    "Whether you are exploring church for the first time or returning after many years, his desire is to help people feel welcomed, grounded, and encouraged in Jesus.",
  ],
  bioTa: [
    "போதகர் மனோ துதியின் கூடார சபையை அமைதியான, ஜெபமுள்ள, கிறிஸ்துவை மையமாகக் கொண்ட இதயத்துடன் சேவிக்கிறார்.",
    "அவருடைய ஊழியம் தெளிவான வேதாகம போதனை, மேய்ப்புப் பராமரிப்பு, மற்றும் தமிழ், ஆங்கில குடும்பங்கள் விசுவாசத்தில் நடைமுறை அடுத்த படிகளை எடுக்க உதவுவதில் கவனம் செலுத்துகிறது.",
    "சபைக்கு முதன்முறையாக வருபவர்களாக இருந்தாலும் அல்லது பல ஆண்டுகள் கழித்து திரும்பி வருபவர்களாக இருந்தாலும், அனைவரும் இயேசுவில் வரவேற்கப்பட்டு, நிலைநிறுத்தப்பட்டு, ஊக்கப்படவேண்டும் என்பதே அவரின் விருப்பம்.",
  ],
  ministryFocusEn: [
    "Bible-based preaching and discipleship",
    "Prayer and pastoral care",
    "Serving Tamil and English families across generations",
    "Helping newcomers feel at home in church life",
  ],
  ministryFocusTa: [
    "வேதாகம அடிப்படையிலான பிரசங்கமும் சீடத்துவமும்",
    "ஜெபமும் மேய்ப்புப் பராமரிப்பும்",
    "பல தலைமுறைகளில் தமிழ் மற்றும் ஆங்கில குடும்பங்களுக்கு சேவை செய்வது",
    "புதியவர்கள் சபை வாழ்வில் வீட்டிலிருக்கிறதுபோல் உணர உதவுவது",
  ],
  educationEn: [],
  educationTa: [],
  credentialsEn: [],
  credentialsTa: [],
  yearsOfServiceEn: "",
  yearsOfServiceTa: "",
  officeHoursEn: "Please contact the church office to arrange a pastoral appointment.",
  officeHoursTa: "மேய்ப்பருடன் சந்திப்பு ஏற்பாடு செய்ய சபை அலுவலகத்தைத் தொடர்புகொள்ளுங்கள்.",
  familyEn: "",
  familyTa: "",
  contactEmail: "pastormano@praisetabernacle.org",
  introVideoId: "",
}
