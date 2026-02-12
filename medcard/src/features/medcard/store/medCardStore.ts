import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { medCardStorage, STORAGE_KEYS } from '../../../core/storage/storage';
import { MedCardProfile } from '../../../models/medcard';

type MedCardState = {
  profile: MedCardProfile;
  setProfile: (profile: Partial<MedCardProfile>) => void;
  resetProfile: () => void;
};

const createEmptyProfile = (): MedCardProfile => ({
  fullName: '',
  dateOfBirth: '',
  bloodType: '',
  allergies: [],
  conditions: [],
  medications: [],
  emergencyContacts: [],
  notes: '',
});

export const useMedCardStore = create<MedCardState>()(
  persist(
    (set) => ({
      profile: createEmptyProfile(),
      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
      resetProfile: () => set({ profile: createEmptyProfile() }),
    }),
    {
      name: STORAGE_KEYS.medCardProfile,
      storage: createJSONStorage(() => medCardStorage),
    }
  )
);
