import {
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional
} from 'sequelize';
import { sequelize } from '../sequelize';
import { PasswordManager } from '../services/password-manager';

// These are all the attributes in the User model
interface UserAttrs {
  id: number;
  email: string;
  username: string;
  password: string;
  biography?: string | null;
  avatar?: string | null;
  status?: string | null;
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
  status!: string | null;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  // public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  // public addProject!: HasManyAddAssociationMixin<Project, number>;
  // public hasProject!: HasManyHasAssociationMixin<Project, number>;
  // public countProjects!: HasManyCountAssociationsMixin;
  // public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  // public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  // public static associations: {
  //   projects: Association<User, Project>;
  // };
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
    },
    status: {
      type: new DataTypes.STRING(400),
      allowNull: true
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

User.beforeCreate(async (user, options) => {
  const passwordHashed = await PasswordManager.toHash(user.password);
  user.password = passwordHashed;
});

(async () => await User.sync())();

export { User };
