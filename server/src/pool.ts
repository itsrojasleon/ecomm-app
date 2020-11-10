import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'instagram-clone',
  user: 'rojasleon',
  password: 'password'
});

export { pool };
