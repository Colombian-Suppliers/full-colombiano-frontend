/**
 * Forgot password request schema
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794312
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Forgot password request schema
 * @generated from backend schema
 */
export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
