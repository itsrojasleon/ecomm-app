import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Min,
  AllowNull
} from 'sequelize-typescript';
import { Order } from './order';
import { Product } from './product';

@Table({ underscored: true })
export class OrderDetails extends Model<OrderDetails> {
  @AllowNull(false)
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
