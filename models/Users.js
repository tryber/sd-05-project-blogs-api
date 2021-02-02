const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER,
    // },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    image: {
      defaultValue: '',
      type: DataTypes.STRING,
    },
  }, { timestamps: false }
  );

  // User.associate =(models) => {
  //   User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  // }

  return User;
}

module.exports = createUser;
