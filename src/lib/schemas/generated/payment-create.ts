/**
 * Schema for creating payment
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795651
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating payment
 * @generated from backend schema
 */
export const PaymentCreateSchema = z.object({
  order_id: z.number().int(),
  amount: z.string(),
  payment_method: z.string(),
  transaction_id: z.string().optional(),
});

export type PaymentCreate = z.infer<typeof PaymentCreateSchema>;
