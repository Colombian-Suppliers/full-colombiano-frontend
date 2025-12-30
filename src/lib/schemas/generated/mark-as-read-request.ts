/**
 * Request to mark announcement as read
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795602
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Request to mark announcement as read
 * @generated from backend schema
 */
export const MarkAsReadRequestSchema = z.object({
  announcement_ids: z.array(z.any()),
});

export type MarkAsReadRequest = z.infer<typeof MarkAsReadRequestSchema>;
