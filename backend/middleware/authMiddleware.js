const jwt = require('jsonwebtoken');
const { users } = require('../data/mockData');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: missing token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ecompulse_super_secret_key_2026');
    const user = users.find((entry) => entry.id === decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: invalid token user' });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid or expired token' });
  }
};

module.exports = { protect };
