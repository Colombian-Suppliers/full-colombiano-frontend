/**
 * Validation utilities for Colombian forms
 * Includes document types (CC, CE, Passport, NIT), emails, passwords, and phone numbers
 */

import { DOCUMENT_TYPES } from '@/config/constants';

// ============================================
// DOCUMENT VALIDATION
// ============================================

/**
 * Validate Colombian Cédula de Ciudadanía (CC)
 * Format: 6-10 digits, only numbers
 */
export const validateCC = (value: string): boolean | string => {
  if (!value) return true;
  
  // Remove spaces and trim
  const cleaned = value.trim().replace(/\s/g, '');
  
  // Must be 6-10 digits
  if (!/^\d{6,10}$/.test(cleaned)) {
    return 'La cédula debe tener entre 6 y 10 dígitos numéricos';
  }
  
  // Cannot be all zeros
  if (/^0+$/.test(cleaned)) {
    return 'La cédula no puede ser todo ceros';
  }
  
  return true;
};

/**
 * Validate Colombian Cédula de Extranjería (CE)
 * Format: 6-10 digits, only numbers
 */
export const validateCE = (value: string): boolean | string => {
  if (!value) return true;
  
  // Remove spaces and trim
  const cleaned = value.trim().replace(/\s/g, '');
  
  // Must be 6-10 digits
  if (!/^\d{6,10}$/.test(cleaned)) {
    return 'La cédula de extranjería debe tener entre 6 y 10 dígitos numéricos';
  }
  
  // Cannot be all zeros
  if (/^0+$/.test(cleaned)) {
    return 'La cédula de extranjería no puede ser todo ceros';
  }
  
  return true;
};

/**
 * Validate International Passport
 * Format: 6-12 alphanumeric characters, no special characters
 */
export const validatePassport = (value: string): boolean | string => {
  if (!value) return true;
  
  // Remove spaces and trim
  const cleaned = value.trim().replace(/\s/g, '');
  
  // Must be 6-12 alphanumeric characters
  if (!/^[A-Z0-9]{6,12}$/i.test(cleaned)) {
    return 'El pasaporte debe tener entre 6 y 12 caracteres alfanuméricos (sin espacios ni caracteres especiales)';
  }
  
  return true;
};

/**
 * Validate Colombian NIT (Número de Identificación Tributaria)
 * Format: 9 digits + 1 verification digit
 */
export const validateNIT = (value: string): boolean | string => {
  if (!value) return true;
  
  // Remove spaces, dots, and hyphens
  const cleaned = value.trim().replace(/[\s.-]/g, '');
  
  // Must be 9-10 digits
  if (!/^\d{9,10}$/.test(cleaned)) {
    return 'El NIT debe tener 9 dígitos más el dígito de verificación';
  }
  
  // Extract number and verification digit
  const nitNumber = cleaned.slice(0, -1);
  const verificationDigit = parseInt(cleaned.slice(-1));
  
  // Calculate verification digit
  const primes = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let sum = 0;
  
  for (let i = 0; i < nitNumber.length; i++) {
    sum += parseInt(nitNumber[nitNumber.length - 1 - i]) * primes[i];
  }
  
  const remainder = sum % 11;
  const calculatedDigit = remainder > 1 ? 11 - remainder : remainder;
  
  if (calculatedDigit !== verificationDigit) {
    return 'El dígito de verificación del NIT no es válido';
  }
  
  return true;
};

/**
 * Generic document validator that routes to specific validators
 */
export const validateDocument = (documentType: string, documentNumber: string): boolean | string => {
  if (!documentNumber || !documentType) return true;
  
  switch (documentType) {
    case DOCUMENT_TYPES.NATIONAL_ID:
    case 'national_id':
    case 'cc':
    case 'Cédula de Ciudadanía (CC)':
      return validateCC(documentNumber);
      
    case DOCUMENT_TYPES.FOREIGN_ID:
    case 'foreign_id':
    case 'ce':
    case 'Cédula de Extranjería (CE)':
      return validateCE(documentNumber);
      
    case DOCUMENT_TYPES.PASSPORT:
    case 'passport':
    case 'Pasaporte':
      return validatePassport(documentNumber);
      
    case DOCUMENT_TYPES.NIT:
    case 'nit':
    case 'NIT':
      return validateNIT(documentNumber);
      
    default:
      return true;
  }
};

// ============================================
// EMAIL VALIDATION
// ============================================

/**
 * Validate email format with strict RFC 5322 compliance
 */
export const validateEmail = (email: string): boolean | string => {
  if (!email) return true;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email.trim())) {
    return 'El formato del correo electrónico no es válido';
  }
  
  // Check for common typos
  const domain = email.split('@')[1];
  const commonTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'yahou.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
  };
  
  const lowerDomain = domain?.toLowerCase();
  if (lowerDomain && commonTypos[lowerDomain]) {
    return `¿Quisiste decir ${email.split('@')[0]}@${commonTypos[lowerDomain]}?`;
  }
  
  return true;
};

/**
 * Validate email match (for confirmation fields)
 */
export const validateEmailMatch = (email: string, confirmEmail: string): boolean | string => {
  if (!email || !confirmEmail) return true;
  
  if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
    return 'Los correos electrónicos no coinciden';
  }
  
  return true;
};

// ============================================
// PASSWORD VALIDATION
// ============================================

/**
 * Password strength requirements for Colombian platform
 * - Minimum 10 characters (increased security)
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * - No common passwords
 */
