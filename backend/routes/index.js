var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')
var register = require('../controllers/register')
var login = require('../controllers/login')
var resList = require('../controllers/resList')
var resInfo = require('../controllers/resInfo')
var checkInfo = require('../controllers/checkInfo')
router.get('/', user.getUser);
router.get('/getOrder', user.getOrder)
router.post('/login', login.log)
router.post('/register', register.reg)
router.get('/resList',resList.res)
router.get('/resInfo',resInfo.resIn)
router.post('/checkInfo',checkInfo.checkIn)
module.exports = router;
