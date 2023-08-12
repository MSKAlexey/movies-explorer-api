module.exports = class ConflictError extends Error {
  constructor(err) {
    super(err);
    this.message = err;
    this.statusCode = 409;
  }
};
