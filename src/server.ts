import { env } from '@/env';
import { app } from './app';


app.listen({ port: env.PORT }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});