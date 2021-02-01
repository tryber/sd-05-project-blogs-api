function MiddleContent(req, _res, next) {
  const { content } = req.body;
  const err = {
    message: '"content" is required',
    status: 400,
  };
  if (!content) { return next(err); }
  return next();
}

module.exports = MiddleContent;
