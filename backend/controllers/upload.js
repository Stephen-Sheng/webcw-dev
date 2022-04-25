const dbConfig = require("../util/dbconfig");

//上传文件接口
upload = (req, res) => {
    let {orderInfo} = req.body;
    console.log(req.body);

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {upload};

