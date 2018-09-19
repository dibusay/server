var express = require('express');
var router = express.Router();
const { getAll, getById, create, removeFromUser } = require('../controllers/favourites-controller')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Favourites page' });
// });

router
  .route('/')
  .get(getAll)
  .post(create)

router
  .route('/:id')
  .get(getById)

router
  .route('/user/:id')
  .delete(removeFromUser)

module.exports = router;