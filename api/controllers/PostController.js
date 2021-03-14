const database = require('../models/index');

class PostController {
  static async buscaTodosPosts(req, res) {
    try {
      const posts = await database.Posts.findAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = PostController;
