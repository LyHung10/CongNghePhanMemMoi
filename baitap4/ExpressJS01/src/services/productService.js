const Product = require("../models/product");
const Category = require("../models/category");
const { similarity } = require("../utils/levenshtein");
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

//  Fuzzy search
const searchProductsService = async (keyword) => {
    const products = await Product.find().populate("categoryId", "name");

    // tính độ similarity với tên sản phẩm
    const scored = products.map(p => ({
        product: p,
        score: similarity(keyword, p.name)
    }));

    // lọc sản phẩm similarity >= 0.15 (15%)
    const filtered = scored
        .filter(s => s.score >= 0.15)
        .sort((a, b) => b.score - a.score);

    return filtered.map(s => s.product);
};

//  Lọc sản phẩm
const filterProductsService = async (filters, page, limit) => {
    let query = {};

    if (filters.categoryId) {
        query.categoryId = filters.categoryId;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.price = {};
        if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
        if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }
    if (filters.discount !== undefined) {
        query.discount = { $gte: filters.discount };
    }
    if (filters.minViews !== undefined) {
        query.views = { $gte: filters.minViews };
    }

    // đếm tổng sản phẩm
    const total = await Product.countDocuments(query);

    // phân trang
    const products = await Product.find(query)
        .populate("categoryId", "name")
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        data: products,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
};


module.exports = { getProductsByCategory, searchProductsService, filterProductsService };
