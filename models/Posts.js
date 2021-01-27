// Model represents tables in the DB
// Conventional to use singular here (Post) despite plural in the name (Posts)
const Post = (sequelize, Datatypes) => {
  const PostModel = sequelize.define('Post', {
    // id: { type: Datatypes.INTEGER, primaryKey: true },
    title: Datatypes.STRING,
    content: Datatypes.TEXT,
    userId: { type: Datatypes.INTEGER, foreignKey: true },
    published: { type: Datatypes.DATE, defaultValue: Datatypes.NOW },
    updated: { type: Datatypes.DATE, defaultValue: Datatypes.NOW },
  },
  {
    timestamps: false,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  // foreignKey is always the userId, linking both tables
  // alias is what we are chosing it to be. Here, "user", because "post belongs to user".

  return PostModel;
};

module.exports = Post;
