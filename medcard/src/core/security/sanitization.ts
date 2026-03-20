/**
 * Input Sanitization Utilities
 * Sanitizes user input to prevent injection attacks
 */

/**
 * Escapes special characters in strings
 * @param input User input string
 * @returns Sanitized string
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Removes control characters and excessive whitespace
 * @param input User input string
 * @returns Cleaned string
 */
export const cleanString = (input: string): string => {
  return input
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
};

/**
 * Sanitizes phone number by removing unwanted characters
 * @param phone Phone string
 * @returns Sanitized phone number
 */
export const sanitizePhoneNumber = (phone: string): string => {
  const cleaned = cleanString(phone);
  // Keep only digits, spaces, hyphens, parentheses, and plus sign
  return cleaned.replace(/[^\d\s\-()+ ]/g, '');
};

/**
 * Sanitizes name input
 * @param name Name string
 * @returns Sanitized name
 */
export const sanitizeName = (name: string): string => {
  const cleaned = cleanString(name);
  // Allow letters, spaces, hyphens, and apostrophes only
  return cleaned.replace(/[^a-zA-Z\s'-]/g, '');
};

/**
 * Sanitizes medical data fields (allergies, medications, conditions)
 * @param input Medical data string
 * @returns Sanitized string
 */
export const sanitizeMedicalData = (input: string): string => {
  const cleaned = cleanString(input);
  // Remove potential injection characters but allow common medical notation
  return cleaned.replace(/[<>{}\[\];]/g, '');
};

/**
 * Sanitizes notes/comments field
 * @param input Notes string
 * @returns Sanitized string
 */
export const sanitizeNotes = (input: string): string => {
  const cleaned = cleanString(input);
  // More permissive for notes, but still escape dangerous content
  return sanitizeString(cleaned);
};

/**
 * Sanitizes date input
 * @param date Date string
 * @returns Sanitized date string
 */
export const sanitizeDate = (date: string): string => {
  // Keep only digits and hyphens for YYYY-MM-DD format
  return cleanString(date).replace(/[^\d-]/g, '');
};

/**
 * Validates and sanitizes list items separated by delimiter
 * @param input List string
 * @param delimiter Separator character
 * @returns Array of sanitized items
 */
export const sanitizeList = (input: string, delimiter: string = ','): string[] => {
  return input
    .split(delimiter)
    .map((item) => cleanString(sanitizeMedicalData(item)))
    .filter((item) => item.length > 0);
};
