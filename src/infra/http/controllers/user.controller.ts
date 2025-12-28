import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {

  async getUsers(_request: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany();
    return reply.code(200).send(users);
  }
}