const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

// Post Mapping to Add Prouct to Cart.
router.post('/addProductToCart', cartController.addToCart);

module.exports = router;