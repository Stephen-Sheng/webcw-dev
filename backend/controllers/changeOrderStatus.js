const dbConfig = require("../util/dbconfig");

//修改订单状态接口
changeOS = (req, res)=> {
    let {orderId,status} = req.body;
    var sql = "UPDATE cw.orderList SET orderStatus = ? WHERE orderId = ?";
    var sqlArr = [status,orderId];
    var callBack = (err, data) => {
        if(err){
            console.log("changeOS failed")
        } else {
            res.status(200).send("Status changed!")
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {changeOS};