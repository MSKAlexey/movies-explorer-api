const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      next(res.status(404).send('Карточка не найдена'));
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(res.status(403).send('Удалять можно только свои карточки'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send(movie));
      }
    })
    .catch(next);
};


module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
