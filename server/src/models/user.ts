import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCreate
} from 'sequelize-typescript';
import { PasswordManager } from '../services/password-manager';
import { Product } from './product';

@Table({ underscored: true })
export class User extends Model<User> {
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  username!: string;

  @HasMany(() => Product)
  products!: Product[];

  @BeforeCreate
  static async hashPassword(instance: User) {
    const hashedPassword = await PasswordManager.toHash(instance.password);
    instance.password = hashedPassword;
  }
}
