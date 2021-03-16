const database = require('../models/index');
const { attributesExtrator } = require('../services');

class PostController {
  static async buscaTodosPosts(_req, res) {
    try {
      const posts = await database.Posts.findAll({
        include: {
          model: database.Users,
        },
      });
      const newPosts = await attributesExtrator(posts);
      res.status(200).json(newPosts);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error });
    }
  }

  static async cadastraUmPost(req, res) {
    const novoPost = { ...req.body };
    const { me } = req;
    try {
      const post = await database.Posts.create({
        ...novoPost,
        userId: me.id,
        published: new Date(),
        updated: new Date(),
      });
      return res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async buscaUmPost(req, res) {
    try {
      const { id } = req.params;
      const postFounded = await database.Posts.findOne({
        where: {
          id: Number(id),
        },
        include: {
          model: database.Users,
        },
      });
      if (postFounded !== null) {
        const post = await attributesExtrator([postFounded]);
        return res.status(200).json(...post);
      }
      return res.status(404).json({ message: 'Post não existe' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = PostController;

// static async buscaTodosPosts(_req, res) {
//   try {
//     const array = await database.Posts.findAll();
//     const posts = [];
//     await array.map(async (element) => {
//       const { userId } = element.dataValues;
//       const { ...post } = element.dataValues;
//       console.log('post: ', post);
//       const user = await buscaUsuarioPorId(userId);
//       const { password: _, ...postAuthor } = user.dataValues;
//       console.log('for author: ', postAuthor);
//       const newPost = { ...post, user: { ...postAuthor } };
//       console.log('post do usuario: ', newPost);
//       const newArray = await { ...newPost };
//       posts.push(newArray);
//     });
//     console.log('todos os posts', posts);
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }
