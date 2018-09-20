var express = require('express');
var router = express.Router();
const { getAll, getById, addToUser, removeFromUser } = require('../controllers/favourites-controller')

router
  .route('/')
  .get(getAll)
  .post(addToUser)

router
  .route('/:id')
  .get(getById)

router
  .route('/user/:id')
  .delete(removeFromUser)

module.exports = router;