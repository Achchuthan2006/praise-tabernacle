import { pastorProfile } from "@/lib/pastor"

export type Leader = {
  name: string
  roleEn: string
  roleTa: string
  bioEn: string
  bioTa: string
  photoSrc: string
}

// Replace these with real names, bios, and photo files in /public when ready.
export const leadershipTeam: Leader[] = [
  {
    name: pastorProfile.nameEn,
    roleEn: pastorProfile.roleEn,
    roleTa: pastorProfile.roleTa,
    bioEn: "Serves our church family with prayer, clear Bible teaching, and pastoral care.",
    bioTa: "ஜெபம், தெளிவான வேதாகமப் போதனை, மற்றும் மேய்ப்பர் அக்கறையுடன் எங்கள் சபை குடும்பத்தை சேவிக்கிறார்.",
    photoSrc: pastorProfile.photoSrc,
  },
  {
    name: "Worship & Media Team",
    roleEn: "Worship & Media",
    roleTa: "ஆராதனை & மீடியா",
    bioEn: "Supports worship gatherings and media so the message reaches people in-person and online.",
    bioTa: "ஆராதனைகளையும் மீடியா சேவையையும் ஆதரித்து, நேரிலும் ஆன்லைனிலும் செய்தி சென்றடைய உதவுகிறார்கள்.",
    photoSrc: "/event-family.svg",
  },
  {
    name: "Youth Leaders",
    roleEn: "Youth",
    roleTa: "இளைஞர்",
    bioEn: "Serves students by building community and creating spaces to grow in faith together.",
    bioTa: "இளைஞர்களுக்கான சமூகத்தை கட்டி எழுப்பி, ஒன்றாக விசுவாசத்தில் வளர இடங்களை உருவாக்கி சேவை செய்கிறார்கள்.",
    photoSrc: "/event-community.svg",
  },
]
