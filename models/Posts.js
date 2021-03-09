const Post = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { timestamps: false },
  );

  post.associate = (models) =>
    post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

  return post;
};

module.exports = Post;
