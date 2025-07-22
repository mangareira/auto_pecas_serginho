import { z } from 'zod';

export const createItemSchema = z
  .object({
    name: z
      .string({
        required_error: 'Nome é obrigatório',
        invalid_type_error: 'Nome deve ser um texto',
      })
      .min(3, 'Nome deve ter pelo menos 3 caracteres'),
    description: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    value: z.number().nonnegative(),
  })
  .required();

export type CreateItemDto = z.infer<typeof createItemSchema>;
