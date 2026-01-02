import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthLoginSchema } from '../schemas/auth-login.schema';
import { makeLoginUseCase } from '@/infra/factories/make-login-use-case.factory';

export class AuthController {

  async login(_req: FastifyRequest, reply: FastifyReply){

    const data = AuthLoginSchema.parse(_req.body);
    const loginUseCase = makeLoginUseCase();
    const response = await loginUseCase.execute(data);
    return reply.send(response);
  }
}