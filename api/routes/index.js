const bodyParser = require('express');
const users = require('./usersRouter');
const posts = require('./postsRouter');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(users);
  app.use(posts);
  app.use((err, _req, res, _next) => {
    if (err.status) {
      return res.status(err.status).json(err);
    }
  });
};
