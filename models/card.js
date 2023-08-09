const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    // ref: 'user',
  },
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2'],
    maxlength: [30, 'Максимальная длина поля 30'],
  },
  link: {
    type: String,
    default: 'https://mobimg.b-cdn.net/v3/fetch/6d/6d48cc4931068721007e798bbfcd1e8c.jpeg',
    required: [true, 'Поле link должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле owner должно быть заполнено'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
