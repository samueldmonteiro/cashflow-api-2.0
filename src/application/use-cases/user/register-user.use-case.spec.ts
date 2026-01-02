import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';
import { User } from '@/domain/entities/user.entity';
import { AppError } from '@/domain/errors/app.error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { PasswordHasher } from '@/application/cryptography/password-hasher';
import { RegisterUserUseCase } from './register-user.use-case';
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

let useCase: RegisterUserUseCase;
beforeEach(() => {
  vi.clearAllMocks();

  useCase = new RegisterUserUseCase(
    userRepositoryMock,
    passwordHasherMock,
    tokenGenerator
  );
});

describe('Register User UseCase (Unit)', () => {

  it('should register a user successfully', async () => {

    // Arrange
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    passwordHasherMock.hash.mockResolvedValue('hashed-password');
    tokenGenerator.generate.mockResolvedValue('fake-token');

    userRepositoryMock.create.mockImplementation(
      async (user: User) => user
    );

    const dto = {
      name: 'Davi',
      email: 'davi@email.com',
      password: '123456',
    };

    // Act
    const response = await useCase.execute(dto);

    // Assert
    expect(response.user).toBeInstanceOf(User);
    expect(response.auth.token).toBeDefined();
    expect(response.user.email).toBe(dto.email);
    expect(response.user.getPassword()).toBe('hashed-password');
    expect(response.user.createdAt).toBeInstanceOf(Date);
  });

  it('should hash the password before creating the user', async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    passwordHasherMock.hash.mockResolvedValue('hashed-password');

    const response = await useCase.execute({
      name: 'Davi',
      email: 'davi@email.com',
      password: '123456',
    });

    expect(passwordHasherMock.hash).toHaveBeenCalledWith('123456');
    expect(passwordHasherMock.hash).toHaveBeenCalledTimes(1);
    expect(response.user.getPassword()).toBe('hashed-password');
  });

  it('should throw an error if the email is already registered', async () => {
    // Arrange
    userRepositoryMock.findByEmail.mockResolvedValue({} as User);

    const dto = {
      name: 'Davi',
      email: 'davi@email.com',
      password: '123456',
    };

    // Act & Assert
    await expect(
      useCase.execute(dto)
    ).rejects.toBeInstanceOf(AppError);
  });

});
