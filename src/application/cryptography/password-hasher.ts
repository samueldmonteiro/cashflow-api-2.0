export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  compare(hash: string, plain: string): Promise<boolean>;
}
