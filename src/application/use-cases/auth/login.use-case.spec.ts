import { UserRepository } from '@/domain/repositories/user.repository';
import { PasswordHasherService } from '@/domain/services/password-hasher.service';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { LoginUseCase } from './login.use-case';
import { User } from '@/domain/entities/user.entity';
import { AppError } from '@/domain/errors/app.error';

const userRepositoryMock: Mocked<UserRepository> = {
  findByEmail: vi.fn(),
  create: vi.fn(),
};

const passwordHasherMock: Mocked<PasswordHasherService> = {
  hash: vi.fn(),
  compare: vi.fn(),
};


let useCase: LoginUseCase;
beforeEach(() => {
  vi.clearAllMocks();

  useCase = new LoginUseCase(
    userRepositoryMock,
    passwordHasherMock
  );
});


describe('Login User UseCase (Unit)', async () => {
  it('should login successfully', async () => {
    const user: User = new User({
      id: '0101',
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '123456'
    });
    
    userRepositoryMock.findByEmail.mockResolvedValue(user);
    passwordHasherMock.compare.mockResolvedValue(true);

    const result = await useCase.execute({
      email: 'test@example.com',
      password: '123456'
    });

    expect(result.token).toBeDefined();
    expect(result.user).instanceOf(User);
  });

  it('should email not exists result', async () => {
    
    userRepositoryMock.findByEmail.mockResolvedValue(null);
    passwordHasherMock.compare.mockResolvedValue(true);

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should password incorrect', async () => {
    
    const user: User = new User({
      id: '0101',
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '123456'
    });
    
    userRepositoryMock.findByEmail.mockResolvedValue(user);
    passwordHasherMock.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});