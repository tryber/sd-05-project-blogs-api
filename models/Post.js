const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { foreignKey: true, type: DataTypes.INTEGER },
  }, { timestamps: false });

  return Post;
};

module.exports = createPost;
