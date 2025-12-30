/**
 * JWT token response
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794148
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * JWT token response
 * @generated from backend schema
 */
export const TokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string().optional(),
  token_type: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
