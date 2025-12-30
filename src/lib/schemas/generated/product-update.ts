/**
 * Schema for updating a product
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795245
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating a product
 * @generated from backend schema
 */
export const ProductUpdateSchema = z.object({
  name: z.string().min(1, { message: 'Mínimo 1 caracteres' }).max(200).optional(),
  product_type: z.string().optional(),
  short_description: z.string().optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
  price: z.string().optional(),
  sale_price: z.string().optional(),
  sale_date_from: z.string().datetime().optional(),
  sale_date_to: z.string().datetime().optional(),
  manage_stock: z.boolean().optional(),
  stock_quantity: z.number().int().optional(),
  stock_status: z.string().optional(),
  weight: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  commission_rate: z.string().optional(),
  category_ids: z.array(z.any()).optional(),
  tag_ids: z.array(z.any()).optional(),
  is_featured: z.boolean().optional(),
  is_active: z.boolean().optional(),
});

export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
