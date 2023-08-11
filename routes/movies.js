const router = require('express').Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');

const { validateId, validateCreate } = require('../middlwares/validators/validators');

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', validateCreate, createMovie);

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// удаляет сохранённый фильм по id
router.delete('/:id', validateId, deleteMovie);

module.exports = router;
