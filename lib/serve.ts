export type ServeOpportunity = {
  id: string
  titleEn: string
  titleTa: string
  tags: string[]
  descriptionEn: string
  descriptionTa: string
  commitmentEn: string
  commitmentTa: string
  skillsEn?: string[]
  skillsTa?: string[]
  requirementsEn?: string[]
  requirementsTa?: string[]
  contactEmail: string
}

export type VolunteerTrainingEvent = {
  id: string
  titleEn: string
  titleTa: string
  whenEn: string
  whenTa: string
  locationEn: string
  locationTa: string
  descriptionEn: string
  descriptionTa: string
}

export const volunteerTrainingEvents: VolunteerTrainingEvent[] = [
  {
    id: "t1",
    titleEn: "Volunteer Orientation",
    titleTa: "தன்னார்வ சேவை அறிமுகம்",
    whenEn: "Saturday • Mar 07, 2026 • 10:00 AM",
    whenTa: "சனி • மார்ச் 07, 2026 • காலை 10:00",
    locationEn: "On-site (Main hall)",
    locationTa: "தளத்தில் (முக்கிய மண்டபம்)",
    descriptionEn: "Learn our teams, expectations, and how to get started serving.",
    descriptionTa: "எங்கள் குழுக்கள், பொறுப்புகள், மற்றும் சேவை தொடங்குவது எப்படி என்பதை அறிந்துகொள்ளுங்கள்.",
  },
  {
    id: "t2",
    titleEn: "Kids Team Safety + Check-in Training",
    titleTa: "குழந்தைகள் குழு பாதுகாப்பு பயிற்சி",
    whenEn: "Saturday • Mar 21, 2026 • 11:00 AM",
    whenTa: "சனி • மார்ச் 21, 2026 • காலை 11:00",
    locationEn: "On-site (Kids area)",
    locationTa: "தளத்தில் (குழந்தைகள் பகுதி)",
    descriptionEn: "A short training on safety guidelines, check-in, and supporting families.",
    descriptionTa: "பாதுகாப்பு வழிகாட்டுதல்கள், செக்-இன், மற்றும் குடும்பங்களுக்கு உதவுவது பற்றிய சிறு பயிற்சி.",
  },
]

