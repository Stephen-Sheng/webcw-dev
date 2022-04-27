var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
var app = express();
//改写
var http = require('http');
const dbConfig = require("./util/dbconfig");
var server = http.createServer(app);


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/public/',express.static(‘./public/’))
app.use(express.static( 'public'));


const io = require('socket.io')(server, { cors: true });
io.on('connection', (client) => {
    client.on('resOrder', (username) => {
        let value = null;
        setInterval(() => {
            var sql = "SELECT resName,orderId,username,price,orderStatus,date FROM cw.restaurant,cw.orderList WHERE cw.restaurant.resId=cw.orderList.resid AND ownerName=?";
            var sqlArr = [username];
            var callBack = (err, data) => {
                if(err){
                    console.log('socket failed');
                } else {
                    if((data != null) && (data != value)){
                        client.emit("orderLst",[data,value])
                    }


                    value = data;
                }
            }
            dbConfig.sqlConnect(sql, sqlArr, callBack)
            //client.emit('timer', new Date());
        }, 5000);
    });
});

const port=12312;
io.listen(port);
console.log('listening on port ', port);

server.listen(5020);
