import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
import { User } from './user';
import { Wishlist } from './wishlist';

@Table({ underscored: true, version: true })
export class Product extends Model<Product> {
  @Column
  name!: string;

  @Column
  price!: number;

  @Column
  description!: string;

  @HasOne(() => Wishlist)
  wishlist!: Wishlist;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
