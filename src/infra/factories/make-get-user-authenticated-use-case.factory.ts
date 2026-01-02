import { PrismaUserReposiory } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { GetUserAuthenticatedUseCase } from '@/application/use-cases/auth/get-user-authenticated.use-case';

export const makeGetUserAuthenticatedUseCase = () => {
  return new GetUserAuthenticatedUseCase(
    new PrismaUserReposiory()
  );
};