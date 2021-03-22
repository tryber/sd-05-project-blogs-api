const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    { timestamps: false },
    );
    return User
};

module.exports = createUser;
