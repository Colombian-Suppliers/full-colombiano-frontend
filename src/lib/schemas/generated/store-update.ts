/**
 * Schema for updating store information
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.794443
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating store information
 * @generated from backend schema
 */
export const StoreUpdateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  department: z.string().optional(),
  city: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  issues_electronic_invoice: z.boolean().optional(),
});

export type StoreUpdate = z.infer<typeof StoreUpdateSchema>;
