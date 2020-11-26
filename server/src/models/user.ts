import {
  Model,
  DataTypes,
  Optional,
  HasManyGetAssociationsMixin
} from 'sequelize';
import { sequelize } from '../sequelize';
import { PasswordManager } from '../services/password-manager';
import { Product } from './product';

// These are all the attributes in the User model
interface UserAttrs {
  id: number;
  email: string;
  username: string;
  password: string;
  biography?: string | null;
  avatar?: string | null;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttrs, 'id'> {}

class User
  extends Model<UserAttrs, UserCreationAttributes>
  implements UserAttrs {
  id!: number; // Note that the `null assertion` `!` is required in strict mode.
  email!: string;
  username!: string;
  password!: string;
  biography!: string | null;
  avatar!: string | null;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  getProducts!: HasManyGetAssociationsMixin<Product>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },
    username: {
      type: new DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(300),
      allowNull: false
    },
    biography: {
      type: new DataTypes.STRING(400),
      allowNull: true
    },
    avatar: {
      type: new DataTypes.STRING(400),
      allowNull: true
    }
  },
  {
    tableName: 'users',
    sequelize,
    underscored: true
  }
);

User.beforeCreate(async (user, options) => {
  const passwordHashed = await PasswordManager.toHash(user.password);
  user.password = passwordHashed;
});

User.hasMany(Product, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'products'
});

(async () => await User.sync())();

export { User };
