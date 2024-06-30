const { getUsers, getSingleUser, CreateUser, updateUser, deleteUser } = require('../../controllers/userController');

const router = require('express').Router();

router.route('/').get(getUsers).post(CreateUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;