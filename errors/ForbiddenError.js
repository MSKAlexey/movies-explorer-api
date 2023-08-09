module.exports = class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 403;
  }
};
