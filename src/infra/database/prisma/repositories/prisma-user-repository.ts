import { User } from '@/domain/entities/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';
import { prisma } from '@/lib/prisma';

export class PrismaUserReposiory implements UserRepository {

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (!user) return null;

    return new User(user);
  }

  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        password: user.getPassword(),
        name: user.name,
      }
    });
    return new User(created);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;
    return new User(user);
  }
}