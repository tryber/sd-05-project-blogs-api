const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const newRes = (res, status, message) => res.status(status).json({ message });
module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) return newRes(res, 400, '"email" is required');
  if (!email) return newRes(res, 400, '"email" is not allowed to be empty');
  if (!isValidEmail(email)) return newRes(res, 400, '"email" must be a valid email');
  if (password === undefined) return newRes(res, 400, '"password" is required');
  if (!password) return newRes(res, 400, '"password" is not allowed to be empty');
  if (String(password).length < 6) {
    return newRes(res, 400, '"password" length must be 6 characters long');
  }
  return next();
};
