/**
 * Token payload data
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794191
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Token payload data
 * @generated from backend schema
 */
export const TokenDataSchema = z.object({
  user_id: z.number().int().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
});

export type TokenData = z.infer<typeof TokenDataSchema>;
