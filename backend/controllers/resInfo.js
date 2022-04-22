const dbConfig = require("../util/dbconfig");

//餐厅列表接口
resIn = (req, res)=> {
    let {resId} = req.query;
    var sql = "SELECT itemId,itemName,price,description,figure FROM cw.item WHERE resId=?";
    var sqlArr = [resId];
    var callBack = (err, data) => {
        if(err){
            console.log('connection failed')
        } else {
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {resIn};