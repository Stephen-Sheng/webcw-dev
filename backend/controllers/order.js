const dbConfig = require("../util/dbconfig");


//订单列表接口
orderList = (req, res)=> {
    let {username} = req.query;
    var sql = "SELECT orderId,price,orderStatus,date,riderName,resName FROM cw.orderList,cw.rider,cw.restaurant WHERE cw.orderList.riderId=cw.rider.riderId AND cw.orderList.resId=cw.restaurant.resId AND username=?;";
    var sqlArr = [username];
    var callBack = (err, data)=>{
        if(err){
            console.log('orderList connection failed')
        } else {
            res.status(200).send(data)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//订单详情接口
orderInfo = (req, res)=> {
    let value = null;
    let {orderId} = req.query;
    var sql = "SELECT orderId,price,orderStatus,date,riderName,resName FROM cw.orderList,cw.rider,cw.restaurant WHERE cw.orderList.riderId=cw.rider.riderId AND cw.orderList.resId=cw.restaurant.resId AND orderId=?";
    var sqlArr = [orderId];
    var callBack = (err, data)=>{
        if(err){
            console.log('orderInfo connection failed')
        } else {
            value = data[0];
            //console.log(typeof value)
            //res.send(value);
            let {orderId} = req.query;
            var sql = "SELECT * FROM cw.orderInfo WHERE orderId=?"
            var sqlArr = [orderId];
            var callBack = (err, data)=>{
                if(err){
                    console.log('orderInfo connection failed')
                } else {
                    var key = "menu";
                    var value1 = data;
                    value[key] = value1;
                    res.status(200).send(value);
                    //console.log(typeof value)
                    //res.send(value);
                }
            }
            dbConfig.sqlConnect(sql, sqlArr, callBack)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {
    orderList,
    orderInfo
};