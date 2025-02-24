const Order = require('../models/Order');

// Logic for get all orders.
exports.getOrders = async (req, res) => {
    const orders = await Order.find().populate("user").populate("items.product");
    res.json(orders);
}

// Logic for save or create an order.
exports.addOrders = async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message : "Orders created Successfully..." });
}