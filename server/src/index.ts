import { app } from './app';
import { sequelize } from './sequelize';

const main = async () => {
  try {
    await sequelize.sync();

    console.log('Connected to Postgres');
  } catch (err) {
    console.error(err);
  }
  app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000');
  });
};

main();
