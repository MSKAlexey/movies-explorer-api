const router = require('express').Router();
const app = require('express')();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlwares/auth');
const {
  validateSingUp,
  validateSingIn
} = require('../middlwares/validators/validators');
const NotFoundError = require('../errors/NotFoundError');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт.');
  }, 0);
});

router.post('/signup', validateSingUp, createUser);
router.post('/signin', validateSingIn, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError({ message: 'Маршрут не найден.' }));
});

module.exports = router;
