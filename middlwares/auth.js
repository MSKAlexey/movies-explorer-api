const jwt = require('jsonwebtoken');
const { JWT } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
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
