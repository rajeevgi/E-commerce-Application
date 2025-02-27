const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Get Mapping to list all the Products.
router.get('/getAllProducts', productController.getProducts);

// Get Mapping to get particular product details by Id.
router.get('/getProductById/:id', productController.getProductById);

// Post Mapping to save products.
router.post('/saveProduct', productController.addProduct);

// Delete Mapping to remove product.
router.delete('/deleteProductById/:id', productController.deleteProduct);

// Put Mapping to update product.
router.put('/updateProductById/:id', productController.updateProduct);

module.exports = router;