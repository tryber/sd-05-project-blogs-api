const Joi = require('joi');

const verifyPost = async (req, res, next) => {
  const { title, content } = req.body;
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  try {
    await schema.validateAsync({ title, content });
    return next();
  } catch (e) {
    if (e) {
      const { details } = e;
      res.status(400).json({ message: details[0].message });
    }
  }
};

module.exports = {
  verifyPost,
};
