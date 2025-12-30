/**
 * Schema for updating announcement
 * @generated - Do not edit manually
 * Generated at: 2025-12-30T03:39:17.795479
 */

import { z } from 'zod';
import * as enums from './enums';

/**
 * Schema for updating announcement
 * @generated from backend schema
 */
export const AnnouncementUpdateSchema = z.object({
  title: z.string().min(1, { message: 'Mínimo 1 caracteres' }).max(200).optional(),
  subject: z.string().min(1, { message: 'Mínimo 1 caracteres' }).max(200).optional(),
  content: z.string().optional(),
  priority: z.string().optional(),
  target_type: z.string().optional(),
  target_user_ids: z.array(z.any()).optional(),
  is_published: z.boolean().optional(),
  published_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  is_active: z.boolean().optional(),
});

export type AnnouncementUpdate = z.infer<typeof AnnouncementUpdateSchema>;
