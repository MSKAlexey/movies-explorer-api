const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const InternalServerError = require('./InternalServerError');


const errorHandler = (err, req, res, next) => {
  let error;
  if (err.statusCode === 409) {
    error = new ConflictError(err);
  } else if (err.statusCode === 404) {
    error = new NotFoundError(err);
  } else if (err.statusCode === 403) {
    error = new ForbiddenError(err);
  } else if (err.name === 'ValidationError' || err.statusCode === 400) {
    error = new BadRequestError(err);
  } else if (err.name === 'JsonWebTokenError' || err.statusCode === 401) {
    error = new UnauthorizedError(err);
  } else {
    error = new InternalServerError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
