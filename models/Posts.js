/* const Post = (sequelize, DataTypes) => {
  const postModel = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
      userId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  postModel.associate = (models) => {
    postModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return postModel;
};

module.exports = Post;
*/
