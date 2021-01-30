const findPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};

module.exports = findPost;
