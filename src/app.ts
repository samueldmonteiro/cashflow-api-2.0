import 'reflect-metadata';
import Fastify from 'fastify';
import { userRoutes } from './routes/user.route';
import z, { ZodError } from 'zod';
import { AppError } from './domain/errors/app.error';
import { env } from './env';
import { authRoutes } from './routes/auth.route';
import fastifyJwt from '@fastify/jwt';

const app = Fastify({
  logger: true,
});

app.register(userRoutes);
app.register(authRoutes);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.setErrorHandler((err, request, reply) => {
  if (err instanceof ZodError) {
    reply.code(400).send({ message: 'Validation error', issues: z.treeifyError(err) });
  }

  if (err instanceof AppError) {
    reply.code(err.statusCode).send({ message: err.message, meta: err?.meta, code: err.statusCode });
  }

  if (err instanceof Error) {
    reply.code(500).send({ message: err.message, name: err.name, code: 500, stack: env.NODE_ENV == 'dev' ? err.stack : undefined });
  }

  reply.code(500).send({ message: 'Internal server error.', code: 500 });
});


export { app };
