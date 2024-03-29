// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Model/User.model');
const jwt = require('jsonwebtoken');


//Register End Points
router.post('/register', async (req, res) => {
  const { username, email, password,role} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword ,role});
    await newUser.save();
    res.status(201).json({ message:'User Registered Successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 


//Login End Points 

router.get('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log(user._id);
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

   
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
