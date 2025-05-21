import { z } from 'zod';

export const createTypeServicesSchema = z.object({
  name: z.string(),
  value: z.number().nonnegative(),
});

export type CreateTypeServicesDto = z.infer<typeof createTypeServicesSchema>;
