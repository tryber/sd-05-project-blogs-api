const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  const secret = 'magic-is-real';
  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  const { password: _, ...userWithoutPassword } = user;
  const payload = {
    userData: userWithoutPassword,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = createToken;
