import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import { Product } from './models/product';
import { Wishlist } from './models/wishlist';

export const sequelize = new Sequelize({
  database: 'instagram-clone',
  dialect: 'postgres',
  username: 'rojasleon',
  password: 'password',
  storage: ':memory:',
  models: [User, Product, Wishlist]
});
