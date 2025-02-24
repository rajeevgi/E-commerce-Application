const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register as a customer or admin.
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.json({ message: "User Registered Successfully..." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login as a admin or customer.
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message : "Invalid Credentials!"});
        }
        const token = jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

