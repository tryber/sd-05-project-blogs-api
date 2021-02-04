const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('Post', {

    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  post.associate = (models) => {
    post.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return post;
};

module.exports = Post;
