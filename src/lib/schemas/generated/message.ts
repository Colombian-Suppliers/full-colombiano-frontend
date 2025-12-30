/**
 * Generic message response
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794987
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Generic message response
 * @generated from backend schema
 */
export const MessageSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
