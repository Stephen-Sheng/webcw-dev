const dbConfig = require("../util/dbconfig");




//餐厅列表接口
res = (req, res)=> {
    let userLoc = null;
    let {username} = req.query;
    var sql = "SELECT location FROM cw.user WHERE name=?";
    var sqlArr = [username];
    var callBack = (err, data) => {
        if(err){
            console.log('connection failed')
        } else {
            userLoc = data[0].location;
            var sql2 = "SELECT * FROM cw.restaurant";
            var sqlArr2 = [];
            var callBack2 = (err, data) => {
                if(err){
                    console.log("fail")
                } else {
                    for (let i in data) {
                        console.log(data[i].location); //餐厅地点
                        console.log(userLoc);//用户地点
                    }
                    res.send(data)
                }
            }
            dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)

}
module.exports = {res};