export const validatePassword = (password: string): boolean | string => {
  if (!password) return true;
  
  // Length check
  if (password.length < 10) {
    return 'La contraseña debe tener al menos 10 caracteres';
  }
  
  // Maximum length
  if (password.length > 128) {
    return 'La contraseña no puede exceder 128 caracteres';
  }
  
  // Uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe contener al menos una letra mayúscula';
  }
  
  // Lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe contener al menos una letra minúscula';
  }
  
  // Number
  if (!/\d/.test(password)) {
    return 'La contraseña debe contener al menos un número';
  }
  
  // Special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'La contraseña debe contener al menos un carácter especial (!@#$%^&*()_+-=[]{};\':"|,.<>/?)';
  }
  
  // Check for common passwords
  const commonPasswords = [
    'password123',
    'qwerty123',
    '12345678',
    'abc123456',
    'Colombia123',
    'Colombia2024',
    'Password123',
    'P@ssw0rd',
  ];
  
  if (commonPasswords.includes(password)) {
    return 'Esta contraseña es demasiado común. Por favor elige una más segura';
  }
  
  // Check for sequential characters
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
    return 'La contraseña no debe contener secuencias obvias de caracteres';
  }
  
  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    return 'La contraseña no debe contener caracteres repetidos consecutivamente';
  }
  
  return true;
};

/**
 * Validate password match (for confirmation fields)
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean | string => {
  if (!password || !confirmPassword) return true;
  
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  
  return true;
};

/**
 * Get password strength level (0-4)
 * 0 = Very Weak, 1 = Weak, 2 = Fair, 3 = Strong, 4 = Very Strong
 */
export const getPasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length
  if (password.length >= 10) strength++;
  if (password.length >= 14) strength++;
  
  // Character variety
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
  
  // Bonus for extra variety
  const uniqueChars = new Set(password.split('')).size;
  if (uniqueChars >= 8) strength++;
  
  return Math.min(strength, 4);
};

// ============================================
// PHONE NUMBER VALIDATION
// ============================================

/**
 * Validate Colombian phone numbers
 * Mobile: 10 digits starting with 3 (e.g., 3001234567)
 * Landline: 7 digits (Bogotá) or 10 digits with area code
 */
export const validateColombianPhone = (phone: string): boolean | string => {
  if (!phone) return true;
  
  // Remove spaces, hyphens, parentheses, and plus sign
  const cleaned = phone.trim().replace(/[\s\-()+ ]/g, '');
  
  // Remove country code if present (57)
  const withoutCountryCode = cleaned.startsWith('57') ? cleaned.slice(2) : cleaned;
  
  // Mobile number: 10 digits starting with 3
  if (/^3\d{9}$/.test(withoutCountryCode)) {
    return true;
  }
  
  // Landline: 7 digits (Bogotá)
  if (/^\d{7}$/.test(withoutCountryCode)) {
    return true;
  }
  
  // Landline with area code: 10 digits starting with 1-9 (not 3)
  if (/^[124-9]\d{9}$/.test(withoutCountryCode)) {
    return true;
  }
  
  return 'El número de teléfono no es válido. Formato: 3001234567 (móvil) o 6012345678 (fijo con indicativo)';
};

/**
 * Format Colombian phone number for display
 */
export const formatColombianPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Mobile: 300 123 4567
  if (cleaned.length === 10 && cleaned.startsWith('3')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  // Landline with area code: (601) 234 5678
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  // Landline: 234 5678
  if (cleaned.length === 7) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  
  return phone;
};

// ============================================
// NAME VALIDATION
// ============================================

/**
 * Validate names (first name, last name)
 * - Only letters, spaces, accents, and hyphens
 * - Minimum 2 characters
 * - Maximum 50 characters
 */
export const validateName = (name: string, fieldName: string = 'nombre'): boolean | string => {
  if (!name) return true;
  
  const trimmed = name.trim();
  
  // Minimum length
  if (trimmed.length < 2) {
    return `El ${fieldName} debe tener al menos 2 caracteres`;
  }
  
  // Maximum length
  if (trimmed.length > 50) {
    return `El ${fieldName} no puede exceder 50 caracteres`;
  }
  
  // Only letters, spaces, accents, hyphens, and apostrophes
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/u.test(trimmed)) {
    return `El ${fieldName} solo puede contener letras, espacios, guiones y apóstrofes`;
  }
  
  // Cannot start or end with space
  if (trimmed !== name.trim()) {
    return `El ${fieldName} no puede comenzar o terminar con espacios`;
  }
  
  // Cannot have multiple consecutive spaces
  if (/\s{2,}/.test(trimmed)) {
    return `El ${fieldName} no puede tener espacios consecutivos`;
  }
  
  return true;
};

/**
 * Validate first name specifically
 */
export const validateFirstName = (firstName: string): boolean | string => {
  return validateName(firstName, 'nombre');
};

/**
 * Validate last name specifically
 */
export const validateLastName = (lastName: string): boolean | string => {
  return validateName(lastName, 'apellido');
};

// ============================================
// EXPORT ALL VALIDATORS
// ============================================

export default {
  // Document validation
  validateCC,
  validateCE,
  validatePassport,
  validateNIT,
  validateDocument,
  
  // Email validation
  validateEmail,
  validateEmailMatch,
  
  // Password validation
  validatePassword,
  validatePasswordMatch,
  getPasswordStrength,
  
  // Phone validation
  validateColombianPhone,
  formatColombianPhone,
  
  // Name validation
  validateName,
  validateFirstName,
  validateLastName,
};

