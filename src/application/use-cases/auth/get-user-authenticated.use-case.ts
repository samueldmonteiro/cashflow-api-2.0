import { User } from '@/domain/entities/user.entity';
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found.error';
import { UserRepository } from '@/domain/repositories/user.repository';

export interface GetUserAuthenticatedResponse {
  user: User
}

export class GetUserAuthenticatedUseCase {

  constructor(
    private userRepo: UserRepository
  ) { }

  async execute(userId: string): Promise<GetUserAuthenticatedResponse> {

    const user = await this.userRepo.findById(userId);
    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}