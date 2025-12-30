/**
 * Schema for importing categories
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795311
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for importing categories
 * @generated from backend schema
 */
export const CategoryImportSchema = z.object({
  categories: z.array(z.any()),
});

export type CategoryImport = z.infer<typeof CategoryImportSchema>;
