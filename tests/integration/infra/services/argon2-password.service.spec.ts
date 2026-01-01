import { describe, expect, it, beforeEach } from 'vitest';
import { Argon2PasswordHasher } from '@/infra/services/argon2-password-hasher.service';

let hasher: Argon2PasswordHasher;

beforeEach(() => {
  hasher = new Argon2PasswordHasher();
});

describe('Argon2PasswordHasher (Unit)', () => {
  it('should hash a plain password', async () => {
    const plainPassword = '12345';

    const hash = await hasher.hash(plainPassword);

    expect(hash).toBeDefined();
  });

  it('should validate a correct password', async () => {
    const plainPassword = '12345';

    const hash = await hasher.hash(plainPassword);
    const isValid = await hasher.compare(hash, plainPassword);

    expect(isValid).toBe(true);
  });

  it('should invalidate a wrong password', async () => {
    const plainPassword = '12345';
    const wrongPassword = '54321';

    const hash = await hasher.hash(plainPassword);
    const isValid = await hasher.compare(hash, wrongPassword);

    expect(isValid).toBe(false);
  });
});
