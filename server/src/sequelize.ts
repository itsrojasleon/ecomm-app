import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('instagram-clone', 'rojasleon', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

export { sequelize };
