const jwt = require('jsonwebtoken');

const tokenJWT = async (user) => {
  const secret = 'backEndInfluencer';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password: _, ...userWithoutPassword } = user;
  // const { _id: id } = userWithoutPassword;

  // const payload = {
  //   sub: id,
  //   userData: userWithoutPassword,
  // };

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);
  return token;
};

module.exports = tokenJWT;
