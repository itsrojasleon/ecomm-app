import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Unique
} from 'sequelize-typescript';
import { User } from './user';
import { Product } from './product';

// I think it make sense if we call the table name as cart
// instead of carts
@Table({ underscored: true, tableName: 'cart' })
export class Cart extends Model<Cart> {
  @Column
  quantity!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Product)
  @Unique
  @Column
  productId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product)
  product!: Product;
}
