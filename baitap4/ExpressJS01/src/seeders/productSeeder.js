require('dotenv').config();
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("✅ Connected to MongoDB");

        // Xóa dữ liệu cũ
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Tạo danh mục
        const categories = await Category.insertMany([
            { name: "Quà lưu niệm" },
            { name: "Văn phòng phẩm" },
            { name: "Thời trang UTE" },
        ]);

        // Tạo sản phẩm mẫu
        const products = [
            {
                name: "Móc khóa UTE",
                price: 20000,
                imageUrl: "https://example.com/mockhoa.jpg",
                categoryId: categories[0]._id,
            },
            {
                name: "Ly sứ UTE",
                price: 80000,
                imageUrl: "https://example.com/lysu.jpg",
                categoryId: categories[0]._id,
            },
            {
                name: "Sổ tay UTE",
                price: 45000,
                imageUrl: "https://example.com/sotay.jpg",
                categoryId: categories[1]._id,
            },
            {
                name: "Bút bi UTE",
                price: 10000,
                imageUrl: "https://example.com/butbi.jpg",
                categoryId: categories[1]._id,
            },
            {
                name: "Áo thun UTE",
                price: 120000,
                imageUrl: "https://example.com/aothun.jpg",
                categoryId: categories[2]._id,
            },
            {
                name: "Nón UTE",
                price: 90000,
                imageUrl: "https://example.com/non.jpg",
                categoryId: categories[2]._id,
            },
        ];

        await Product.insertMany(products);

        console.log("🎉 Product seeding completed!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding products:", err);
        process.exit(1);
    }
};

seedData();
