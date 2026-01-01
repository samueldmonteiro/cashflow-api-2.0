export class AppError extends Error {
  public statusCode: number;
  public meta?: any;

  constructor(message: string, statusCode = 400, meta?: any) {
    super(message);
    this.statusCode = statusCode;
    this.meta = meta;
  }
}