import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
const salt = bcrypt.genSaltSync(10);
// Hàm hash password
const hashUserPassword = async (password) => {
    return bcrypt.hash(password, salt);
};
// Tạo user mới
export const createNewUser = async (data) => {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId,
    });
    return 'OK create a new user successful';
};
// Lấy tất cả user
export const getAllUser = async () => {
    return await User.findAll({ raw: true });
};
// Lấy user theo id
export const getUserInfoById = async (userId) => {
    return await User.findOne({ where: { id: userId }, raw: true });
};
// Update user
export const updateUser = async (data) => {
    const user = await User.findOne({ where: { id: Number(data.id) } });
    if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        console.log(user);
        return await User.findAll({ raw: true }); // trả mảng để render danh sách
    }
    return [];
};
// Xóa user
export const deleteUserById = async (userId) => {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
        await user.destroy();
    }
};
export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById
};
