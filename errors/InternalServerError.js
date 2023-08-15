module.exports = class InternalServerError extends Error {
  constructor(err) {
    super(err);
    this.message = err;
    this.statusCode = 500;
  }
};
