const router = require('express').Router();
const app = require('express')();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlwares/auth');
const { validateSingUp, validateSingIn } = require('../middlwares/validators/validators');
const NotFoundError = require('../errors/NotFoundError');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateSingUp, createUser);
router.post('/signin', validateSingIn, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
