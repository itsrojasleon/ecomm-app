/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      email VARCHAR(60) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL,
      bio VARCHAR(400),
      avatar VARCHAR(200),
      status VARCHAR(15),
      username VARCHAR(30) UNIQUE NOT NULL
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
