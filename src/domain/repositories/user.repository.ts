import { User } from '../entities/user.entity';

export interface FindUserOptions {
  includePosts?: boolean;
  includeRoles?: boolean;
  includeComments?: boolean;
}

export interface UserRepository {

  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}