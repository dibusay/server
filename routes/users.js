var express = require('express');
var router = express.Router();
const {AddUser} = require('../controllers/users-controller')

router.post('/', AddUser);


module.exports = router;
