const Product = require("../models/product");
const Category = require("../models/category");

const getProductsByCategory = async (categoryId, page = 1, limit = 5) => {
    const query = categoryId ? { categoryId } : {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Product.find(query).populate("categoryId", "name").skip(skip).limit(limit),
        Product.countDocuments(query),
    ]);

    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = { getProductsByCategory };
