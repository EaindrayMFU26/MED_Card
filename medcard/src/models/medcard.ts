export type EmergencyContact = {
  name: string;
  phone: string;
  relation: string;
};

export type MedCardProfile = {
  fullName: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyContacts: EmergencyContact[];
  notes: string;
};
