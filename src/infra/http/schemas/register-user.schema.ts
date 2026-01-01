import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string('Nome inválido').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string('Senha inválida').min(5, 'Senha deve ter no mínimo 5 caracteres'),
});
