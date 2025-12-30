/**
 * Schema for creating order
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794800
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating order
 * @generated from backend schema
 */
export const OrderCreateSchema = z.object({
  items: z.array(z.any()),
  shipping_first_name: z.string(),
  shipping_last_name: z.string(),
  shipping_address_line_1: z.string(),
  shipping_address_line_2: z.string().optional(),
  shipping_city: z.string(),
  shipping_department: z.string(),
  shipping_postal_code: z.string().optional(),
  shipping_phone: z.string(),
  payment_method: z.string(),
  customer_note: z.string().optional(),
});

export type OrderCreate = z.infer<typeof OrderCreateSchema>;
