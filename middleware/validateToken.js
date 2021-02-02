const jwt = require('jsonwebtoken');

const secret = require('../auth/secret');
const CodeError = require('../errorClass/errorClass');

const verifyJWT = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new CodeError(401, 'Token não encontrado');

    jwt.verify(authorization, secret, (err, decoded) => {
      if (err) throw new CodeError(401, 'Token expirado ou inválido');
      req.validatedTokenInfo = decoded;
      next();
    });
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

module.exports = verifyJWT;

//  https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
//  https://www.npmjs.com/package/jsonwebtoken
//  https://stackoverflow.com/questions/38844137/jsonwebtoken-verify-always-return-only-iat-xxx
//  https://stackoverflow.com/questions/10983500/how-do-i-store-request-level-variables-in-node-js
