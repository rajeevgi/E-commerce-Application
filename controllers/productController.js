const Product = require("../models/Product");

// Logic for get all products.
exports.getProducts = async (req, res) => {
  const products = await Product.find(); // find() will lists all the products.
  res.json(products);
};

// Logic for get product by id.
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const affectedRows = await Product.findById(id);

  if(!affectedRows){
    res.status(404).json({ message: "Product not found!" });
  }

  res.json(affectedRows);

}

// Logic for save or create a product.
exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body); // Creates an object of a each products.
  await newProduct.save();
  res.json({ message: "Product Created Successfully..." });
};

// Logic for delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProd = await Product.findByIdAndDelete(id);

    if (!deletedProd) {
      res.status(404).json({ message: "Product not found!" });
    }
    res.json({ message: "Product Deleted Successfully..." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logic for update products
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProd = await Product.findByIdAndUpdate(id, req.body, { new : true });

    if (!updatedProd) {
      res.status(404).json({ message: "Product not found!" });
    }
    res.json({ message: "Product Updated Successfully...", updatedProd });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
