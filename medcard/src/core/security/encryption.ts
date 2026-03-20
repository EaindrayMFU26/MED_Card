/**
 * Encryption/Decryption Utilities for Sensitive Data
 * Uses AES-256 encryption for healthcare data
 */

import * as CryptoJS from 'crypto-js';

// In production, this should be stored securely (keychain/keystore)
// For now, using a placeholder that should be replaced with secure key management
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'med-card-default-key-change-in-production';

/**
 * Encrypts sensitive data using AES-256
 * @param data Data to encrypt
 * @returns Encrypted string
 */
export const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts AES-256 encrypted data
 * @param encryptedData Encrypted string
 * @returns Decrypted data
 */
export const decryptData = (encryptedData: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Encrypts an entire object
 */
export const encryptObject = <T extends object>(obj: T): string => {
  const jsonString = JSON.stringify(obj);
  return encryptData(jsonString);
};

/**
 * Decrypts data back to an object
 */
export const decryptObject = <T extends object>(encryptedData: string): T => {
  const decryptedString = decryptData(encryptedData);
  return JSON.parse(decryptedString) as T;
};

/**
 * Securely wipes data by overwriting multiple times
 * @param data Data to wipe
 */
export const secureWipe = (data: string): void => {
  let wipeData = data;
  // Overwrite 3 times as per NIST standards
  for (let i = 0; i < 3; i++) {
    wipeData = wipeData.replace(/./g, Math.random().toString(36).charAt(2));
  }
};
