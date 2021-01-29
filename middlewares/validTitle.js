function MiddleTitle(req, _res, next) {
  const { title } = req.body;
  const err = {
    message: '"title" is required',
    status: 400,
  };
  if (title === undefined) { next(err); }
  return next();
}

module.exports = MiddleTitle;
