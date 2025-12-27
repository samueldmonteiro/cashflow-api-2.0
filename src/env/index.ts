import 'dotenv/config';
import {z} from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod','test']),
  PORT: z.coerce.number().default(3000)
});

const _env = envSchema.safeParse(process.env);

if(_env.success == false){
  console.error('Invalid environment variables', _env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;