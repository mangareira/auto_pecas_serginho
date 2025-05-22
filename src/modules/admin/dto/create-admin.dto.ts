import { z } from 'zod';

export const createAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type CreateAdminDto = z.infer<typeof createAdminSchema>;
