/**
 * Reset password schema
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794357
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Reset password schema
 * @generated from backend schema
 */
export const ResetPasswordSchema = z.object({
  token: z.string(),
  new_password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
  confirm_password: z.string(),
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
