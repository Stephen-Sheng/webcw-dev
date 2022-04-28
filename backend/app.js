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
app.use(express.static('public'));


function compare(status){
    return function (a,b){
        var value1 = a[status]
        var value2 = b[status]
        return value2 - value1;
    }
}
const io = require('socket.io')(server, { cors: true });
io.on('connection', (client) => {
    client.on('orderList', (username) => {
        let value = [];
        var sql = "SELECT orderId,price,orderStatus,date,riderName,resName FROM cw.orderList,cw.rider,cw.restaurant WHERE cw.orderList.riderId=cw.rider.riderId AND cw.orderList.resId=cw.restaurant.resId AND username=?";
        var sqlArr = [username];
        let callBack = (err, data) => {
            if (err) {
                console.log('socket failed');
            } else {
                client.emit("cusOrderLst", data.reverse())
                value = data;
            }
        }
        dbConfig.sqlConnect(sql, sqlArr, callBack)
        setInterval(() => {
            let callBack1 = (err, data) => {
                if (err) {
                    console.log('socket failed');
                } else {
                    if (JSON.stringify(data) !== JSON.stringify(value)) {
                        client.emit("cusOrderLst", data.reverse())
                    }
                    value = data;
                }
            }
            dbConfig.sqlConnect(sql, sqlArr, callBack1)
            //client.emit('timer', new Date());
        }, 1000);
    });

    client.on('SendItemOrderID', (orderId) => {
        let val = [];
        let value = null;
        var sql = "SELECT orderId,price,orderStatus,date,riderName,resName FROM cw.orderList,cw.rider,cw.restaurant WHERE cw.orderList.riderId=cw.rider.riderId AND cw.orderList.resId=cw.restaurant.resId AND orderId=?";
        var sqlArr = [orderId];
        var callBack = (err, data)=>{
            if(err){
                console.log('socket connection failed')
            } else {
                value = data[0];
                console.log("111")
                console.log(orderId)
                console.log(value)
                console.log("222")
                //res.send(value);
                var sql2 = "SELECT * FROM cw.orderInfo WHERE orderId=?"
                var sqlArr2 = [orderId];
                var callBack2 = (err, data)=>{
                    if(err){
                        console.log('socket connection failed')
                    } else {
                        var key = "menu";
                        var value1 = data;
                        value[key] = value1;
                        //console.log(typeof value)
                        //res.send(value);
                        //console.log(value)
                        client.emit("SendItemInfo", value)
                        val = value;
                    }
                }
                dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
            }
        }
        dbConfig.sqlConnect(sql, sqlArr, callBack)

        setInterval(() => {
            let value = null;
            var callBack = (err, data)=>{
                if(err){
                    console.log('socket connection failed')
                } else {
                    value = data[0];
                    //console.log(typeof value)
                    //res.send(value);
                    var sql3 = "SELECT * FROM cw.orderInfo WHERE orderId=?"
                    var sqlArr3 = [orderId];
                    var callBack3 = (err, data)=>{
                        if(err){
                            console.log('socket connection failed')
                        } else {
                            var key = "menu";
                            var value1 = data;
                            value[key] = value1;
                            //console.log(typeof value)
                            //res.send(value);
                            if (JSON.stringify(value) !== JSON.stringify(val)) {
                                client.emit("SendItemInfo", value)
                            }


                            val = value;

                        }
                    }
                    dbConfig.sqlConnect(sql3, sqlArr3, callBack3)
                }
            }
            dbConfig.sqlConnect(sql, sqlArr, callBack)
            //client.emit('timer', new Date());
        }, 1000);
    });

    client.on('resOrder', (username) => {
        let value = [];
        var sql = "SELECT resName,orderId,username,price,orderStatus,date FROM cw.restaurant,cw.orderList WHERE cw.restaurant.resId=cw.orderList.resid AND ownerName=? AND orderStatus=\"uncompleted\"";
        var sqlArr = [username];
        let callBack = (err, data) => {
            if (err) {
                console.log('socket failed');
            } else {
                    client.emit("orderLst", data)
                value = data;
            }
        }
        dbConfig.sqlConnect(sql, sqlArr, callBack)
        setInterval(() => {
            let callBack1 = (err, data) => {
                if (err) {
                    console.log('socket failed');
                } else {
                    if (JSON.stringify(data) !== JSON.stringify(value)) {
                        client.emit("orderLst", data)
                    }


                    value = data;
                }
            }
            dbConfig.sqlConnect(sql, sqlArr, callBack1)
            //client.emit('timer', new Date());
        }, 1000);
    });
});

const port = 12312;
io.listen(port);
console.log('listening on port ', port);

const objectsEqual = (o1, o2) => {
    typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;
}

const arraysEqual = (a1, a2) => {
    a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
}
server.listen(5020);
