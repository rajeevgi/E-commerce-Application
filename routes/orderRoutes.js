const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Get Mapping to list all the orders.
router.get('/getAllOrders', orderController.getOrders);

// Post Mapping to add orders.
router.post('/saveOrders', orderController.addOrders);

// Post Mapping to cancel orders.
router.put('/cancelOrder/:id', orderController.cancelOrder);

// Delete Mapping to delete an order.
router.delete('/deleteOrder/:id', orderController.deleteOrder);

module.exports = router;