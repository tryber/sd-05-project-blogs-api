const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
  });

  return Post;
};

module.exports = Post;
