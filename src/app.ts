import Fastify from 'fastify';

const app = Fastify({
  logger: true
});

//fastify.register(firstRoute)

export { app };
