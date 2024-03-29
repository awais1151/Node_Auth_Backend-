// middleware/authorize.js
const authorize = (allowedRoles) => (req, res, next) => {
const { role } = req.user;
  console.log("authorie : ",req.user)
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
    }
    next();
  };
  
  module.exports = authorize;
  