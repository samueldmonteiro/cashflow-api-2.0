import { PrismaUserReposiory } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { Argon2PasswordHasher } from '@/infra/criptography/argon2-password-hasher';
import { JwtTokenGenerator } from '../criptography/jwt-token-generator';
import { app } from '@/app';

export const makeLoginUseCase = () => {
  return new LoginUseCase(
    new PrismaUserReposiory(),
    new Argon2PasswordHasher(),
    new JwtTokenGenerator(app.jwt)
  );
};