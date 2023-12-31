const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: [true, 'Поле страна должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле режиссёр фильма должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле год выпуска фильма должно быть заполнено'],
  },
  year: {
    type: Number,
    required: [true, 'Поле длительность фильма должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле описание фильма должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле постер к фильму должно быть заполнено'],
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле трейлер фильма должно быть заполнено'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле миниатюрное изображение постера к фильму должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле owner должно быть заполнено'],
  },
  movieId: {
    type: String,
    required: [true, 'Поле movieId должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN должно быть заполнено'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
