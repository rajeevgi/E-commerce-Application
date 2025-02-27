const mongoose = require("mongoose");
const Product = require('../models/Product');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
});

// Before ordering , it will reduce the stock for each an order placed.
orderSchema.pre('save', async function (next) {
  if(!this.isNew) return next();   // It will run only when new orders are placed.

  try {
    for(let item of this.items){
      let prod = await Product.findById(item.product);
      
      if(!prod || prod.stock < item.quantity ){
        throw new Error('Not enough stock for product!');
      }

      prod.stock -= item.quantity;
      await prod.save(); 
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Restore stock after cancelling an order.
orderSchema.post('findOneAndUpdate', async function (doc) {
  if(doc.status === "Cancelled"){
    for(let item of doc.items){
      await Product.findByIdAndUpdate(item.product, { $inc : { stock: item.quantity }});
    }
  }
});

module.exports = mongoose.model("Order", orderSchema);
