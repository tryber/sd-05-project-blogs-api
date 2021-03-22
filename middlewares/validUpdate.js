function validTitle(title) {
  const err = {};
  console.log(title);
  if (!title) {
    err.message = '"title" is required';
    err.status = 400;
    err.code = 'invalid_data';
    return err;
  }
  return err;
}

function validContent(content) {
  const err = {};
  if (!content) {
    err.message = '"content" is required';
    err.status = 400;
    err.code = 'invalid_data';
    return err;
  }
  return err;
}

module.exports = { validTitle, validContent };
