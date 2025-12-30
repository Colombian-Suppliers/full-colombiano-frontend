/**
 * Address schema for registration
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.793791
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Address schema for registration
 * @generated from backend schema
 */
export const AddressSchemaSchema = z.object({
  department: z.string(),
  city: z.string(),
  line_1: z.string(),
  line_2: z.string().optional(),
});

export type AddressSchema = z.infer<typeof AddressSchemaSchema>;
