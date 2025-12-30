/**
 * Request to review multiple documents
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794583
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Request to review multiple documents
 * @generated from backend schema
 */
export const BulkDocumentReviewRequestSchema = z.object({
  document_ids: z.array(z.any()),
  status: z.string(),
  rejection_reason: z.string().optional(),
});

export type BulkDocumentReviewRequest = z.infer<typeof BulkDocumentReviewRequestSchema>;
