import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthLoginSchema } from '../schemas/auth-login.schema';
import { makeLoginUseCase } from '@/infra/factories/make-login-use-case.factory';
import { makeGetUserAuthenticatedUseCase } from '@/infra/factories/make-get-user-authenticated-use-case.factory';

export class AuthController {

  async login(_req: FastifyRequest, reply: FastifyReply) {

    const data = AuthLoginSchema.parse(_req.body);
    const loginUseCase = makeLoginUseCase();
    const response = await loginUseCase.execute(data);
    return reply.send(response);
  }

  async me(_req: FastifyRequest, reply: FastifyReply) {

    const userId = _req.currentUser.id;
    const loginUseCase = makeGetUserAuthenticatedUseCase();
    const response = await loginUseCase.execute(userId);
    return reply.send(response);
  }
}