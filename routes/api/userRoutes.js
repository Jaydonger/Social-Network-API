const router = require('express').Router();
// user controller functions
const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  updateById,
  removeById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUsers).post(postNewUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateById).delete(removeById);

// /api/students/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
