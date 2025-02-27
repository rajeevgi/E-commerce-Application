const Order = require("../models/Order");

// Logic for get all orders.
exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.product");
  res.json(orders);
};

// Logic for save or create an order.
exports.addOrders = async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.json({ message: "Orders created Successfully..." });
};

// Logic for cancelling orders by user
exports.cancelOrder = async (req, res) => {
    try {
        const { id } = req.params; // Get order ID from URL params

        // Find the order by ID
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if the order status allows cancellation
        if (["Pending", "Shipped"].includes(order.status)) {
            // Update order status to 'Cancelled'
            await Order.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });
            return res.status(200).json({ message: "Order has been cancelled successfully" });
        } else {
            return res.status(400).json({ message: "Order cannot be cancelled at this stage" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOrder = await Order.findByIdAndDelete(id);

        if(!deleteOrder){
            res.status(404).json({ message : "Order Not found!" });
        }
        res.json({ message : "Order Deleted Successfully...",deleteOrder});
    } catch (error) {
        res.status(500).json({ message : "Internal Server Error!" });
    }
}