// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../Model/User.model');

const authenticate = async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('split',token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.userId = decodedToken.userId;
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    } 
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticate;
