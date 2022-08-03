const express = require("express");

const productsController = require("../controllers/products");
const router = express.Router();

router.post("/", productsController.createProduct);


module.exports = router;