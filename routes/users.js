const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  updateProfile,
} = require('../controllers/users');
const { validateAvatarUpdate, validateProfileUpdate, validateId } = require('../middlwares/validators/validators');

router.get('/', getUsers);

router.get('/me', getUsersById);

router.get('/:id', validateId, getUsersById);

router.patch('/me', validateProfileUpdate, updateProfile);
router.patch('/me/avatar', validateAvatarUpdate, updateProfile);

module.exports = router;
