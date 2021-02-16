const PostModel = (sequelize, DataTypes) => {
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
    }, { timestamps: false },
  );

  PostModel.associate = (models) => {
    PostModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'userPosts' });
  };

  return Post;
};

module.exports = PostModel;
