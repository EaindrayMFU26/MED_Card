/**
 * Emergency Contact Utilities
 * Handles calling and contacting emergency services
 */

import { Linking, Alert } from 'react-native';

/**
 * Initiates a phone call to the emergency contact
 * @param phoneNumber Phone number to call
 * @returns Promise that resolves when call intent is opened
 */
export const callEmergencyContact = async (phoneNumber: string): Promise<void> => {
  if (!phoneNumber || phoneNumber.trim() === '') {
    Alert.alert('No Phone Number', 'Emergency contact phone number is not set.');
    return;
  }

  try {
    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to make calls on this device.');
    }
  } catch (error) {
    console.error('Failed to call emergency contact:', error);
    Alert.alert('Error', 'Failed to initiate call. Please try again.');
  }
};

/**
 * Initiates SMS to emergency contact
 * @param phoneNumber Phone number to send SMS
 * @param message Message to send
 */
export const sendSMSToEmergency = async (phoneNumber: string, message?: string): Promise<void> => {
  if (!phoneNumber || phoneNumber.trim() === '') {
    Alert.alert('No Phone Number', 'Emergency contact phone number is not set.');
    return;
  }

  try {
    const url = `sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to send SMS on this device.');
    }
  } catch (error) {
    console.error('Failed to send SMS to emergency contact:', error);
    Alert.alert('Error', 'Failed to send SMS. Please try again.');
  }
};
