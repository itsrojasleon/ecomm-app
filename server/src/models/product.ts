import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany
} from 'sequelize-typescript';
import { Review } from './review';
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

  @Column
  imageUrl!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasOne(() => Wishlist)
  wishlist!: Wishlist;

  @HasMany(() => Review)
  reviews!: Review[];
}
