import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './user';
import { Order } from './order';

@Table({ underscored: true })
export class Payment extends Model<Payment> {
  @Column
  stripeId!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Order)
  orderId!: string;

  @BelongsTo(() => User)
  user!: User;
}
