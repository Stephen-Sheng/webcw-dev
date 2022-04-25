const dbConfig = require("../util/dbconfig");

//上传文件接口
upload = (req, res) => {
    console.log("进入upload")
    let {orderInfo} = req.body;
    console.log(req.body);
    console.log("接收完request")
    var sql = "";
    var sqlArr = [];
    var callBack = (err, data) => {
        if(err){
            console.log("upload fail")
        } else {

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {upload};

