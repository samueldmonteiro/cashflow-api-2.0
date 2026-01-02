import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: {
      id: string;
      email: string;
    };
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string;
    };
    user: {
      sub: string;
    };
  }
}

export {};
