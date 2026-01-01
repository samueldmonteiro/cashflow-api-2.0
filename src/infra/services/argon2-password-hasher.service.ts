import { PasswordHasherService } from '@/domain/services/password-hasher.service';
import argon2 from 'argon2';

export class Argon2PasswordHasher implements PasswordHasherService {
  async hash(plain: string): Promise<string> {
    return await argon2.hash(plain);
  }

  async compare(hash: string, plain: string): Promise<boolean> {
    return await argon2.verify(hash, plain);
  }
}
