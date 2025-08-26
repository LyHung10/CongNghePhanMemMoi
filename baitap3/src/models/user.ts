import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// 1. Định nghĩa interface cho User attributes
interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: boolean;
  image?: string;
  roleId: string;
  positionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Cho phép một số field optional khi create
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'image' | 'positionId'> {}

// 3. Định nghĩa class User
export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address!: string;
  public phoneNumber!: string;
  public gender!: boolean;
  public image?: string;
  public roleId!: string;
  public positionId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // định nghĩa mối quan hệ nếu cần
  }
}

// 4. Export factory function để index.ts import
export default (sequelize: Sequelize) => {
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );
  return User;
};
