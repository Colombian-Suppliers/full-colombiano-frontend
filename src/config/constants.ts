/**
 * Application Constants
 * Define constantes globales de la aplicación
 */

export const ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
} as const;

export const VENDOR_TYPES = {
  NATURAL: 'natural',
  LEGAL: 'legal',
} as const;

export const DOCUMENT_TYPES = {
  NATIONAL_ID: 'national_id',
  FOREIGN_ID: 'foreign_id',
  PASSPORT: 'passport',
  NIT: 'nit',
} as const;

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  [DOCUMENT_TYPES.NATIONAL_ID]: 'Cédula de Ciudadanía (CC)',
  [DOCUMENT_TYPES.FOREIGN_ID]: 'Cédula de Extranjería (CE)',
  [DOCUMENT_TYPES.PASSPORT]: 'Pasaporte',
  [DOCUMENT_TYPES.NIT]: 'NIT',
};

// Timeout constants (in milliseconds)
export const TIMEOUTS = {
  RESEND_VERIFICATION: 60000, // 60 seconds
  RESEND_PASSWORD_RESET: 300000, // 5 minutes
} as const;

export default {
  ROLES,
  VENDOR_TYPES,
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_LABELS,
  TIMEOUTS,
};

