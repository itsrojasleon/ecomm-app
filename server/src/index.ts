import { app } from './app';
import { pool } from './pool';

const main = async () => {
  try {
    await pool.connect();
    console.log('Connected to Postgres');
  } catch (err) {
    console.error(err);
  }
  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

main();
