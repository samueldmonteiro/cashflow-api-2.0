import { z } from 'zod';

export const AuthLoginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string('Senha inválida'),
});
