import { PrismaUserReposiory } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { Argon2PasswordHasher } from '@/infra/criptography/argon2-password-hasher';
import { RegisterUserUseCase } from '../../application/use-cases/user/register-user.use-case';
import { JwtTokenGenerator } from '../criptography/jwt-token-generator';
import { app } from '@/app';

export const makeRegisterUserUseCase = () => {
  return new RegisterUserUseCase(
    new PrismaUserReposiory(),
    new Argon2PasswordHasher(),
    new JwtTokenGenerator(app.jwt)
  );
};