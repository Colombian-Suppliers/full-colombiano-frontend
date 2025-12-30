/**
 * Refresh token request
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794401
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Refresh token request
 * @generated from backend schema
 */
export const RefreshTokenSchema = z.object({
  refresh_token: z.string(),
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
