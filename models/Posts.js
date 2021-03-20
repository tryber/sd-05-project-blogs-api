const Post = (sequelize, DataTypes) => {
  const postModel = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  });

  return postModel;
};

module.exports = Post;
