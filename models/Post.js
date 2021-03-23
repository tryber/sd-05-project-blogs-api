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
    { timestamps: false },
  );

  post.associate = (model) => {
    post.belongsTo(model.User, { as: 'user', foreignKey: 'userId' });
  };

  return post;
};

module.exports = Post;
