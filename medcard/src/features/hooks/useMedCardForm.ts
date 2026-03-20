/**
 * Custom Hook: useMedCardForm
 * Manages form state and validation for medical card editing
 * Simplifies MedCardEditScreen by extracting form logic
 */

import { useState, useEffect } from 'react';
import { useMedCardStore } from '../medcard/store/medCardStore';
import {
  validateDateOfBirth,
  validatePhoneNumber,
  validateName,
} from '../../core/security/validation';
import {
  sanitizeName,
  sanitizePhoneNumber,
  sanitizeMedicalData,
  sanitizeNotes,
  sanitizeDate,
} from '../../core/security/sanitization';
import { MedCardProfile } from '../../models/medcard';

export interface MedCardFormData {
  name: string;
  dob: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  notes: string;
}

export interface FormErrors {
  [key: string]: string;
}

interface UseMedCardFormReturn {
  formData: MedCardFormData;
  setFormData: (data: Partial<MedCardFormData>) => void;
  errors: FormErrors;
  clearErrors: () => void;
  validateForm: () => boolean;
  addChip: (category: 'allergies' | 'conditions' | 'medications', value: string) => void;
  removeChip: (category: 'allergies' | 'conditions' | 'medications', index: number) => void;
  handleSave: () => Promise<boolean>;
}

/**
 * Manages medical card form state, validation, and sanitization
 */
export const useMedCardForm = (profile: MedCardProfile): UseMedCardFormReturn => {
  const [formData, setFormDataState] = useState<MedCardFormData>({
    name: profile?.fullName || '',
    dob: profile?.dateOfBirth || '',
    bloodType: profile?.bloodType || '',
    allergies: profile?.allergies || [],
    conditions: profile?.conditions || [],
    medications: profile?.medications || [],
    emergencyName: profile?.emergencyContacts?.[0]?.name || '',
    emergencyRelation: profile?.emergencyContacts?.[0]?.relation || '',
    emergencyPhone: profile?.emergencyContacts?.[0]?.phone || '',
    notes: profile?.notes || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const setProfile = useMedCardStore((state) => state.setProfile);

  // Sync form data with profile changes
  useEffect(() => {
    if (profile) {
      setFormDataState({
        name: profile.fullName || '',
        dob: profile.dateOfBirth || '',
        bloodType: profile.bloodType || '',
        allergies: profile.allergies || [],
        conditions: profile.conditions || [],
        medications: profile.medications || [],
        emergencyName: profile.emergencyContacts?.[0]?.name || '',
        emergencyRelation: profile.emergencyContacts?.[0]?.relation || '',
        emergencyPhone: profile.emergencyContacts?.[0]?.phone || '',
        notes: profile.notes || '',
      });
    }
  }, [profile]);

  const setFormData = (updates: Partial<MedCardFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...updates }));
    // Clear errors when user updates field
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach((key) => {
        delete newErrors[key];
      });
      return newErrors;
    });
  };

  const clearErrors = () => {
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be 2-100 characters, letters only';
    }

    // Validate DOB
    if (formData.dob && !validateDateOfBirth(formData.dob)) {
      newErrors.dob = 'Date of birth must be valid and not in the future';
    }

    // Validate emergency contact
    if (formData.emergencyName && !validateName(formData.emergencyName)) {
      newErrors.emergencyName = 'Emergency contact name is invalid';
    }

    if (formData.emergencyPhone && !validatePhoneNumber(formData.emergencyPhone)) {
      newErrors.emergencyPhone = 'Phone number must be 10 digits';
    }

    // At least one of name or phone for emergency contact
    if ((formData.emergencyName || formData.emergencyPhone) && !formData.emergencyName) {
      newErrors.emergency = 'Emergency contact name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addChip = (category: 'allergies' | 'conditions' | 'medications', value: string) => {
    const sanitized = sanitizeMedicalData(value).trim();
    if (sanitized && !formData[category].includes(sanitized)) {
      setFormData({
        [category]: [...formData[category], sanitized],
      });
    }
  };

  const removeChip = (category: 'allergies' | 'conditions' | 'medications', index: number) => {
    setFormData({
      [category]: formData[category].filter((_, i) => i !== index),
    });
  };

  const handleSave = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    try {
      const updatedProfile: Partial<MedCardProfile> = {
        ...profile,
        fullName: sanitizeName(formData.name),
        dateOfBirth: sanitizeDate(formData.dob),
        bloodType: formData.bloodType,
        allergies: formData.allergies.map(sanitizeMedicalData),
        conditions: formData.conditions.map(sanitizeMedicalData),
        medications: formData.medications.map(sanitizeMedicalData),
        notes: sanitizeNotes(formData.notes),
        emergencyContacts: [
          {
            name: sanitizeName(formData.emergencyName),
            relation: formData.emergencyRelation,
            phone: sanitizePhoneNumber(formData.emergencyPhone),
          },
        ],
      };

      setProfile(updatedProfile);
      return true;
    } catch (error) {
      console.error('Failed to save medical card:', error);
      setErrors({ submit: 'Failed to save changes. Please try again.' });
      return false;
    }
  };

  return {
    formData,
    setFormData,
    errors,
    clearErrors,
    validateForm,
    addChip,
    removeChip,
    handleSave,
  };
};
