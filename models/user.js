const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Alexey',
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxlength: [30, 'Максимальная длина поля 30'],
  },
  about: {
    type: String,
    default: 'Demin',
    required: [true, 'Поле about должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxlength: [30, 'Максимальная длина поля 30'],
  },
  avatar: {
    type: String,
    default: 'https://mobimg.b-cdn.net/v3/fetch/6d/6d48cc4931068721007e798bbfcd1e8c.jpeg',
    required: [true, 'Поле avatar должно быть заполнено'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле email должно быть заполнено'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле password должно быть заполнено'],
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
