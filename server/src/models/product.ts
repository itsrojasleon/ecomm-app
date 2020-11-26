import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../sequelize';

interface ProductAttrs {
  id: number;
  userId: number;
  name: string;
  price: number;
  description: string;
}

interface ProductCreationAttrs extends Optional<ProductAttrs, 'id'> {}

class Product
  extends Model<ProductAttrs, ProductCreationAttrs>
  implements ProductAttrs {
  id!: number;
  userId!: number;
  name!: string;
  price!: number;
  description!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(148),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'products',
    underscored: true
  }
);

(async () => await Product.sync())();

export { Product };