export const serveOpportunities: ServeOpportunity[] = [
  {
    id: "s1",
    titleEn: "Welcome Team",
    titleTa: "வரவேற்பு குழு",
    tags: ["Hospitality", "Sundays"],
    descriptionEn: "Greet newcomers, help with directions, and create a warm first impression.",
    descriptionTa: "புதியவர்களை வரவேற்று, வழிகாட்டி, அன்பான முதல் அனுபவத்தை உருவாக்க உதவுங்கள்.",
    commitmentEn: "1–2 Sundays / month",
    commitmentTa: "மாதத்திற்கு 1–2 ஞாயிறுகள்",
    skillsEn: ["Friendly", "Good communication", "Arrive on time"],
    skillsTa: ["அன்பான அணுகுமுறை", "நல்ல தொடர்பு", "நேரம் கடைபிடித்தல்"],
    requirementsEn: ["Complete volunteer orientation", "Follow safety & hospitality guidelines"],
    requirementsTa: ["தன்னார்வ அறிமுகப் பயிற்சி", "பாதுகாப்பு/வரவேற்பு வழிகாட்டுதல்கள்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s2",
    titleEn: "Worship & Tech",
    titleTa: "ஆராதனை & டெக்",
    tags: ["Worship", "Media"],
    descriptionEn: "Support sound, slides, livestream, and worship music.",
    descriptionTa: "ஒலி, ஸ்லைடுகள், நேரலை, ஆராதனை இசை சேவையில் உதவுங்கள்.",
    commitmentEn: "Weekly or rotation",
    commitmentTa: "வாராந்திரம் அல்லது மாறும் முறை",
    skillsEn: ["Audio/visual interest", "Reliability", "Teamwork"],
    skillsTa: ["ஆடியோ/வீடியோ ஆர்வம்", "நம்பகத்தன்மை", "குழுப் பண்பு"],
    requirementsEn: ["Shadow a team member for 1–2 services", "Practice/rehearsal as needed"],
    requirementsTa: ["1–2 ஆராதனைகளில் வழிகாட்டி உதவி", "தேவையான பயிற்சி/ரிஹர்சல்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s3",
    titleEn: "Kids Support",
    titleTa: "குழந்தைகள் உதவி",
    tags: ["Kids", "Safety"],
    descriptionEn: "Assist teachers and help create a safe, joyful environment for kids.",
    descriptionTa: "ஆசிரியர்களுக்கு உதவி செய்து குழந்தைகளுக்கு பாதுகாப்பான, மகிழ்ச்சியான சூழலை உருவாக்குங்கள்.",
    commitmentEn: "Rotation (as needed)",
    commitmentTa: "மாறும் முறை (தேவைக்கேற்ப)",
    skillsEn: ["Patient", "Enjoy working with kids", "Calm under pressure"],
    skillsTa: ["பொறுமை", "குழந்தைகளுடன் பணியாற்ற விருப்பம்", "அமைதி"],
    requirementsEn: ["Kids safety training", "Follow check-in/check-out procedures"],
    requirementsTa: ["குழந்தைகள் பாதுகாப்பு பயிற்சி", "செக்-இன்/செக்-அவுட் நடைமுறைகள்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s4",
    titleEn: "Prayer Team",
    titleTa: "ஜெப குழு",
    tags: ["Prayer", "Care"],
    descriptionEn: "Pray during services, join prayer meetings, and support prayer requests (as assigned).",
    descriptionTa: "ஆராதனைகளில் ஜெபித்து, ஜெப கூட்டங்களில் கலந்து கொண்டு, வேண்டுகோள்களுக்கு ஆதரவு வழங்குங்கள்.",
    commitmentEn: "Weekly or rotation",
    commitmentTa: "வாராந்திரம் அல்லது மாறும் முறை",
    skillsEn: ["Faithful", "Discreet", "Encouraging"],
    skillsTa: ["நம்பிக்கை", "ரகசியம் காப்பது", "உற்சாகப்படுத்துதல்"],
    requirementsEn: ["Attend prayer meeting", "Respect privacy of requests"],
    requirementsTa: ["ஜெப கூட்டங்களில் கலந்து கொள்வது", "வேண்டுகோள்களின் தனியுரிமை காப்பது"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s5",
    titleEn: "Small Groups Host / Leader",
    titleTa: "சிறு குழு நடத்துநர் / வழிநடத்துநர்",
    tags: ["Groups", "Discipleship"],
    descriptionEn: "Host a small group in your home or help lead discussion and care for people.",
    descriptionTa: "உங்கள் வீட்டில் சிறு குழுவை நடத்துங்கள் அல்லது விவாதத்தை வழிநடத்தி அக்கறை செலுத்த உதவுங்கள்.",
    commitmentEn: "Seasonal (8–12 weeks) or ongoing",
    commitmentTa: "காலாண்டு (8–12 வாரங்கள்) அல்லது தொடர்ச்சி",
    skillsEn: ["Hospitality", "Facilitation", "Listening"],
    skillsTa: ["விருந்தோம்பல்", "நடத்தும் திறன்", "கவனமாக கேட்பது"],
    requirementsEn: ["Leader onboarding", "Use provided materials"],
    requirementsTa: ["லீடர் அறிமுகம்", "வழங்கப்பட்டப் பாடத்திட்டம்/உபகரணம் பயன்படுத்துதல்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s6",
    titleEn: "Follow-Up & Care",
    titleTa: "தொடர்பு & அக்கறை",
    tags: ["Care", "Hospitality"],
    descriptionEn: "Help connect with guests and members by phone/text/email so people feel seen and supported.",
    descriptionTa: "அழைப்பு/செய்தி/மின்னஞ்சல் மூலம் விருந்தினர்கள் மற்றும் உறுப்பினர்களுடன் தொடர்பு கொண்டு ஆதரவு அளிக்க உதவுங்கள்.",
    commitmentEn: "Flexible (1–2 hours / week)",
    commitmentTa: "நெகிழ்வானது (வாரத்திற்கு 1–2 மணி)",
    skillsEn: ["Empathy", "Good communication", "Consistency"],
    skillsTa: ["இரக்கம்", "நல்ல தொடர்பு", "தொடர்ச்சித் தன்மை"],
    requirementsEn: ["Respect privacy", "Use approved messaging templates"],
    requirementsTa: ["தனியுரிமை காக்குதல்", "அங்கீகரிக்கப்பட்ட செய்தி வடிவங்களை பயன்படுத்துதல்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s7",
    titleEn: "Photography & Media",
    titleTa: "புகைப்படம் & மீடியா",
    tags: ["Media", "Creative"],
    descriptionEn: "Capture photos and short clips for events and Sundays to help tell our story (with permission).",
    descriptionTa: "நிகழ்வுகள்/ஞாயிறுகளில் புகைப்படங்கள் மற்றும் குறுந்தொடர்கள் பதிவு செய்து எங்கள் கதையை பகிர உதவுங்கள் (அனுமதியுடன்).",
    commitmentEn: "Rotation (events / Sundays)",
    commitmentTa: "மாறும் முறை (நிகழ்வுகள்/ஞாயிறுகள்)",
    skillsEn: ["Camera/phone basics", "Respectful", "Quick turnaround"],
    skillsTa: ["கேமரா/மொபைல் அடிப்படை", "மரியாதை", "விரைவான பணிநிறைவு"],
    requirementsEn: ["Get photo permissions", "Share files securely"],
    requirementsTa: ["புகைப்பட அனுமதி பெறுதல்", "கோப்புகளை பாதுகாப்பாக பகிருதல்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s8",
    titleEn: "Setup & Facilities",
    titleTa: "அமைப்பு & வசதிகள்",
    tags: ["Operations", "Sundays"],
    descriptionEn: "Help with chairs, signage, room setup, and keeping spaces clean and ready for ministry.",
    descriptionTa: "நாற்காலிகள், சைகைகள், அறை அமைப்பு, சுத்தம் ஆகியவற்றில் உதவுங்கள்.",
    commitmentEn: "Sundays (before/after service)",
    commitmentTa: "ஞாயிறுகள் (ஆராதனை முன்/பின்)",
    skillsEn: ["Hands-on", "Reliable", "Safety-minded"],
    skillsTa: ["உழைப்புச் செயல்", "நம்பகத்தன்மை", "பாதுகாப்பு கவனம்"],
    requirementsEn: ["Lift safely", "Arrive early when scheduled"],
    requirementsTa: ["பாதுகாப்பாக தூக்குதல்", "அட்டவணைப்படி முன்பே வருதல்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s9",
    titleEn: "Outreach & Community Care",
    titleTa: "வெளிச்சேவை & சமூக அக்கறை",
    tags: ["Outreach", "Community"],
    descriptionEn: "Serve local needs through outreach projects and practical help (as opportunities are scheduled).",
    descriptionTa: "வெளிச்சேவை திட்டங்கள் மற்றும் நடைமுறை உதவிகள் மூலம் சமூகத்துக்கு சேவை செய்யுங்கள் (அவசரங்கள்/அட்டவணைப்படி).",
    commitmentEn: "Monthly opportunities",
    commitmentTa: "மாதாந்திர வாய்ப்புகள்",
    skillsEn: ["Compassion", "Teamwork", "Flexibility"],
    skillsTa: ["கருணை", "குழுப் பண்பு", "நெகிழ்வு"],
    requirementsEn: ["Attend briefing when scheduled", "Follow outreach guidelines"],
    requirementsTa: ["அட்டவணைப்படி விளக்கக் கூட்டத்தில் கலந்து கொள்வது", "வெளிச்சேவை வழிகாட்டுதல்கள்"],
    contactEmail: "info@praisetabernacle.ca",
  },
  {
    id: "s10",
    titleEn: "Translation / Interpretation",
    titleTa: "மொழிபெயர்ப்பு / விளக்கம்",
    tags: ["Bilingual", "Hospitality"],
    descriptionEn: "Help with English/Tamil translation for key moments so everyone can follow along.",
    descriptionTa: "முக்கிய நேரங்களில் ஆங்கிலம்/தமிழ் மொழிபெயர்ப்பில் உதவுங்கள்; அனைவரும் பின்தொடர உதவும்.",
    commitmentEn: "Rotation",
    commitmentTa: "மாறும் முறை",
    skillsEn: ["Bilingual", "Clear speaking", "Calm under pressure"],
    skillsTa: ["இருமொழி திறன்", "தெளிவான பேச்சு", "அமைதி"],
    requirementsEn: ["Short onboarding", "Practice key vocabulary"],
    requirementsTa: ["சிறு அறிமுக பயிற்சி", "முக்கிய சொற்கள் பயிற்சி"],
    contactEmail: "info@praisetabernacle.ca",
  },
]
