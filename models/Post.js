const Post = (sequelize, DataTypes) => {
  const PostModel = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  PostModel.associate = (models) => {
    PostModel.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return PostModel;
};

module.exports = Post;
