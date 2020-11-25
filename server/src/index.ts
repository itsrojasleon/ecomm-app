import { app } from './app';
import { sequelize } from './sequelize';

const main = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new Error('JWT_KEY must be defined');
  // }
  // if (!process.env.PG_DATABASE) {
  //   throw new Error('PG_DATABASE must be defined');
  // }
  // if (!process.env.PG_USER) {
  //   throw new Error('PG_USER must be defined');
  // }
  // if (!process.env.PG_PASSWORD) {
  //   throw new Error('PG_PASSWORD must be defined');
  // }
  // if (!process.env.PG_HOST) {
  //   throw new Error('PG_HOST must be defined');
  // }

  try {
    await sequelize.authenticate();
    console.log('Connected to Postgres');
  } catch (err) {
    console.error(err);
  }
  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

main();
