import { AppError } from './app.error';

export class ResourceNotFoundError extends AppError {

  constructor(message = 'recurso não encontrado', statusCode = 404, meta?: any) {
    super(message, statusCode, meta);
  }
}