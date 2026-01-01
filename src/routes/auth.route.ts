import { AuthController } from '@/infra/http/controllers/auth.controller';
import { FastifyInstance } from 'fastify';


export const authRoutes = async (app: FastifyInstance) => {
  const authController = new AuthController();

  app.post('/api/login', authController.login);
};