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

class InvalidData extends GeneralError { }
class Conflict extends GeneralError { }

module.exports = {
  GeneralError,
  InvalidData,
  Conflict
};
