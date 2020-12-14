import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Min,
  Max
} from 'sequelize-typescript';
import { User } from './user';
import { Product } from './product';

@Table({ underscored: true })
export class Review extends Model<Review> {
  @Column
  title!: string;

  @Column
  comment!: string;

  // stars
  @Min(0)
  @Max(5)
  @Column
  score!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product)
  product!: Product;
}
