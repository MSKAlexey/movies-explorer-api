const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const InternalServerError = require('./InternalServerError');

// class NotFoundError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = err.message;
//     this.statusCode = 404;
//   }
// }

// class GeneralError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Ошибка на стороне сервера';
//     this.statusCode = 500;
//   }
// }

// class EmailDuplicateError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Такой email уже зарегестрирован';
//     this.statusCode = 409;
//   }
// }

// class ForbiddenError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = err.message;
//     this.statusCode = 403;
//   }
// }

// class IncorrectDataError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = err.message;
//     this.statusCode = 400;
//   }
// }

// class ValidationError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = err.message;
//     this.statusCode = 400;
//   }
// }

// class EmailNotFoundError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Такой email не зарегестрирован';
//     this.statusCode = 401;
//   }
// }

// class AuthorizationError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Авторизуйтесь';
//     this.statusCode = 401;
//   }
// }

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
