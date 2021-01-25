const { sendError } = require('../services');

const verifyTitle = (req) => {
  const { title } = req.body;

  if (!title) {
    return {
      status: 400,
      err: sendError('"title" is required'),
    };
  }

  return null;
};

const verifyContent = (req) => {
  const { content } = req.body;

  if (!content) {
    return {
      status: 400,
      err: sendError('"content" is required'),
    };
  }

  return null;
};

const postValidation = async (req, res, next) => {
  const titleErr = await verifyTitle(req);
  if (titleErr) {
    return res.status(titleErr.status).json(titleErr.err);
  }

  const contentErr = await verifyContent(req);
  if (contentErr) {
    return res.status(contentErr.status).json(contentErr.err);
  }

  next();
};

module.exports = postValidation;
