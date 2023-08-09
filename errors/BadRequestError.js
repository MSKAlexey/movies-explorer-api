module.exports = class BadRequestError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 400;
  }
};
