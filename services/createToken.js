const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  const secret = process.env.SECRET || 'seicho-no-ie';
  const jwtConfig = {
    expiresIn: '30d',
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
