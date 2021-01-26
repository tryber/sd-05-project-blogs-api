const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
  };

  return post;
};

module.exports = Post;
