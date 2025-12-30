/**
 * Request to review a document
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794541
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Request to review a document
 * @generated from backend schema
 */
export const DocumentReviewRequestSchema = z.object({
  status: z.string(),
  rejection_reason: z.string().optional(),
});

export type DocumentReviewRequest = z.infer<typeof DocumentReviewRequestSchema>;
