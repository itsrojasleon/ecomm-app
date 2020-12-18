import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import { Product } from './models/product';
import { Wishlist } from './models/wishlist';
import { Cart } from './models/cart';
import { Review } from './models/review';
import { Order } from './models/order';
import { OrderDetails } from './models/order-details';

export const sequelize = new Sequelize({
  database: 'instagram-clone',
  dialect: 'postgres',
  username: 'rojasleon',
  password: 'password',
  storage: ':memory:',
  models: [User, Product, Wishlist, Cart, Review, Order, OrderDetails]
});
