/**
 * Schema for importing tags
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795372
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for importing tags
 * @generated from backend schema
 */
export const TagImportSchema = z.object({
  tags: z.array(z.any()),
});

export type TagImport = z.infer<typeof TagImportSchema>;
