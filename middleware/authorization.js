const jwt = require("jsonwebtoken");

const { SECRET } = require("../helper/token");

const errorMessage = (message) => ({ message });

const verifyJWT = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json(errorMessage("missing auth token"));
  try {
    const decoded = jwt.verify(token, SECRET);
    req.payload = decoded;
  } catch (error) {
    return res.status(401).json(errorMessage("jwt malformed"));
  }
  next();
};

module.exports = { verifyJWT };
