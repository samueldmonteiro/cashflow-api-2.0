import { TokenGenerator } from '@/application/cryptography/token-generator';
import { env } from '@/env';

type JwtSigner = {
  sign(payload: object, options?: { expiresIn?: string | number }): string;
};

export class JwtTokenGenerator implements TokenGenerator {
  constructor(private jwt: JwtSigner) {}

  async generate(payload: { sub: string }): Promise<string> {
    return this.jwt.sign(payload, {
      expiresIn: env.JWT_TTL
    });
  }
}
