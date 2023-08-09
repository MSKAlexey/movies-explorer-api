module.exports = class InternalServerError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 500;
  }
};
