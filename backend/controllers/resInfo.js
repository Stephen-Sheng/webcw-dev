const dbConfig = require("../util/dbconfig");

//餐厅列表接口
resIn = (req, res)=> {
    var value = null;
    let {resId} = req.query;
    var sql = "SELECT itemId,itemName,price,description,figure FROM cw.item WHERE resId=?";
    var sqlArr = [resId];
    var callBack = (err, data) => {
        if(err){
            console.log('connection failed')
        } else {
            value = data;
            console.log(value);
            var sql2 = "SELECT resName FROM cw.restaurant WHERE resId=?";
            var sqlArr2 = [resId];
            var callBack2 = (err, data) => {
                if(err){
                    console.log('failed');
                } else {
                    var resp = data[0];
                    var key = "menu";
                    resp[key] = value;
                    res.send(resp);
                }
            }
            dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {resIn};