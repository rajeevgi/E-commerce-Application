const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if not exists
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      // Check if product is already in cart
      let itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
      
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    console.error("Error adding to cart:", error);
    if (!res.headersSent) {  // Prevent multiple responses
      return res.status(500).json({ message: "Server error", error });
    }
  }
};
