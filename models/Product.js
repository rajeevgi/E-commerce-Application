const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
