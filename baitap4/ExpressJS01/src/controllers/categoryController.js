import Category from "../models/category.js";

// Lấy tất cả category
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

// Thêm category (dùng cho admin seed data)
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        return res.status(201).json(category);
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};
