// const displayNameObject = (DataTypes) => ({
//   type: DataTypes.STRING,
//   validate: {
//     len: {
//       args: [8, 50],
//       msg: '"displayName" length must be at least 8 characters long',
//     },
//   },
// });

// const emailObject = (DataTypes) => ({
//   type: DataTypes.STRING,
//   validate: {
//     isEmail: {
//       msg: '"email" must be a valid email',
//     },
//   },
// });

// const passwordObject = (DataTypes) => ({
//   type: DataTypes.STRING,
//   validate: {
//     len: {
//       args: [6, 50],
//       msg: '"password" length must be 6 characters long',
//     },
//   },
// });

const Post = (sequelize, DataTypes) => {
  const newPost = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, { timestamps: false });

  newPost.associate = (models) => newPost.belongsTo(models.User, { as: 'posts', foreignKey: 'userId' });

  return newPost;
};

module.exports = Post;
