module.exports = class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.message = err;
    this.statusCode = 403;
  }
};
