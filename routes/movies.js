const router = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
  likeMovie,
  dislikeMovie,
} = require('../controllers/movie');

const {
  validateId, validateCreate
} = require('../middlwares/validators/validators');

router.post('/', validateCreate, createMovie);


router.get('/', getMovies);


router.delete('/:id', validateId, deleteMovie);


router.put('/:id/likes', validateId, likeMovie);


router.delete('/:id/likes', validateId, dislikeMovie);

module.exports = router;
