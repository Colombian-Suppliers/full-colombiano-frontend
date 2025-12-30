/**
 * Schema for updating product variation
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795113
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating product variation
 * @generated from backend schema
 */
export const ProductVariationUpdateSchema = z.object({
  sku: z.string().optional(),
  price: z.string().optional(),
  sale_price: z.string().optional(),
  stock_quantity: z.number().int().optional(),
  manage_stock: z.boolean().optional(),
  stock_status: z.string().optional(),
  weight: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  attributes: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type ProductVariationUpdate = z.infer<typeof ProductVariationUpdateSchema>;
