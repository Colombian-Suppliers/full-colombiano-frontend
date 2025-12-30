/**
 * Custom Authentication Schemas
 * 
 * These schemas extend the auto-generated backend schemas with Colombian-specific
 * validation rules and enhanced client-side validation.
 * 
 * @extends UserRegisterSchema from generated schemas
 */

import { z } from 'zod';
import { 
  UserRegisterSchema,
  AddressSchemaSchema as GeneratedAddressSchema,
  DocumentType,
  UserRole,
  VendorType
} from '@colombian-suppliers/shared-schemas';
import {
  validateDocument,
  validateEmail,
  validateEmailMatch,
  validatePassword,
  validatePasswordMatch,
  validateColombianPhone,
  validateFirstName,
  validateLastName,
} from '@/utils/validations';

// ============================================
// ADDRESS SCHEMA WITH COLOMBIAN VALIDATION
// ============================================

export const AddressSchema = z.object({
  department: z.string().min(1, 'El departamento es requerido'),
  city: z.string().min(1, 'La ciudad es requerida'),
  line_1: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  line_2: z.string().optional(),
});

export type Address = z.infer<typeof AddressSchema>;

// ============================================
// USER REGISTRATION SCHEMA (ENHANCED)
// ============================================

/**
 * Enhanced user registration schema with Colombian validation
 */
export const EnhancedUserRegisterSchema = z.object({
  // Common fields
  email: z.string()
    .min(1, 'El correo es requerido')
    .refine(validateEmail, { message: 'El formato del correo electrónico no es válido' }),
  
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .refine(validatePassword, (val) => ({ 
      message: typeof val === 'string' ? val : 'La contraseña no cumple los requisitos' 
    })),
  
  password_confirmation: z.string()
    .min(1, 'Confirma tu contraseña'),
  
  role: z.enum(['customer', 'vendor', 'admin']),
  
  accept_terms: z.boolean()
    .refine((val) => val === true, { 
      message: 'Debes aceptar los términos y condiciones' 
    }),
  
  accept_privacy: z.boolean()
    .refine((val) => val === true, { 
      message: 'Debes aceptar la política de privacidad' 
    }),
  
  // Customer fields
  first_name: z.string()
    .optional()
    .refine((val) => !val || validateFirstName(val) === true, {
      message: 'El nombre solo puede contener letras, espacios y guiones'
    }),
  
  last_name: z.string()
    .optional()
    .refine((val) => !val || validateLastName(val) === true, {
      message: 'El apellido solo puede contener letras, espacios y guiones'
    }),
  
  document_type: z.enum(['national_id', 'foreign_id', 'passport', 'nit']).optional(),
  
  document_number: z.string().optional(),
  
  // Vendor fields
  vendor_type: z.enum(['natural', 'juridica']).optional(),
  
  store_name: z.string().optional(),
  
  store_phone: z.string()
    .optional()
    .refine((val) => !val || validateColombianPhone(val) === true, {
      message: 'El teléfono no es válido. Formato: 3001234567'
    }),
  
  store_email: z.string()
    .optional()
    .refine((val) => !val || validateEmail(val) === true, {
      message: 'El formato del correo no es válido'
    }),
  
  store_confirm_email: z.string().optional(),
  
  store_address: AddressSchema.optional(),
  
  store_category_ids: z.array(z.number()).optional(),
  
  issues_electronic_invoice: z.boolean().optional(),
  
  // Natural person fields
  personal_phone: z.string()
    .optional()
    .refine((val) => !val || validateColombianPhone(val) === true, {
      message: 'El teléfono no es válido'
    }),
  
  personal_email: z.string()
    .optional()
    .refine((val) => !val || validateEmail(val) === true, {
      message: 'El formato del correo no es válido'
    }),
  
  personal_address: AddressSchema.optional(),
  
  // Juridica fields
  company_name: z.string().optional(),
  
  company_nit: z.string()
    .optional()
    .refine((val) => !val || validateDocument('nit', val) === true, {
      message: 'El NIT no es válido'
    }),
  
  company_phone: z.string()
    .optional()
    .refine((val) => !val || validateColombianPhone(val) === true, {
      message: 'El teléfono no es válido'
    }),
  
  company_email: z.string()
    .optional()
    .refine((val) => !val || validateEmail(val) === true, {
      message: 'El formato del correo no es válido'
    }),
  
  company_confirm_email: z.string().optional(),
  
  company_address: AddressSchema.optional(),
  
  // Legal representative
  legal_rep_first_name: z.string()
    .optional()
    .refine((val) => !val || validateFirstName(val) === true, {
      message: 'El nombre solo puede contener letras'
    }),
  
  legal_rep_last_name: z.string()
    .optional()
    .refine((val) => !val || validateLastName(val) === true, {
      message: 'El apellido solo puede contener letras'
    }),
  
  legal_rep_document_type: z.enum(['national_id', 'foreign_id', 'passport', 'nit']).optional(),
  
  legal_rep_document_number: z.string().optional(),
  
  legal_rep_phone: z.string()
    .optional()
    .refine((val) => !val || validateColombianPhone(val) === true, {
      message: 'El teléfono no es válido'
    }),
  
  legal_rep_email: z.string()
    .optional()
    .refine((val) => !val || validateEmail(val) === true, {
      message: 'El formato del correo no es válido'
    }),
})
.refine((data) => {
  // Password confirmation validation
  return validatePasswordMatch(data.password, data.password_confirmation) === true;
}, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation'],
})
.refine((data) => {
  // Store email confirmation
  if (data.store_email && data.store_confirm_email) {
    return validateEmailMatch(data.store_email, data.store_confirm_email) === true;
  }
  return true;
}, {
  message: 'Los correos de la tienda no coinciden',
  path: ['store_confirm_email'],
})
.refine((data) => {
  // Company email confirmation
  if (data.company_email && data.company_confirm_email) {
    return validateEmailMatch(data.company_email, data.company_confirm_email) === true;
  }
  return true;
}, {
  message: 'Los correos de la empresa no coinciden',
  path: ['company_confirm_email'],
})
.refine((data) => {
  // Document validation based on type
  if (data.document_type && data.document_number) {
    return validateDocument(data.document_type, data.document_number) === true;
  }
  return true;
}, {
  message: 'El número de documento no es válido',
  path: ['document_number'],
})
.refine((data) => {
  // Legal representative document validation
  if (data.legal_rep_document_type && data.legal_rep_document_number) {
    return validateDocument(data.legal_rep_document_type, data.legal_rep_document_number) === true;
  }
  return true;
}, {
  message: 'El número de documento del representante no es válido',
  path: ['legal_rep_document_number'],
});

