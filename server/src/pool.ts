import pg from 'pg';

class Pool {
  private _pool: any;

  connect(options: any) {
    this._pool = new pg.Pool(options);
    return this._pool.query('SELECT 1 + 1;');
  }

  close() {
    return this._pool.end();
  }

  query(sql: string, params: any) {
    return this._pool.query(sql, params);
  }
}

const pool = new Pool();

export { pool };
