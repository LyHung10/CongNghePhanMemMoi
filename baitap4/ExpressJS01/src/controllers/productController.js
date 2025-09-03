const productService = require("../services/productService");

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId, page = 1, limit = 10 } = req.query;
        const result = await productService.getProductsByCategory(categoryId, Number(page), Number(limit));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProductsByCategory };
