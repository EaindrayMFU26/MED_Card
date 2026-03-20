import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptData, decryptData, secureWipe } from '../security/encryption';
import { STORAGE_KEYS as APP_STORAGE_KEYS } from '../constants/appConstants';

export const STORAGE_KEYS = APP_STORAGE_KEYS;

/**
 * Secure storage wrapper with encryption for sensitive data
 * Encrypts all data before storage, decrypts on retrieval
 */
class EncryptedAsyncStorage {
  /**
   * Store encrypted data
   * @param key Storage key
   * @param value Data to encrypt and store
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      const encrypted = encryptData(value);
      await AsyncStorage.setItem(key, encrypted);
    } catch (error) {
      console.error(`Failed to store encrypted data for key: ${key}`, error);
      throw new Error('Failed to save data securely');
    }
  }

  /**
   * Retrieve and decrypt data
   * @param key Storage key
   * @returns Decrypted data or null if not found
   */
  async getItem(key: string): Promise<string | null> {
    try {
      const encrypted = await AsyncStorage.getItem(key);
      if (encrypted === null) return null;
      return decryptData(encrypted);
    } catch (error) {
      console.error(`Failed to retrieve encrypted data for key: ${key}`, error);
      throw new Error('Failed to retrieve data');
    }
  }

  /**
   * Remove data securely (overwrite before deletion)
   * @param key Storage key
   */
  async removeItem(key: string): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        secureWipe(data);
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to securely remove data for key: ${key}`, error);
      throw new Error('Failed to delete data');
    }
  }

  /**
   * Clear all stored data
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage', error);
      throw new Error('Failed to clear all data');
    }
  }
}

export const medCardStorage = new EncryptedAsyncStorage();
