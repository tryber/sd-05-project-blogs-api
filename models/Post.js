const Post = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
  );

  post.associate = (model) => {
    post.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };

  return post;
};

module.exports = Post;
