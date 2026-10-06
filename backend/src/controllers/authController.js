const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.'
    });
  }

  const user = db.findOne('users', u => u.username === username);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.'
    });
  }

  const isMatch = bcrypt.compareSync(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials.'
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return res.json({
    success: true,
    message: 'Authentication successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
};

exports.getMe = (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
};
