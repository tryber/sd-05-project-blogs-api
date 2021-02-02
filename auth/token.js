require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'segredinhoalternativo';

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  // Removendo a senha do usuário (recebido como parâmetro) para transportar informações sensíveis
  const { password: _, ...userWithoutPassword } = user.dataValues;
  // [No seu payload deve estar presente o id, email e role do usuário.]
  const payload = {
    userData: userWithoutPassword,
  };
  // Assinatura
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const decodeToken = (token) => jwt.verify(token, secret);

module.exports = { generateToken, decodeToken };
