import { User } from '@/domain/entities/user.entity';
import { AppError } from '@/domain/errors/app.error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { PasswordHasherService } from '@/domain/services/password-hasher.service';

export interface LoginInput {
  email: string,
  password: string
}

export interface LoginResponse {
  token: string,
  user: User
}

export class LoginUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordHasher: PasswordHasherService
  ) { }

  async execute(input: LoginInput): Promise<LoginResponse> {
    const userExists = await this.userRepo.findByEmail(input.email);
    if (!userExists) throw new AppError('Login Incorreto', 401);

    const isValidPassword = await this.passwordHasher.compare(
      userExists.getPassword(),
      input.password
    );

    if (!isValidPassword) throw new AppError('Login Incorreto', 401);

    const token = 'jwt-token';

    return {
      token,
      user: userExists
    };
  }
}