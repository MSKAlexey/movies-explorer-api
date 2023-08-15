module.exports = class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = err;
    this.statusCode = 404;
  }
};
