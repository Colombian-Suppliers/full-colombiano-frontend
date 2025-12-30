/**
 * User login schema
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794102
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * User login schema
 * @generated from backend schema
 */
export const UserLoginSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
