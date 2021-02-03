const regexPassword = new RegExp(/.{6,}/i);

function MiddlePassword(req, res, next) {
  const { password } = req.body;
  const err = {
    message: '"password" is required',
    status: 400,
  };
  if (password === undefined) { return next(err); }
  err.message = '"password" is not allowed to be empty';
  if (password === '') { return next(err); }
  err.message = '"password" length must be 6 characters long';
  return regexPassword.test(password) ? next() : next(err);
}

module.exports = MiddlePassword;
