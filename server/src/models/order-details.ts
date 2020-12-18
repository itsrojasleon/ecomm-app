import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Min
} from 'sequelize-typescript';
import { Order } from './order';
import { Product } from './product';

@Table({ underscored: true })
export class OrderDetails extends Model<OrderDetails> {
  @Min(1)
  @Column
  quantity!: number;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => Product)
  product!: Product;
}
