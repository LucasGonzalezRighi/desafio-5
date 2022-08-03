const express = require("express");

const productsController = require("../controllers/products");
const router = express.Router();

// POST routes
router.post("/", productsController.createProduct);


module.exports = router;