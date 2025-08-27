// Migration để thêm field phone mặc định
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    await User.updateMany({}, { $set: { phone: null } });
    console.log("✅ Migration completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
};

migrate();
