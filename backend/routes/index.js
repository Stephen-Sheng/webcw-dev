var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var user = require('../controllers/userController')
var register = require('../controllers/register')
var login = require('../controllers/login')
var resList = require('../controllers/resList')
var resInfo = require('../controllers/resInfo')
var checkInfo = require('../controllers/checkInfo')
var order = require('../controllers/order')
var upload = require('../controllers/upload')
router.get('/', user.getUser);
router.get('/getOrder', user.getOrder)
router.post('/login', login.log)
router.post('/register', register.reg)
router.get('/resList',resList.res)
router.get('/resInfo',resInfo.resIn)
router.post('/checkInfo',checkInfo.checkIn)
router.get('/orderList',order.orderList)
router.get('/orderInfo',order.orderInfo)
router.post('/upload',upload.upload)
module.exports = router;
