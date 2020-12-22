import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import { Product } from './models/product';
import { Wishlist } from './models/wishlist';
import { Cart } from './models/cart';
import { Review } from './models/review';
import { Order } from './models/order';
import { OrderDetails } from './models/order-details';
import { Payment } from './models/payment';

import { config } from './config';

export const sequelize = new Sequelize({
  database: config.PG_DATABASE,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  host: config.PG_HOST,
  dialect: 'postgres',
  storage: ':memory:',
  models: [User, Product, Wishlist, Cart, Review, Order, OrderDetails, Payment]
});
