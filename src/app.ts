import Fastify from 'fastify';
import { userRoutes } from './routes/user.route';

const app = Fastify({
  logger: true,
});

//fastify.register(firstRoute)
app.register(userRoutes);

export { app };
