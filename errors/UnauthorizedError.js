module.exports = class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = err;
    this.statusCode = 401;
  }
};
