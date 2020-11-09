import { app } from './app';
import { Pool } from 'pg';

const main = async () => {
  try {
    const pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'instagram-clone',
      user: 'rojasleon',
      password: 'password'
    });
    const client = await pool.connect();
    const { rows } = await client.query('SELECT 1 + 1;');
    console.log(rows[0]['?column?']);
  } catch (err) {
    console.error(err);
  }
  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

main();
