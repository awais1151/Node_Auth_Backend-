 // routes/protected.js
const express = require('express');
const router = express.Router();
const authenticate = require('../Middleware/authenticate');
const authorize = require('../Middleware/authorize');
const User = require('../Model/User.model');

router.get('/profile', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
