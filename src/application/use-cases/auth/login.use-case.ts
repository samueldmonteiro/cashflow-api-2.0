import { User } from '@/domain/entities/user.entity';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { PasswordHasher } from '@/application/cryptography/password-hasher';
import { TokenGenerator } from '@/application/cryptography/token-generator';

export interface LoginRequest {
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
    private passwordHasher: PasswordHasher,
    private tokenGenerator: TokenGenerator
  ) { }

  async execute(input: LoginRequest): Promise<LoginResponse> {
    const userExists = await this.userRepo.findByEmail(input.email);
    if (!userExists) throw new InvalidCredentialsError();

    const doesPasswordMatches = await this.passwordHasher.compare(
      userExists.getPassword(),
      input.password
    );

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    const token = await this.tokenGenerator.generate({sub: userExists.id});

    return {
      token,
      user: userExists
    };
  }
}