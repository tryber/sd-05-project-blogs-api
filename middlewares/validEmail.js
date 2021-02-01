const regexEmail = new RegExp(/^[a-z]+[a-z . 0-9]*@[a-z 0-9]+\.[a-z]{2,3}$/i);

function MiddleEmail(req, _res, next) {
  const { email } = req.body;
  const err = {
    message: '"email" is required',
    status: 400,
  };
  if (email === undefined) { return next(err); }
  err.message = '"email" is not allowed to be empty';
  if (email === '') { return next(err); }
  err.message = '"email" must be a valid email';
  return regexEmail.test(email) ? next() : next(err);
}

module.exports = MiddleEmail;
