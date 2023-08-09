const Card = require('../models/card');

const createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      next(res.status(404).send('Карточка не найдена'));
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(res.status(403).send('Удалять можно только свои карточки'));
      } else {
        card.deleteOne(card)
          .then(() => res.send(card));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card) {
        return res.send(card);
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

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card) {
        return res.send(card);
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
  createCard,
  getCards,
  deleteCard,
  dislikeCard,
  likeCard,
};
