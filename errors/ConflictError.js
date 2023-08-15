module.exports = class ConflictError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 409;
  }
};
