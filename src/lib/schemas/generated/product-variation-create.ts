/**
 * Schema for creating product variation
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795046
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating product variation
 * @generated from backend schema
 */
export const ProductVariationCreateSchema = z.object({
  sku: z.string().optional(),
  price: z.string(),
  sale_price: z.string().optional(),
  stock_quantity: z.number().int().optional(),
  manage_stock: z.boolean(),
  stock_status: z.string(),
  weight: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  attributes: z.string().optional(),
});

export type ProductVariationCreate = z.infer<typeof ProductVariationCreateSchema>;
