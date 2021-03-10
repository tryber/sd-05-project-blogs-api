class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof InvalidData) return 400;
    if (this instanceof Conflict) return 409;
    return 500;
  }
}

class Conflict extends GeneralError { }
class InvalidData extends GeneralError { }

module.exports = {
  GeneralError,
  Conflict,
  InvalidData,
};
