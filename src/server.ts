import { app } from './app';
import { env } from '@/env';

app.listen({ port: env.PORT }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});