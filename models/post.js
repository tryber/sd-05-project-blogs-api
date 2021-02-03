const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.STRING },
      published: { type: DataTypes.DATE },
      updated: { type: DataTypes.DATE },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    { timestamps: false },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};

module.exports = createPost;
