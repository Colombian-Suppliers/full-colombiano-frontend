/**
 * Email verification schema
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794234
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Email verification schema
 * @generated from backend schema
 */
export const EmailVerificationSchema = z.object({
  token: z.string(),
});

export type EmailVerification = z.infer<typeof EmailVerificationSchema>;
