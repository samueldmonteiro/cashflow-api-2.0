import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserSchema } from '../schemas/register-user.schema';
import { PrismaUserReposiory } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { Argon2PasswordHasher } from '@/infra/services/argon2-password-hasher.service';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user.use-case';

export class UserController {

  async getUsers(_req: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany();
    return reply.code(200).send(users);
  }

  async register(_req: FastifyRequest, reply: FastifyReply) {

    const result = RegisterUserSchema.parse(_req.body);

    const registerUseCase = new RegisterUserUseCase(
      new PrismaUserReposiory(),
      new Argon2PasswordHasher()
    );
    const response = await registerUseCase.execute(result);
    return reply.code(201).send(response);
  }
}