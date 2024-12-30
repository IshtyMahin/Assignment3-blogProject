import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import createDefaultAdmin from './app/defaultAdmin';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database');

    await createDefaultAdmin();

    server = app.listen(config.port, () => {
      console.log(
        `App is listening on port ${process.env.PORT || config.port}`,
      );
    });
  } catch (err) {
    console.log('Error during application startup:', err);
  }
}


main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 Unhandled Rejection detected: ${err}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});


process.on('uncaughtException', (err) => {
  console.log(`😈 Uncaught Exception detected: ${err}`);
  console.error(err);
  process.exit(1);
});
