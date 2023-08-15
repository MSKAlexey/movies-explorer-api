module.exports = class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 401;
  }
};
