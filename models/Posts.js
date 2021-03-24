module.exports = (sequelize, DataType) => {
  const Posts = sequelize.define(
    'Posts', { id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER,
    },
    title: { type: DataType.STRING },
    content: { type: DataType.STRING },
    userId: { type: DataType.INTEGER },
    published: { type: DataType.STRING },
    updated: { type: DataType.STRING },
    },
    { timestamps: false },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user id' });
  };

  return Posts;
};
