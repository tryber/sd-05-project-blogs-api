const create = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return Users;
};

/* const getByEmail = async (email) => {
  const [buscaEmail] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  return buscaEmail[0];
}; */

module.exports = create;
