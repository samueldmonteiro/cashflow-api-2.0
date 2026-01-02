import { TokenGenerator } from '@/application/cryptography/token-generator';

type JwtSigner = {
  sign(payload: object): string;
};

export class JwtTokenGenerator implements TokenGenerator {
  constructor(private jwt: JwtSigner) {}

  async generate(payload: { sub: string }): Promise<string> {
    return this.jwt.sign(payload);
  }
}
