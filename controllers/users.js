const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT } = require("../utils/config");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const ForbiddenError = require("../errors/ForbiddenError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const BadRequestError = require("../errors/BadRequestError");
const InternalServerError = require("../errors/InternalServerError");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        name,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          res.status(201).send(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(
              new ConflictError({
                message: "Такой пользователь уже зарегистрирован.",
              })
            );
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // для предотвращения лишних пустых запросов
  if (!email || !password) {
    next(new ForbiddenError({ message: "email или пароль не введены." }));
    return;
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((isValidUser) => {
        if (isValidUser) {
          const token = jwt.sign({ _id: user._id }, JWT);
          res.send({ token });
        } else {
          next(
            new UnauthorizedError({
              message: "Учетные данные введены неверно.",
            })
          );
        }
      });
    })
    .catch(next);
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.id || req.user._id)
    .orFail(() =>
      next(new NotFoundError({ message: "Пользователь с таким id не найден." }))
    )
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const newUser = req.body;
  const id = req.user._id;
  return User.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Искали, но не нашли");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Такой email занят"));
        return;
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError({ message: "Что то не так." }));
      } else {
        next(
          new InternalServerError({ message: "Ошибка на стороне сервера." })
        );
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  login,
  getUsersById,
  updateProfile,
};
