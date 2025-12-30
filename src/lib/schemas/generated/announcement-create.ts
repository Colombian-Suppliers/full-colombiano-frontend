/**
 * Schema for creating announcement
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795427
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for creating announcement
 * @generated from backend schema
 */
export const AnnouncementCreateSchema = z.object({
  title: z.string().min(1, { message: 'Mínimo 1 caracteres' }).max(200),
  subject: z.string().min(1, { message: 'Mínimo 1 caracteres' }).max(200),
  content: z.string(),
  priority: z.string(),
  target_type: z.string(),
  target_user_ids: z.array(z.any()).optional(),
  is_published: z.boolean(),
  published_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
});

export type AnnouncementCreate = z.infer<typeof AnnouncementCreateSchema>;
