/**
 * Schema for creating review
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794893
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating review
 * @generated from backend schema
 */
export const ReviewCreateSchema = z.object({
  product_id: z.number().int(),
  rating: z.number().int().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().optional(),
});

export type ReviewCreate = z.infer<typeof ReviewCreateSchema>;
