const express = require("express");
const { getProductsByCategory } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProductsByCategory);

module.exports = router;
