const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, buyProduct } = require("../controllers/product.controller");

// create route
router.post("/create", createProduct);

// all product route
router.get("/getall",getAllProducts);

//  busy product route 
router.post('/buy/:id', buyProduct)

module.exports = router;

