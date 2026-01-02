import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();

    const user = await prisma.user.findUnique({
      where: { id: request.user.sub },
    });

    if (!user) {
      return reply.status(401).send({ message: 'Usuário não encontrado' });
    }

    request.currentUser = {
      id: user.id,
      email: user.email,
    };
  } catch {
    return reply.status(401).send({ message: 'Não autorizado' });
  }
}
