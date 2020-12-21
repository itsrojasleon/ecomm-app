import { config } from 'dotenv';
config({ path: __dirname + '/.env' });
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import { Product } from './models/product';
import { Wishlist } from './models/wishlist';
import { Cart } from './models/cart';
import { Review } from './models/review';
import { Order } from './models/order';
import { OrderDetails } from './models/order-details';

export const sequelize = new Sequelize({
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  dialect: 'postgres',
  storage: ':memory:',
  models: [User, Product, Wishlist, Cart, Review, Order, OrderDetails]
});
