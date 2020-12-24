import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Default,
  HasMany
} from 'sequelize-typescript';
import { OrderDetails } from './order-details';
import { User } from './user';

export enum OrderStatus {
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
  Completed = 'completed'
}

@Table({ underscored: true })
export class Order extends Model<Order> {
  @Default(OrderStatus.Created)
  @Column
  status!: string;

  @Column
  total!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => OrderDetails)
  orders!: OrderDetails[];
}
