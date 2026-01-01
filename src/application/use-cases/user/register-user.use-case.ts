import { User } from '@/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { UserRepository } from '@/domain/repositories/user.repository';
import { AppError } from '@/domain/errors/app.error';
import { PasswordHasherService } from '@/domain/services/password-hasher.service';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {

  constructor(
    private userRepo: UserRepository,
    private passwordHasher: PasswordHasherService
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {

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

    return await this.userRepo.create(user);
  }
}