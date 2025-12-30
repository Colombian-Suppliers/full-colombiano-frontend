/**
 * Schema for updating review
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794938
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating review
 * @generated from backend schema
 */
export const ReviewUpdateSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().optional(),
  comment: z.string().optional(),
});

export type ReviewUpdate = z.infer<typeof ReviewUpdateSchema>;
