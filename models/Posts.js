// Model represents tables in the DB
// Conventional to use singular here (Post) despite plural in the name (Posts)
const Post = (sequelize, Datatypes) => {
  const PostModel = sequelize.define('User', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  PostModel.associate = (models) => {
    PostModel.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
  };

  return PostModel;
};

module.exports = Post;
