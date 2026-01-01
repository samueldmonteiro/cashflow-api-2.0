import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';
import { User } from '@/domain/entities/user.entity';
import { AppError } from '@/domain/errors/app.error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { PasswordHasherService } from '@/domain/services/password-hasher.service';
import { RegisterUserUseCase } from './register-user.use-case';

const userRepositoryMock: Mocked<UserRepository> = {
  findByEmail: vi.fn(),
  create: vi.fn(),
};

const passwordHasherMock: Mocked<PasswordHasherService> = {
  hash: vi.fn(),
  compare: vi.fn(),
};


let useCase: RegisterUserUseCase;
beforeEach(() => {
  vi.clearAllMocks();

  useCase = new RegisterUserUseCase(
    userRepositoryMock,
    passwordHasherMock
  );
});


describe('Register User UseCase (Unit)', () => {

  it('should register a user successfully', async () => {

    // Arrange
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    passwordHasherMock.hash.mockResolvedValue('hashed-password');

    userRepositoryMock.create.mockImplementation(
      async (user: User) => user
    );

    const dto = {
      name: 'Davi',
      email: 'davi@email.com',
      password: '123456',
    };

    // Act
    const user = await useCase.execute(dto);

    // Assert
    expect(user.id).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(dto.email);
    expect(user.getPassword()).toBe('hashed-password');
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should hash the password before creating the user', async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    passwordHasherMock.hash.mockResolvedValue('hashed-password');

    const user = await useCase.execute({
      name: 'Davi',
      email: 'davi@email.com',
      password: '123456',
    });

    expect(passwordHasherMock.hash).toHaveBeenCalledWith('123456');
    expect(passwordHasherMock.hash).toHaveBeenCalledTimes(1);
    expect(user.getPassword()).toBe('hashed-password');
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
