import { UserRepository } from '@/domain/repositories/user.repository';
import { PasswordHasher } from '@/application/cryptography/password-hasher';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { LoginUseCase } from './login.use-case';
import { User } from '@/domain/entities/user.entity';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error';
import { TokenGenerator } from '@/application/cryptography/token-generator';

const userRepositoryMock: Mocked<UserRepository> = {
  findByEmail: vi.fn(),
  create: vi.fn(),
  findById: vi.fn()
};

const passwordHasherMock: Mocked<PasswordHasher> = {
  hash: vi.fn(),
  compare: vi.fn(),
};

const tokenGenerator: Mocked<TokenGenerator> = {
  generate: vi.fn(),
};

let useCase: LoginUseCase;
let genericUser: User;

beforeEach(() => {
  vi.clearAllMocks();

  useCase = new LoginUseCase(
    userRepositoryMock,
    passwordHasherMock,
    tokenGenerator
  );

  genericUser = new User({
    id: 'uuid-0101',
    createdAt: new Date(),
    email: 'test@email.com',
    name: 'test',
    password: '12345'
  });
});

describe('Login User UseCase (Unit)', async () => {
  it('should return a token and user on successful login', async () => {

    userRepositoryMock.findByEmail.mockResolvedValue(genericUser);
    passwordHasherMock.compare.mockResolvedValue(true);
    tokenGenerator.generate.mockResolvedValue('fake-token');

    const result = await useCase.execute({
      email: 'test@example.com',
      password: '123456'
    });

    expect(result.token).toBeDefined();
    expect(result.user).instanceOf(User);
  });

  it('should throw InvalidCredentialsError when email does not exist', async () => {

    userRepositoryMock.findByEmail.mockResolvedValue(null);
    passwordHasherMock.compare.mockResolvedValue(true);

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should throw an error when the password is incorrect', async () => {

    userRepositoryMock.findByEmail.mockResolvedValue(genericUser);
    passwordHasherMock.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});