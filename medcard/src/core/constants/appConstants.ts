/**
 * Application-wide Constants
 * Replaces hardcoded magic numbers and strings
 */

export const DIMENSIONS = {
  progressBarHeight: 8,
  checkboxSize: 20,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const PADDING = {
  default: 16,
  card: 16,
  button: 12,
  buttonAdjustment: 4,
};

export const PROGRESS = {
  maxValue: 1,
  minChecklistCount: 1,
};

export const CHECKLIST = {
  defaultCheckedIds: ['id-card', 'insurance-card', 'med-list'] as const,
  separator: ',',
};

export const ONBOARDING = {
  completedFlag: 'true',
  storageKey: 'hasOnboarded',
};

export const VALIDATION = {
  DOB_MIN_YEAR: 1920,
  DOB_MAX_YEAR: new Date().getFullYear(),
  PHONE_LENGTH: 10,
  PHONE_PATTERN: /^[\d\s\-()+]+$/,
  DATE_PATTERN: /^\d{4}-\d{2}-\d{2}$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
};

export const STORAGE_KEYS = {
  medCardProfile: 'medcard_profile',
  hasOnboarded: 'has_onboarded',
  checklist: 'medcard_checklist',
};

export const MEDICATIONS_SEPARATOR = ',';

export const FIRST_NAME_INDEX = 0;
export const FIRST_ITEM_INDEX = 0;
