/**
 * Schema for updating coupon
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794673
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating coupon
 * @generated from backend schema
 */
export const CouponUpdateSchema = z.object({
  discount_type: z.string().optional(),
  discount_value: z.string().optional(),
  min_purchase: z.string().optional(),
  max_uses: z.number().int().optional(),
  expires_at: z.string().datetime().optional(),
  is_active: z.boolean().optional(),
});

export type CouponUpdate = z.infer<typeof CouponUpdateSchema>;
