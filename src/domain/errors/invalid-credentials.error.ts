import { AppError } from './app.error';

export class InvalidCredentialsError extends AppError {

  constructor(message = 'Credenciais inválidas', statusCode = 401, meta?: any) {
    super(message, statusCode, meta);
  }
}