/**
 * Schema for creating coupon
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794626
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating coupon
 * @generated from backend schema
 */
export const CouponCreateSchema = z.object({
  code: z.string().min(3, { message: 'Mínimo 3 caracteres' }).max(50),
  discount_type: z.string(),
  discount_value: z.string(),
  min_purchase: z.string().optional(),
  max_uses: z.number().int().optional(),
  expires_at: z.string().datetime().optional(),
});

export type CouponCreate = z.infer<typeof CouponCreateSchema>;
