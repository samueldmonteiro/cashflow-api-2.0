export interface PasswordHasherService {
  hash(plain: string): Promise<string>;
  compare(hash: string, plain: string): Promise<boolean>;
}
