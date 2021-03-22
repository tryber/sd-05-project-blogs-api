const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  const secret = 'senhadificil';

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password: _, ...userWithoutPassword } = user;

  const payload = {
    userData: userWithoutPassword,
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  // Retorna token ao usuário
  return token;
};

module.exports = createToken;
