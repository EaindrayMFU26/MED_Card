import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  medCardProfile: 'medcard-profile',
  hasOnboarded: 'medcard-has-onboarded',
};

export const medCardStorage = AsyncStorage;
