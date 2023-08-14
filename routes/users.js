const router = require('express').Router();

const { getUsersById, updateProfile } = require('../controllers/users');

const { validateProfileUpdate } = require('../middlwares/validators/validators');

router.get('/me', getUsersById);

router.patch('/me', validateProfileUpdate, updateProfile);

module.exports = router;
