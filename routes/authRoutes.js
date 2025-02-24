const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Post Mapping to register admin or customer.
router.post('/register', authController.register);

// Post Mapping to login admin or customer.
router.post('/login', authController.login);

module.exports = router;





