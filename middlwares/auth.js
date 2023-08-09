const jwt = require('jsonwebtoken');
const { JWT } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  // const token = req.headers.authorization;
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  const token = authorization.split('Bearer ')[1];

  let payload;
  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};

module.exports = auth;
