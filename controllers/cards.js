/* eslint-disable no-undef */
const Movie = require('../models/movie');

const createMovie = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;

  Movie.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
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

const likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((movie) => {
      if (movie) {
        return res.send(movie);
      }
      next(res.status(404).send('Карточка не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(400));
        return;
      }
      next(err);
    });
};

const dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((movie) => {
      if (movie) {
        return res.send(movie);
      }
      next(res.status(404).send('Карточка не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(400));
        return;
      }
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  dislikeMovie,
  likeMovie,
};
