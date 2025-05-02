const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');  // Replace 'secretKey' with your actual secret key
    req.user = decoded;  // Attach the user info to the request object
    next();  // Call next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
