const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'User_id', foreignKey: 'UserId' });
  };
  return Post;
};

module.exports = Posts;
