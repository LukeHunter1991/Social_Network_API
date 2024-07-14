const { getUsers, getSingleUser, CreateUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

const router = require('express').Router();

router.route('/').get(getUsers).post(CreateUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;