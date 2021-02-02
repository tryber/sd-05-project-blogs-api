const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
    },
    { timestamps: false },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
  };
  return Post;
};

module.exports = Posts;
