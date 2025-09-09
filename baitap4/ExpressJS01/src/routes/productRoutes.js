const express = require("express");
const { getProductsByCategory, searchProducts, filterProducts } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProductsByCategory);
router.get("/search", searchProducts);
router.get("/filter", filterProducts);
module.exports = router;
