const findPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
  },
  {
    timestamps: false,
  });
  return Post;
};

module.exports = findPost;
