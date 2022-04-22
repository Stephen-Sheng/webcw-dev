var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')
var register = require('../controllers/register')
var login = require('../controllers/login')
router.get('/', user.getUser);
router.get('/getOrder', user.getOrder)
router.post('/login', login.log)
router.post('/register', register.reg)
module.exports = router;
