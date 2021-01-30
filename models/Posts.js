const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  return Post;
};

module.exports = Posts;
