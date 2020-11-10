import { pool } from '../pool';
import { toCamelCase } from './utils/to-camel-case';
import { PasswordManager } from '../services/password-manager';

class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');

    return toCamelCase(rows);
  }

  static async findById(id: string) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [
      id
    ]);

    return toCamelCase(rows)[0];
  }

  static async findByEmail(email: string) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [
      email
    ]);

    return toCamelCase(rows)[0];
  }

  static async insertAtSignup(
    email: string,
    password: string,
    username: string
  ) {
    // Hash password before saving
    const passwordHashed = await PasswordManager.toHash(password);

    const {
      rows
    } = await pool.query(
      'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;',
      [email, passwordHashed, username]
    );

    return toCamelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM users;');

    return parseInt(rows[0].count);
  }
}

export { UserRepo };
