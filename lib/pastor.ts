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
}

// Update these details with verified info + photos (and permission for any personal/family details).
export const pastorProfile: PastorProfile = {
  nameEn: "Pastor Mano Tharmalingam",
  nameTa: "போதகர் மனோ தர்மலிங்கம்",
  roleEn: "Senior Pastor",
  roleTa: "முதன்மை ஆசாரியர்",
  // Add a photo at /public/photos/pastor/pastor-mano.jpg when ready.
  photoSrc: "/photos/pastor/pastor-mano.jpg",
  photoFallbackSrc: "/photos/pastor/pastor-placeholder.svg",
  bioEn: [
    "Pastor Mano serves our church family with a calm, respectful, and Christ-centred heart.",
    "He is passionate about prayer, clear Bible teaching, and helping families take practical next steps in faith.",
    "Whether you are new to church or returning after a long time, you are welcome here.",
  ],
  bioTa: [
    "போதகர் மனோ எங்கள் சபைக் குடும்பத்தை அமைதி, மரியாதை, மற்றும் கிறிஸ்துவை மையமாகக் கொண்ட அன்புடன் சேவிக்கிறார்.",
    "ஜெபம், தெளிவான வேதாகம போதனை, மற்றும் குடும்பங்கள் விசுவாசத்தில் நடைமுறை அடுத்த படிகளை எடுக்க உதவுவது இவரது ஆர்வம்.",
    "நீங்கள் சபைக்கு புதிதாக இருந்தாலும் அல்லது நீண்ட இடைவெளிக்குப் பிறகு திரும்ப வந்தவராக இருந்தாலும், நீங்கள் இங்கே வரவேற்கப்படுகிறீர்கள்.",
  ],
  ministryFocusEn: [
    "Bible-based preaching and discipleship",
    "Prayer and pastoral care",
    "Serving Tamil & English families across generations",
    "Helping newcomers feel at home",
  ],
  ministryFocusTa: [
    "வேதாகம அடிப்படையிலான போதனை மற்றும் சீடத்துவம்",
    "ஜெபம் மற்றும் மேய்ப்பர் அக்கறை",
    "பல தலைமுறைகளில் தமிழ் & ஆங்கில குடும்பங்களுக்கு சேவை",
    "புதியவர்களை குடும்பமாக இணைத்தல்",
  ],
  educationEn: ["Add verified education (seminary / degree / training)"],
  educationTa: ["சரிபார்க்கப்பட்ட கல்வி (சேமினரி / பட்டம் / பயிற்சி) விவரங்களைச் சேர்க்கவும்"],
  credentialsEn: ["Add ordination details", "Add ministry history (years, roles, churches)"],
  credentialsTa: ["அபிஷேகம்/அங்கீகாரம் விவரங்களைச் சேர்க்கவும்", "சேவை வரலாறு (ஆண்டுகள், பொறுப்புகள்) சேர்க்கவும்"],
  yearsOfServiceEn: "Add years of service (ex: Serving since 2015)",
  yearsOfServiceTa: "சேவை ஆண்டுகள் (உதா: 2015 முதல் சேவை) சேர்க்கவும்",
  officeHoursEn: "",
  officeHoursTa: "",
  familyEn: "Optional: Add a short family note (with permission).",
  familyTa: "விருப்பம்: குடும்பக் குறிப்பைச் சேர்க்கவும் (அனுமதியுடன்).",
  contactEmail: "pastormano@praisetabernacle.org",
}
