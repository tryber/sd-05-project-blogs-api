const Post = (sequelize, DataTypes) => {
  const postModel = sequelize.define(
    'Post',
    {
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.STRING },
      userId: { foreignKey: true, type: DataTypes.INTEGER },
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    { timestamps: false },
  );

  postModel.associate = (models) => {
    postModel.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return postModel;
};

module.exports = Post;
