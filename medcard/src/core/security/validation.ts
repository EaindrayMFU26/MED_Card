/**
 * Input Validation Utilities
 * Validates medical data before storage
 */

import { VALIDATION } from '../constants/appConstants';

/**
 * Validates date of birth format and range
 * @param dob Date string in YYYY-MM-DD format
 * @returns true if valid, false otherwise
 */
export const validateDateOfBirth = (dob: string): boolean => {
  // Check format
  if (!VALIDATION.DATE_PATTERN.test(dob)) {
    return false;
  }

  const date = new Date(dob);
  const year = date.getFullYear();

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return false;
  }

  // Check year range
  if (year < VALIDATION.DOB_MIN_YEAR || year > VALIDATION.DOB_MAX_YEAR) {
    return false;
  }

  // Check if DOB is not in the future
  if (date > new Date()) {
    return false;
  }

  return true;
};

/**
 * Validates phone number format
 * @param phone Phone number string
 * @returns true if valid, false otherwise
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === VALIDATION.PHONE_LENGTH && VALIDATION.PHONE_PATTERN.test(phone);
};

/**
 * Validates person name
 * @param name Name string
 * @returns true if valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  const trimmedName = name.trim();
  return (
    trimmedName.length >= VALIDATION.NAME_MIN_LENGTH &&
    trimmedName.length <= VALIDATION.NAME_MAX_LENGTH &&
    /^[a-zA-Z\s'-]+$/.test(trimmedName)
  );
};

/**
 * Validates non-empty string field
 * @param value Field value
 * @returns true if valid, false otherwise
 */
export const validateNonEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates blood type
 * @param bloodType Blood type string
 * @returns true if valid, false otherwise
 */
export const validateBloodType = (bloodType: string): boolean => {
  const validTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  return validTypes.includes(bloodType);
};

/**
 * Validates medication entry
 * @param medication Medication string
 * @returns true if valid, false otherwise
 */
export const validateMedication = (medication: string): boolean => {
  return validateNonEmpty(medication);
};

/**
 * Validates allergy entry
 * @param allergy Allergy string
 * @returns true if valid, false otherwise
 */
export const validateAllergy = (allergy: string): boolean => {
  return validateNonEmpty(allergy);
};

/**
 * Validates medical condition entry
 * @param condition Condition string
 * @returns true if valid, false otherwise
 */
export const validateCondition = (condition: string): boolean => {
  return validateNonEmpty(condition);
};
