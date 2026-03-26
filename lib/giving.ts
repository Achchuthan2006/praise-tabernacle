export type GivingCategory = {
  id: string
  titleEn: string
  titleTa: string
  descriptionEn: string
  descriptionTa: string
  accent?: "tithes" | "missions" | "building" | "projects"
}

export type FinancialReport = {
  id: string
  labelEn: string
  labelTa: string
  href?: string
  status?: "available" | "coming_soon"
}

export const givingCategories: GivingCategory[] = [
  {
    id: "tithes",
    accent: "tithes",
    titleEn: "Tithes & offerings",
    titleTa: "தசமபாகமும் காணிக்கைகளும்",
    descriptionEn: "Support weekly ministry, worship gatherings, and church operations.",
    descriptionTa: "வாராந்திர சேவைகள், ஆராதனை கூட்டங்கள், மற்றும் சபை பணிகளுக்கான ஆதரவு.",
  },
  {
    id: "missions",
    accent: "missions",
    titleEn: "Missions",
    titleTa: "மிஷன்",
    descriptionEn: "Local and global outreach, partner ministries, and community care.",
    descriptionTa: "உள்ளூர் மற்றும் உலக மிஷன், கூட்டாளி சேவைகள், மற்றும் சமூக அக்கறை.",
  },
  {
    id: "building",
    accent: "building",
    titleEn: "Building fund",
    titleTa: "கட்டிட நிதி",
    descriptionEn: "Facilities, upgrades, and future space needs.",
    descriptionTa: "வசதிகள், மேம்பாடுகள், மற்றும் எதிர்கால இடத் தேவைகள்.",
  },
  {
    id: "projects",
    accent: "projects",
    titleEn: "Special projects",
    titleTa: "சிறப்பு திட்டங்கள்",
    descriptionEn: "Time-bound needs such as events, media, or outreach campaigns.",
    descriptionTa: "நிகழ்வுகள், மீடியா, அல்லது வெளிச்சேவை முயற்சிகள் போன்ற காலவரையறை தேவைகள்.",
  },
]

export const financialReports: FinancialReport[] = [
  {
    id: "report-2025",
    labelEn: "2025 Annual report (PDF)",
    labelTa: "2025 ஆண்டு அறிக்கை (PDF)",
    status: "coming_soon",
  },
  {
    id: "report-2024",
    labelEn: "2024 Annual report (PDF)",
    labelTa: "2024 ஆண்டு அறிக்கை (PDF)",
    status: "coming_soon",
  },
]
