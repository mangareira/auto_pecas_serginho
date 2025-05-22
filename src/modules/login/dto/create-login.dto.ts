import { z } from 'zod';

export const createLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type CreateLoginDto = z.infer<typeof createLoginSchema>;
