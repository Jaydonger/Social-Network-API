const { User, Thought } = require('../models');


module.exports = {
  getAllUsers(req, res) {
    User.find()
      .populate({ path: 'thoughts',  select: '-__v' })
      .populate({ path: 'friends',  select: '-__v' })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({ path: 'thoughts',  select: '-__v' })
    .populate({ path: 'friends',  select: '-__v' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new User
  postNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeById(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
},
  
  // create a new User
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};