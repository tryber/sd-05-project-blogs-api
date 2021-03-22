const displayNameObject = (DataTypes) => ({
  type: DataTypes.STRING,
  validate: {
    len: {
      args: [8, 20],
      msg: '"displayName" length must be at least 8 characters long',
    },
  },
});

const emailObject = (DataTypes) => ({
  type: DataTypes.STRING,
  validate: {
    isEmail: {
      msg: '"email" must be a valid email',
    },
  },
});

const passwordObject = (DataTypes) => ({
  type: DataTypes.STRING,
  validate: {
    len: {
      args: [6, 20],
      msg: '"password" length must be 6 characters long',
    },
  },
});

const User = (sequelize, DataTypes) => {
  const newUser = sequelize.define('User', {
    displayName: displayNameObject(DataTypes),
    email: emailObject(DataTypes),
    password: passwordObject(DataTypes),
    image: DataTypes.STRING,
  }, { timestamps: false });
  newUser.associate = (models) => {
    newUser.hasMany(models.Posts, { foreignKey: 'userId', as: 'posts' });
  };

  return newUser;
};

module.exports = User;
