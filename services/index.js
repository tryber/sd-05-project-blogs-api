const users = require('./usersServices');
const posts = require('./postsServices');
const tokenJWT = require('./tokenJWT');

module.exports = { tokenJWT, posts, users };
