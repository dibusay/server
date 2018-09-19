var express = require('express');
var router = express.Router();
const {AddUser, FindUser} = require('../controllers/users-controller')

router.post('/', AddUser);
router.get('/:uid', FindUser)

module.exports = router;
