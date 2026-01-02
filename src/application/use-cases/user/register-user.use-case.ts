import { User } from '@/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { UserRepository } from '@/domain/repositories/user.repository';
import { AppError } from '@/domain/errors/app.error';
import { PasswordHasher } from '@/application/cryptography/password-hasher';
import { TokenGenerator } from '@/application/cryptography/token-generator';

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  user: User,
  auth: {
    token: string
  }
}

export class RegisterUserUseCase {

  constructor(
    private userRepo: UserRepository,
    private passwordHasher: PasswordHasher,
    private tokenGenerator: TokenGenerator
  ) { }

  async execute(input: RegisterUserRequest): Promise<RegisterUserResponse> {

    if (await this.userRepo.findByEmail(input.email)) {
      throw new AppError(`O e-mail: ${input.email} já está cadastrado!`, 409);
    }

    const hash = await this.passwordHasher.hash(input.password);
    const user = new User({
      id: randomUUID(),
      ...input,
      password: hash,
      createdAt: new Date()
    });

    const newUser = await this.userRepo.create(user);
    const token = await this.tokenGenerator.generate({sub: newUser.id});

    return {
      user: newUser,
      auth: {
        token: token
      }
    };
  }
}