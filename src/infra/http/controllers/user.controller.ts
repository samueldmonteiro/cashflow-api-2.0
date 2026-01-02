import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserSchema } from '../schemas/register-user.schema';
import { makeRegisterUserUseCase } from '@/infra/factories/make-register-user-use-case.factory';

export class UserController {

  async register(_req: FastifyRequest, reply: FastifyReply) {

    const result = RegisterUserSchema.parse(_req.body);
    const registerUseCase = makeRegisterUserUseCase();
    const response = await registerUseCase.execute(result);
    return reply.code(201).send(response);
  }
}