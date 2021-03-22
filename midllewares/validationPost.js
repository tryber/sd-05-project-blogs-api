function verifyTitle(title) {
  const err = {};
  console.log(title);
  if (!title) {
    err.message = '"title" is required';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

function verifyContent(content) {
  const err = {};
  if (!content) {
    err.message = '"content" is required';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

module.exports = { verifyTitle, verifyContent };
