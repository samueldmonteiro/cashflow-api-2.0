import { UserRepository } from '@/domain/repositories/user.repository';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { User } from '@/domain/entities/user.entity';
import { GetUserAuthenticatedUseCase } from './get-user-authenticated.use-case';
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found.error';

const userRepositoryMock: Mocked<UserRepository> = {
  findByEmail: vi.fn(),
  create: vi.fn(),
  findById: vi.fn()
};

let useCase: GetUserAuthenticatedUseCase;
let genericUser: User;

beforeEach(() => {
  vi.clearAllMocks();

  useCase = new GetUserAuthenticatedUseCase(
    userRepositoryMock
  );

  genericUser = new User({
    id: 'uuid-fake',
    createdAt: new Date(),
    email: 'test@email.com',
    name: 'test',
    password: '12345'
  });
});

describe('Get User Authenticated UseCase (Unit)', async () => {
  it('should return user authenticated on successful', async () => {

    userRepositoryMock.findById.mockResolvedValue(genericUser);

    const result = await useCase.execute('uuid-fake');
    expect(result.user).instanceOf(User);
  });

  it('should return the error or if the user does not exist', async () => {

    userRepositoryMock.findById.mockResolvedValue(null);

    await expect(
      useCase.execute('uuid-fake')
    ).rejects.instanceOf(ResourceNotFoundError);
  });

});