//获取用户
const dbConfig = require("../util/dbconfig");
getUser=(req, res)=>{
    var sql = "SELECT * FROM user";
    var sqlArr = [];
    var callBack = (err, data)=>{
        if(err){
            console.log('connection failed')
        } else {
            res.send({
                'list': data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//获取指定用户的订单列表
getOrder =(req, res)=>{
    let {id} = req.query;
    var sql = "SELECT * FROM cw.order WHERE userID=?";
    var sqlArr = [id];
    var callBack = (err, data)=>{
        if(err){
            console.log('connection failed')
        } else {
            res.send({
                'list': data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//


module.exports = {
    getUser,
    getOrder
}