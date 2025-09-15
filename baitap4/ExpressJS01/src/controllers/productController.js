const productService = require("../services/productService");

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId, page = 1, limit = 4 } = req.query;
        const result = await productService.getProductsByCategory(categoryId, Number(page), Number(limit));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Controller cho fuzzy search
const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: "Missing query string" });

        const products = await productService.searchProductsService(q);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller cho filter
const filterProducts = async (req, res) => {
    try {
        const {
            categoryId,
            minPrice,
            maxPrice,
            discount,
            minViews,
            page = 1,
            limit = 4
        } = req.query;

        // ép kiểu số
        const filters = {
            categoryId: categoryId || null,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            discount: discount ? Number(discount) : undefined,
            minViews: minViews ? Number(minViews) : undefined
        };

        const result = await productService.filterProductsService(filters, Number(page), Number(limit));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getProductsByCategory, searchProducts, filterProducts };
