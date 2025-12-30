/**
 * Schema for creating order item
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794711
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating order item
 * @generated from backend schema
 */
export const OrderItemCreateSchema = z.object({
  product_id: z.number().int(),
  variation_id: z.number().int().optional(),
  quantity: z.number().int(),
  price: z.string(),
});

export type OrderItemCreate = z.infer<typeof OrderItemCreateSchema>;
