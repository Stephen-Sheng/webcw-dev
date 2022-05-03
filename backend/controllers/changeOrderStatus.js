const dbConfig = require("../util/dbconfig");

//修改订单状态接口
changeOS = (req, res)=> {
    let {orderId,status,rider} = req.body;
    var sql = "UPDATE cw.orderList SET orderStatus = ? WHERE orderId = ?";
    var sqlArr = [status,orderId];
    var callBack = async (err, data) => {
        if(err){
            console.log("changeOS failed")
        } else {
            if(status === "in delivery"){
                var sql1 = "UPDATE cw.rider SET status = 'unavailable' WHERE riderName=?"
                var sqlArr1 = [rider]
                await dbConfig.SySqlConnect(sql1,sqlArr1)
            }
            if(status === "completed"){
                var sql2 = "UPDATE cw.rider SET status = 'available' WHERE riderName=?"
                var sqlArr2 = [rider]
                await dbConfig.SySqlConnect(sql2,sqlArr2)
            }
            res.status(200).send("Status changed!")
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {changeOS};