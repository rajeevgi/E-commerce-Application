const Product = require('../models/Product');

// Logic for get all products.
exports.getProducts = async (req, res) => {
    const products = await Product.find();   // find() will lists all the products.
    res.json(products); 
}

// Logic for save or create a product.
exports.addProduct = async (req, res) => {
    const newProduct = new Product(req.body);  // Creates an object of a each products. 
    await newProduct.save();
    res.json({ message : "Product Created Successfully..." });
}