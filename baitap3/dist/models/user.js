import { Model, DataTypes } from 'sequelize';
// 3. Định nghĩa class User
export class User extends Model {
    id;
    email;
    password;
    firstName;
    lastName;
    address;
    phoneNumber;
    gender;
    image;
    roleId;
    positionId;
    createdAt;
    updatedAt;
    static associate(models) {
        // định nghĩa mối quan hệ nếu cần
    }
}
// 4. Export factory function để index.ts import
export default (sequelize) => {
    User.init({
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
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
    });
    return User;
};
