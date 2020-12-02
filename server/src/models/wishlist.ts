import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Unique
} from 'sequelize-typescript';
import { Product } from './product';
import { User } from './user';

@Table({ underscored: true })
export class Wishlist extends Model<Wishlist> {
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
