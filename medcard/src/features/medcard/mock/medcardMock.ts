/**
 * GENERIC MOCK DATA - NO REAL PII
 * This is used for onboarding demo/testing only
 * Replace with actual user data when they complete onboarding
 */
export const medcardMock = {
  profile: {
    name: "Person One", // Generic placeholder
    dob: "1990-01-01", // Generic placeholder DOB
    bloodType: "O+",
    allergies: ["Example Allergy 1", "Example Allergy 2"],
    conditions: ["Example Condition 1", "Example Condition 2"],
    meds: ["Example Medication 1", "Example Medication 2"],
    emergencyContact: {
      name: "Contact Person", // Generic placeholder
      relationship: "Emergency Contact",
      phone: "+1 (555) 000-0000" // Non-real placeholder number
    },
    notes: "This is generic mock data for onboarding. Edit your actual medical information after onboarding."
  }
} as const;
