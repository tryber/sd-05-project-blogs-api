const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { foreignKey: true, type: DataTypes.INTEGER },
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    { timestamps: false },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Post;
};

module.exports = createPost;
