function MiddleDisplayName(req, _res, next) {
  const { displayName } = req.body;
  const err = {
    message: '"displayName" length must be at least 8 characters long',
    status: 400,
  };
  // if (displayName === undefined) { return next(err); }
  return displayName && displayName.length > 8 ? next() : next(err);
}

module.exports = MiddleDisplayName;
