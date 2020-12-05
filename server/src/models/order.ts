import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './user';

enum OrderStatus {
  // When the order has been created but the product it is
  // trying to order has not been reserved.
  Created = 'created',

  // The product the order is trying to reserve has already been reserved
  // or when user has cancelled the order.
  // The order expires before payment
  Cancelled = 'cancelled',

  // The order has successfully reserved the product
  AwaitingPayment = 'awaiting:payment',

  // The order has reserved the product and the user has provided payment
  // successfully
  Complete = 'complete'
}

@Table({ underscored: true })
export class Product extends Model<Product> {
  @Column
  status!: OrderStatus;

  @Column
  expiresAt!: number;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => User)
  @Column
  productId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product)
  product!: Product;
}
