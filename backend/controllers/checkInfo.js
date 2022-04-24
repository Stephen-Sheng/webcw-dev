const dbConfig = require("../util/dbconfig");

//提交订单接口
checkIn = (req, res)=> {
    let {orderInfo} = req.query;
    console.log(typeof orderInfo);
    console.log();
    //订单号
    var orderCode='';
    for (var i = 0; i < 6; i++){
        orderCode += Math.floor(Math.random() * 10);
    }
    orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
    console.log(orderCode)
    //时间戳
    var currentTime = new Date();
    var timeStamp = currentTime.toLocaleString();//4/23/2022, 6:06:54 PM
    console.log(timeStamp);

    var sql = "INSERT INTO cw.orderList values(?,?,?,'1',?,'uncompleted',?)";
    var sqlArr = [orderCode,JSON.parse(orderInfo).resId,JSON.parse(orderInfo).username,JSON.parse(orderInfo).menu.pop().total,timeStamp];
    var callBack = (err, data) => {
        if(err){
            console.log('checkInfo failed')
        } else {
            for (let i = 0; i < JSON.parse(orderInfo).menu.length-1; ++i){
                var sql2 = "INSERT INTO cw.orderInfo values(?,?,?,?)";
                var sqlArr2 = [orderCode,JSON.parse(orderInfo).menu[i].name,JSON.parse(orderInfo).menu[i].num,JSON.parse(orderInfo).menu[i].price];
                var callBack2 = (err, data) => {
                    if (err) {
                        console.log("fail")
                    } else {

                    }
                }
                dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
            }
            res.send(orderCode);
        }

    }





    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {checkIn};