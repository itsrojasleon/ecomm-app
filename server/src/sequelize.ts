import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://rojasleon:password@localhost:5432/instagram-clone'
);

export { sequelize };
