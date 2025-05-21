/* eslint-disable no-useless-escape */
import { z } from 'zod';

export const createHelperSchema = z
  .object({
    name: z
      .string({
        required_error: 'Nome é obrigatório',
        invalid_type_error: 'Nome deve ser um texto',
      })
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .max(255, 'Nome não pode ultrapassar 255 caracteres'),
    phone: z
      .string({
        required_error: 'Telefone é obrigatório',
        invalid_type_error: 'Telefone deve ser um texto',
      })
      .regex(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      )
      .transform((val) => val.replace(/\s/g, '')),
  })
  .required();

export type CreateHelperDto = z.infer<typeof createHelperSchema>;
