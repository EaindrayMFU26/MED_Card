export const medcardMock = {
  profile: {
    name: "Avery Morgan",
    dob: "1992-08-14",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Asthma", "Seasonal allergies"],
    meds: ["Albuterol inhaler", "Cetirizine 10mg"],
    emergencyContact: {
      name: "Jordan Morgan",
      relationship: "Sibling",
      phone: "(555) 217-9041"
    },
    notes: "Prefers morning appointments. Has a rescue inhaler in backpack."
  }
} as const;
