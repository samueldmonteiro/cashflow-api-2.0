export interface TokenGenerator {
  generate(payload: { sub: string }): Promise<string>;
}
