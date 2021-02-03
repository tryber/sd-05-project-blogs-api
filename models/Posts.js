const Post = (sequelize, DataTypes) => {
  const newPost = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
  });

  newPost.associate = (models) => {
    newPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return newPost;
};

module.exports = Post;
