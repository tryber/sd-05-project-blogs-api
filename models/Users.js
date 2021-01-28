const User = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'posts' });
  };
  return Users;
};

module.exports = User;

// id: 2,
// displayName: 'Michael Schumacher',
// email: 'MichaelSchumacher@gmail.com',
// password: '123456',
// image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg'
