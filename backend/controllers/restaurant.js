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

//修改信息接口
resDetails = (req,res) => {
    let {username,values} = req.body;

    var sql = "UPDATE cw.restaurant SET resName=? WHERE ownerName=?"
    var sqlArr = [values.store_name, username]
    var callBack = async (err, data)=>{
        if(err){
            console.log("change res detail failed")
        } else {
            var sql2 = "SELECT resId FROM cw.restaurant WHERE ownerName=?"
            var sqlArr2 = [username]
            let resId = await dbConfig.SySqlConnect(sql2, sqlArr2);
            for(let i = 0; i < values.items.length; ++i){
                var sql1 = "INSERT INTO cw.item (resId, itemName, price, description, figure) VALUES (?,?,?,?,?)";
                var sqlArr1 = [resId[0].resId,values.items[i].name,values.items[i].price,values.items[i].description,values.items[i].figure];
                let res = await dbConfig.SySqlConnect(sql1, sqlArr1);
            }


            var sql3 = "SELECT DISTINCT username FROM cw.orderList WHERE resid=?"
            var sqlArr3 = [resId[0].resId]
            let userList = await dbConfig.SySqlConnect(sql3, sqlArr3);


            var sql4 = "INSERT INTO cw.notify(resId,username) VALUES (?,?)"
            for(let i = 0; i < userList.length; ++i){
                var sqlArr4 = [resId[0].resId, userList[i].username]
                await dbConfig.SySqlConnect(sql4, sqlArr4);
            }


            res.status(200).send("changed")
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {
    resGetOrder,
    resDetails
};