export type EnhancedUserRegister = z.infer<typeof EnhancedUserRegisterSchema>;

// ============================================
// LOGIN SCHEMA
// ============================================

export const LoginSchema = z.object({
  username: z.string()
    .min(1, 'El correo es requerido')
    .refine(validateEmail, { message: 'El formato del correo no es válido' }),
  
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  
  remember: z.boolean().optional(),
});

export type Login = z.infer<typeof LoginSchema>;

// ============================================
// RESET PASSWORD SCHEMA
// ============================================

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'El token es requerido'),
  
  new_password: z.string()
    .min(1, 'La contraseña es requerida')
    .refine(validatePassword, (val) => ({ 
      message: typeof val === 'string' ? val : 'La contraseña no cumple los requisitos' 
    })),
  
  confirm_password: z.string()
    .min(1, 'Confirma tu contraseña'),
})
.refine((data) => {
  return validatePasswordMatch(data.new_password, data.confirm_password) === true;
}, {
  message: 'Las contraseñas no coinciden',
  path: ['confirm_password'],
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;

// ============================================
// FORGOT PASSWORD SCHEMA
// ============================================

export const ForgotPasswordSchema = z.object({
  email: z.string()
    .min(1, 'El correo es requerido')
    .refine(validateEmail, { message: 'El formato del correo no es válido' }),
});

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;

// ============================================
// RESEND VERIFICATION SCHEMA
// ============================================

export const ResendVerificationSchema = z.object({
  email: z.string()
    .min(1, 'El correo es requerido')
    .refine(validateEmail, { message: 'El formato del correo no es válido' }),
});

export type ResendVerification = z.infer<typeof ResendVerificationSchema>;

// ============================================
// EXPORTS
// ============================================

export {
  DocumentType,
  UserRole,
  VendorType,
} from '@colombian-suppliers/shared-schemas';

