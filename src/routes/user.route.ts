import { UserController } from '@/infra/http/controllers/user.controller';
import { FastifyInstance } from 'fastify';


export const userRoutes = async (app: FastifyInstance) => {
  const userController = new UserController();

  app.get('/api/users', userController.getUsers);

  app.post('/api/users', userController.register);
};