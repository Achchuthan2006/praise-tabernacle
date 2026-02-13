export type MissionPartner = {
  id: string
  name: string
  type: "Local" | "Global"
  description: string
}

export type MissionProject = {
  id: string
  titleEn: string
  titleTa: string
  descriptionEn: string
  descriptionTa: string
  progressPercent: number
  goalLabelEn: string
  goalLabelTa: string
}

export type Missionary = {
  id: string
  name: string
  region: string
  focus: string
  description: string
}

export type OutreachInitiative = {
  id: string
  titleEn: string
  titleTa: string
  descriptionEn: string
  descriptionTa: string
  scheduleEn: string
  scheduleTa: string
}

export const missionPartners: MissionPartner[] = [
  {
    id: "m1",
    name: "Local community care",
    type: "Local",
    description: "Practical help and compassionate care initiatives in Mississauga and the GTA.",
  },
  {
    id: "m2",
    name: "Global gospel work",
    type: "Global",
    description: "Prayer and support for mission work abroad through trusted partners and churches.",
  },
  {
    id: "m3",
    name: "Newcomer support",
    type: "Local",
    description: "Friendship, practical help, and connection for newcomers and families.",
  },
  {
    id: "m4",
    name: "Church planting & discipleship",
    type: "Global",
    description: "Supporting discipleship and church planting efforts through prayer and giving.",
  },
]

export const missionProjects: MissionProject[] = [
  {
    id: "proj1",
    titleEn: "Community grocery outreach",
    titleTa: "சமூக உணவு உதவி",
    descriptionEn: "Monthly grocery support for families in need.",
    descriptionTa: "உதவிய தேவையுள்ள குடும்பங்களுக்கு மாதாந்திர உணவு உதவி.",
    progressPercent: 62,
    goalLabelEn: "Goal: 120 families",
    goalLabelTa: "இலக்கு: 120 குடும்பங்கள்",
  },
  {
    id: "proj2",
    titleEn: "Youth mentorship program",
    titleTa: "இளைஞர் வழிகாட்டல் திட்டம்",
    descriptionEn: "Mentorship, tutoring, and spiritual support for teens.",
    descriptionTa: "இளைஞர்களுக்கு வழிகாட்டல், துணைபாடம், ஆன்மீக ஆதரவு.",
    progressPercent: 45,
    goalLabelEn: "Goal: 40 students",
    goalLabelTa: "இலக்கு: 40 மாணவர்கள்",
  },
  {
    id: "proj3",
    titleEn: "Global missions support",
    titleTa: "உலக மிஷன் ஆதரவு",
    descriptionEn: "Funding for partner missionaries and ministry resources.",
    descriptionTa: "கூட்டாளி மிஷனரிகள் மற்றும் வளங்கள்.",
    progressPercent: 78,
    goalLabelEn: "Goal: 3 partners",
    goalLabelTa: "இலக்கு: 3 கூட்டாளிகள்",
  },
]

export const partnerMissionaries: Missionary[] = [
  {
    id: "missionary-1",
    name: "Pastor Samuel & team",
    region: "South India",
    focus: "Church planting & discipleship",
    description: "Serving rural communities with Bible training and local church planting.",
  },
  {
    id: "missionary-2",
    name: "Grace Outreach Center",
    region: "Sri Lanka",
    focus: "Community care",
    description: "Supporting families through practical care and local outreach projects.",
  },
]

export const outreachInitiatives: OutreachInitiative[] = [
  {
    id: "outreach-1",
    titleEn: "Neighborhood prayer walk",
    titleTa: "வட்டார ஜெப நடை",
    descriptionEn: "Pray for local homes and invite neighbors to upcoming services.",
    descriptionTa: "உள்ளூர் வீடுகளுக்காக ஜெபித்து, ஆராதனைகளுக்கு அழைக்கவும்.",
    scheduleEn: "First Saturday • 9:00 AM",
    scheduleTa: "முதல் சனி • காலை 9:00",
  },
  {
    id: "outreach-2",
    titleEn: "Food & care kits",
    titleTa: "உணவு & பராமரிப்பு கிட்கள்",
    descriptionEn: "Pack and distribute care kits to families in need.",
    descriptionTa: "தேவையுள்ள குடும்பங்களுக்கு பராமரிப்பு கிட்களை வழங்குதல்.",
    scheduleEn: "Monthly • Announced",
    scheduleTa: "மாதம் ஒருமுறை • அறிவிப்பு",
  },
]
