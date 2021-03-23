const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Post.init(
    {
      id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      sequelize,
      modelName: 'Post',
      timestamps: false,
    },
  );
  return Post;
};
