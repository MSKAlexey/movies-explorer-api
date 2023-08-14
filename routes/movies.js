const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

const { validateId } = require('../middlwares/validators/validators');

router.post('/', createMovie);

router.get('/', getMovies);

router.delete('/:id', validateId, deleteMovie);

module.exports = router;
