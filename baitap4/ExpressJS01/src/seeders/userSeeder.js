require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    // Xóa toàn bộ dữ liệu cũ (tùy chọn)
    await User.deleteMany();

    // Tạo dữ liệu mẫu
    const users = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "admin",
      },
      {
        name: "Test User",
        email: "user@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "user",
      }
    ];

    await User.insertMany(users);
    console.log("✅ User seeding completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
