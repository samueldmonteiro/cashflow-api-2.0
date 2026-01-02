import { AuthController } from '@/infra/http/controllers/auth.controller';
import { authMiddleware } from '@/infra/http/middlewares/auth.middleware';
import { FastifyInstance } from 'fastify';


export const authRoutes = async (app: FastifyInstance) => {
  const authController = new AuthController();

  app.post('/api/login', authController.login);
  app.get('/api/me', {
    preHandler: authMiddleware
  }, authController.me);

};