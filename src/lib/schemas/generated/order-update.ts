/**
 * Schema for updating order
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794851
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating order
 * @generated from backend schema
 */
export const OrderUpdateSchema = z.object({
  status: z.string().optional(),
  payment_status: z.string().optional(),
  admin_note: z.string().optional(),
});

export type OrderUpdate = z.infer<typeof OrderUpdateSchema>;
