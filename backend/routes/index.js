var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var multer = require('multer');



var user = require('../controllers/userController')
var register = require('../controllers/register')
var login = require('../controllers/login')
var resList = require('../controllers/resList')
var resInfo = require('../controllers/resInfo')
var checkInfo = require('../controllers/checkInfo')
var order = require('../controllers/order')
var upload = require('../controllers/upload')
var changeOrderStatus = require("../controllers/changeOrderStatus")
var restaurant = require("../controllers/restaurant")
var rider = require("../controllers/rider")

router.get('/', user.getUser);
router.get('/getOrder', user.getOrder)
router.post('/login', login.log)
router.post('/register', register.reg)
router.get('/resList',resList.res)
router.get('/resInfo',resInfo.resIn)
router.post('/checkInfo',checkInfo.checkIn)
router.get('/orderList',order.orderList)
router.get('/orderInfo',order.orderInfo)
router.post('/upload', multer({
    dest: 'public/images'
}).single('file'),upload.upload)
router.post('/changeOrderStatus',changeOrderStatus.changeOS)
router.get("/resGetOrder",restaurant.resGetOrder)
router.post('/resDetails',restaurant.resDetails)
router.post("/verify",register.ver)
router.get("/verifyPage",register.verPage)
router.get("/riderList",rider.rider)
module.exports = router;
