const throwErr = (code, message, statusCode = 400) => ({ error: true, code, message, statusCode });

module.exports = throwErr;
