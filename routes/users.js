const router = require('express').Router();

const { getUsersById, updateProfile } = require('../controllers/users');

const { validateProfileUpdate } = require('../middlwares/validators/validators');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersById);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateProfileUpdate, updateProfile);

module.exports = router;
