const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const errorMessage = (message) => ({ message });

// payload, secret, header
const SECRET = "weeee";

const header = { expiresIn: "8h", algorithm: "HS256" };

const createToken = async (userEmail) => {
  const currentUser = await userModel(userEmail);
  if (currentUser.err) throw errorMessage;
  const {} = currentUser;
  const payload = { _id, email, role };
  const token = jwt.sign(payload, SECRET, header);
  return token;
};

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

module.exports = { validateToken: createToken, verifyJWT };
