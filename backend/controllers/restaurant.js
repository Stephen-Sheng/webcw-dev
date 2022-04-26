const dbConfig = require("../util/dbconfig");

//根据状态查询订单接口
resGetOrder = (req,res) => {
    var value = null;
    let {username,status} = req.query;
    var sql = "SELECT resName,orderId,username,price,orderStatus,date FROM cw.restaurant,cw.orderList WHERE cw.restaurant.resId=cw.orderList.resid AND orderStatus=? AND ownerName=?";
    var sqlArr = [status, username];
    var callBack = (err, data)=>{
        if(err){
            console.log("resGetOrder failed")
        } else {
            value = data;
            for (let i = 0; i < value.length; ++i) {
                // console.log(value[i]);
                // console.log(value[i].orderId)
                var sql2 = "SELECT itemName,amount,price FROM cw.orderInfo WHERE orderId=?";
                var sqlArr2 = [value[i].orderId];
                var callBack2 = (err, data) => {
                    if(err){
                        console.log('failed');
                    } else {
                        var key = "dish";
                        var value1 = data;
                        value[i][key] = value1;
                        console.log(i);
                        console.log(value[i]);
                    }
                }
                dbConfig.sqlConnect(sql2, sqlArr2, callBack2)

            }
            setTimeout(function () {
                res.send(value)
            },1000);


        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)

}



module.exports = {resGetOrder};