import { app } from './app';
import { sequelize } from './sequelize';

const main = async () => {
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
