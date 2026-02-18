export const checklistMock = [
  {
    id: "id-card",
    label: "Government ID card",
    required: true
  },
  {
    id: "insurance-card",
    label: "Insurance card",
    required: true
  },
  {
    id: "prev-records",
    label: "Previous medical records",
    required: false
  },
  {
    id: "med-list",
    label: "Current medication list",
    required: true
  },
  {
    id: "allergy-list",
    label: "Allergy list",
    required: false
  },
  {
    id: "emergency-contact",
    label: "Emergency contact info",
    required: true
  }
] as const;
