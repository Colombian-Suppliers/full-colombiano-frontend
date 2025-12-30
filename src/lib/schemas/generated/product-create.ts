/**
 * Schema for creating a product
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795178
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating a product
 * @generated from backend schema
 */
export const ProductCreateSchema = z.object({
  name: z.string().min(1, { message: 'Mínimo 1 caracteres' }).max(200),
  product_type: z.string(),
  short_description: z.string().optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
  price: z.string(),
  sale_price: z.string().optional(),
  sale_date_from: z.string().datetime().optional(),
  sale_date_to: z.string().datetime().optional(),
  manage_stock: z.boolean(),
  stock_quantity: z.number().int().optional(),
  stock_status: z.string(),
  weight: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  commission_rate: z.string().optional(),
  category_ids: z.array(z.any()).optional(),
  tag_ids: z.array(z.any()).optional(),
  is_featured: z.boolean(),
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
