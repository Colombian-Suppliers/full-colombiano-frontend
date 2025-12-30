/**
 * Resend verification email schema
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794273
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Resend verification email schema
 * @generated from backend schema
 */
export const ResendVerificationSchema = z.object({
  email: z.string().email(),
});

export type ResendVerification = z.infer<typeof ResendVerificationSchema>;
