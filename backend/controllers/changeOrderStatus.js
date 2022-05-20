const dbConfig = require("../util/dbconfig");

//change order status
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
                var sql2 = "SELECT riderId FROM cw.rider WHERE riderName=?"
                var sqlArr2 = [rider]
                let id = await dbConfig.SySqlConnect(sql2,sqlArr2)
                var sql3 = "UPDATE cw.orderList SET riderId=? WHERE orderId=?"
                var sqlArr3 = [id[0].riderId,orderId]
                await dbConfig.SySqlConnect(sql3,sqlArr3)
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