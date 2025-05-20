/* eslint-disable no-useless-escape */
import { z } from 'zod';

const uuidSchema = z.string().uuid('ID inválido');

export const CreateServiceSchema = z
  .object({
    client: z.string().min(3, 'Cliente deve ter pelo menos 3 caracteres'),
    date: z.string().datetime({ message: 'Data inválida' }),
    vehicle: z.string().min(2, 'Veículo inválido'),
    plate: z.string(),
    particular: z.boolean(),
    enterprise: z.boolean(),
    enterprise_name: z.string().optional(),
    phone: z
      .string()
      .regex(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
        'Telefone inválido',
      ),
    diagnoses: z.string().min(10, 'Diagnóstico muito curto'),
    employeesId: uuidSchema,
    helpersId: uuidSchema.optional(),
    type_services: z
      .array(z.string().uuid())
      .min(1, 'Selecione pelo menos um tipo de serviço'),
  })
  .refine((data) => !(data.particular && data.enterprise), {
    message: 'Não pode ser particular e empresa ao mesmo tempo',
    path: ['enterprise'],
  })
  .refine((data) => !data.enterprise || data.enterprise_name, {
    message: 'Nome da empresa é obrigatório',
    path: ['enterprise_name'],
  });

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;
