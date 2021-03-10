const createUser = async (data) => {
  const userData = await createSchema(data);
  const { error } = userData;
  if (error) {
    return error;
  }
  return userData;
};

module.exports = { createUser };
