module.exports = {
  SECRET: 'grogu',
  jwtConf: {
    expiresIn: '1d',
    algorithm: 'HS256',
  },
  payload: {
    iss: 'blogs-api',
    aud: 'identity',
  },
};
