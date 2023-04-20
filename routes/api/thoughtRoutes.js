const router = require('express').Router();
// thoughts controller functions
const {
  getAllThoughts,
  getSingleThought,
  postNewThought,
  updateThoughtById,
  removeThoughtById,
  newReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getAllThoughts).post(postNewThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThoughtById)
  .delete(removeThoughtById);
router.route('/:thoughtId/reactions').post(newReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
