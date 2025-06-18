const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'votre_secret';

exports.signToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: '1d' }
  );
};
