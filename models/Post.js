const Post = (sequelize, DataTypes) => {
  const PostModel = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    userId: DataTypes.INTEGER,
  });

  PostModel.associate = (models) => {
    PostModel.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return PostModel;
};

module.exports = Post;

// Post.associate = (models) => {
//   Post.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
// };