const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateId, validateCreateCard } = require('../middlwares/validators/validators');

router.post('/', validateCreateCard, createCard);
router.get('/', getCards);
router.delete('/:id', validateId, deleteCard);
router.put('/:id/likes', validateId, likeCard);
router.delete('/:id/likes', validateId, dislikeCard);

module.exports = router;
