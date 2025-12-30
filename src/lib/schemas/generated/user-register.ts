/**
 * User registration schema
    Handles both customer and vendor registration
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.793932
 */

import { z } from 'zod';
import * as enums from './enums';
import { AddressSchema } from './address-schema';

/**
 * User registration schema
    Handles both customer and vendor registration
 * @generated from backend schema
 */
export const UserRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
  password_confirmation: z.string(),
  role: z.enum(["customer", "vendor", "admin"]),
  accept_terms: z.boolean().refine((val) => val, { message: 'Debes aceptar los términos y condiciones' }),
  accept_privacy: z.boolean().refine((val) => val, { message: 'Debes aceptar la política de privacidad' }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  document_type: z.enum(["national_id", "foreign_id", "passport", "nit"]).optional(),
  document_number: z.string().optional(),
  vendor_type: z.enum(["natural", "juridica"]).optional(),
  store_name: z.string().optional(),
  store_phone: z.string().optional(),
  store_email: z.string().email().optional(),
  store_confirm_email: z.string().email().optional(),
  store_address: AddressSchema.optional(),
  store_category_ids: z.array(z.any()).optional(),
  issues_electronic_invoice: z.boolean().optional(),
  personal_phone: z.string().optional(),
  personal_email: z.string().email().optional(),
  personal_address: AddressSchema.optional(),
  company_name: z.string().optional(),
  company_nit: z.string().optional(),
  company_phone: z.string().optional(),
  company_email: z.string().email().optional(),
  company_confirm_email: z.string().email().optional(),
  company_address: AddressSchema.optional(),
  legal_rep_first_name: z.string().optional(),
  legal_rep_last_name: z.string().optional(),
  legal_rep_document_type: z.enum(["national_id", "foreign_id", "passport", "nit"]).optional(),
  legal_rep_document_number: z.string().optional(),
  legal_rep_phone: z.string().optional(),
  legal_rep_email: z.string().email().optional(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
