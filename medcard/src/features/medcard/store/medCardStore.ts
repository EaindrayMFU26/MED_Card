import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { medCardStorage, STORAGE_KEYS } from '../../../core/storage/storage';
import { MedCardProfile } from '../../../models/medcard';
import { checklistMock } from '../../checklist/mock/checklistMock';
import { medcardMock } from '../mock/medcardMock';

type ChecklistItem = {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
};

type MedCardState = {
  profile: MedCardProfile;
  checklist: ChecklistItem[];
  userConsent: boolean;
  setProfile: (profile: Partial<MedCardProfile>) => void;
  toggleChecklistItem: (id: string) => void;
  resetProfile: () => void;
  resetChecklist: () => void;
  setUserConsent: (consent: boolean) => void;
};

const createEmptyProfile = (): MedCardProfile => ({
  fullName: '',
  dateOfBirth: '',
  bloodType: '',
  allergies: [],
  conditions: [],
  medications: [],
  emergencyContacts: [],
  notes: ''
});

const createInitialProfile = (): MedCardProfile => ({
  fullName: medcardMock.profile.name,
  dateOfBirth: medcardMock.profile.dob,
  bloodType: medcardMock.profile.bloodType,
  allergies: [...medcardMock.profile.allergies],
  conditions: [...medcardMock.profile.conditions],
  medications: [...medcardMock.profile.meds],
  emergencyContacts: [
    {
      name: medcardMock.profile.emergencyContact.name,
      phone: medcardMock.profile.emergencyContact.phone,
      relation: medcardMock.profile.emergencyContact.relationship
    }
  ],
  notes: medcardMock.profile.notes
});

const initialCheckedIds = new Set(["id-card", "insurance-card", "med-list"]);

const createInitialChecklist = (): ChecklistItem[] =>
  checklistMock.map((item) => ({
    ...item,
    checked: initialCheckedIds.has(item.id)
  }));

export const useMedCardStore = create<MedCardState>()(
  persist(
    (set) => ({
      profile: createInitialProfile(),
      checklist: createInitialChecklist(),
      userConsent: false,
      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
      toggleChecklistItem: (id) =>
        set((state) => ({
          checklist: state.checklist.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        })),
      resetProfile: () => set({ profile: createInitialProfile() }),
      resetChecklist: () => set({ checklist: createInitialChecklist() }),
      setUserConsent: (consent: boolean) => set({ userConsent: consent })
    }),
    {
      name: STORAGE_KEYS.medCardProfile,
      storage: createJSONStorage(() => medCardStorage),
    }
  )
);
