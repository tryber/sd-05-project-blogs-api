const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  });

  post.associate = (models) => {
    post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return post;
};

module.exports = Post;
