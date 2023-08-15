module.exports = class BadRequestError extends Error {
  constructor(err) {
    super(err);
    this.message = err;
    this.statusCode = 400;
  }
};
