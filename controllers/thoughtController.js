const { Thought, User } = require("../models");

module.exports = {
  // find all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // create thought
  // postNewThought(req, res) {
  //   User.findOneAndUpdate(
  //     {_id: req.params.userId },
  //     {$push: {thoughts: Thought.create(req.body)
  //         .then((thought) => res.json(thought))
  //         .catch((err) => res.status(500).json(err))}}
  //   )
  // },

  postNewThought(req, res) {
    const {username, thoughtText, userId} = req.body;
    Thought.create({username, thoughtText})
      .then((thought) => {
        User.findOneAndUpdate(
        {_id: userId},
        {$push: {thoughts: thought._id}}
      ).then((user) => {
        res.json(thought)
      }).catch((err) => res.status(500).json(err));
    }).catch((err) => res.status(500).json(err));
  },

  // find single comment
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update comment by id
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //remove comment by id
  removeThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      // .then((thought) =>
      //   !thought
      //     ? res.status(404).json({ message: "No thought with that ID" })
      //     : Thought.reactions.deleteMany({ _id: { $in: Thought.reactions } })
      // )
      .then(() => res.json({ message: "Thoughts and reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // create reaction
  newReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: "No Thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};