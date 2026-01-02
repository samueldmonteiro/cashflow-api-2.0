import { app } from '@/app';

async function main() {
  await app.ready();
  console.log(app.printRoutes());
  process.exit(0);
}

main();
