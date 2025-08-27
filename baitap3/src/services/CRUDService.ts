import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

const salt = bcrypt.genSaltSync(10);

// Hàm hash password
const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
};

// Tạo user mới
export const createNewUser = async (data: any): Promise<string> => {
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
export const getAllUser = async (): Promise<User[]> => {
  return await User.findAll({ raw: true });
};

// Lấy user theo id
export const getUserInfoById = async (userId: number): Promise<User | null> => {
  return await User.findOne({ where: { id: userId }, raw: true });
};

// Update user
export const updateUser = async (data: any): Promise<User[] | []> => {
  const user = await User.findOne({ where: { id: Number(data.id) } });
  if (user) {
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.address = data.address;
    await user.save();
    return await User.findAll({ raw: true }); // trả mảng để render danh sách
  }
  return [];
};

// Xóa user
export const deleteUserById = async (userId: number): Promise<void> => {
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
