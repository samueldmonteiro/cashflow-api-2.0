import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthLoginSchema } from '../schemas/auth-login.schema';
import { LoginUseCase } from '@/application/use-cases/auth/login.use-case';
import { PrismaUserReposiory } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { Argon2PasswordHasher } from '@/infra/services/argon2-password-hasher.service';

export class AuthController {

  async login(_req: FastifyRequest, reply: FastifyReply){

    const data = AuthLoginSchema.parse(_req.body);

    const useCase = new LoginUseCase(
      new PrismaUserReposiory(),
      new Argon2PasswordHasher()
    );

    const response = await useCase.execute(data);

    return reply.send(response);
  }
}