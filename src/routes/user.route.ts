import { UserController } from '@/infra/http/controllers/user.controller';
import { FastifyInstance } from 'fastify';

const userController = new UserController();

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/api/users', userController.getUsers);
};