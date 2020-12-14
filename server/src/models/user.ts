import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCreate,
  HasOne
} from 'sequelize-typescript';
import { PasswordManager } from '../services/password-manager';
import { Cart } from './cart';
import { Product } from './product';
import { Review } from './review';

@Table({ underscored: true })
export class User extends Model<User> {
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  username!: string;

  @Column
  name!: string;

  @Column
  bio!: string;

  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => Review)
  reviews!: Review[];

  @HasOne(() => Cart)
  cart!: Cart;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const hashedPassword = await PasswordManager.toHash(instance.password);
    instance.password = hashedPassword;
  }
}
