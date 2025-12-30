/**
 * Schema for updating user information
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794495
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating user information
 * @generated from backend schema
 */
export const UserUpdateSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  display_name: z.string().optional(),
  document_type: z.enum(["national_id", "foreign_id", "passport", "nit"]).optional(),
  document_number: z.string().optional(),
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;
