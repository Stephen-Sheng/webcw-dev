const dbConfig = require("../util/dbconfig");

//查询空余骑手接口
rider = async (req, res)=>{
    var sql = "SELECT riderName FROM cw.rider WHERE status='available'"
    var sqlArr=[]
    let riderList = await dbConfig.SySqlConnect(sql,sqlArr)
    res.status(200).send(riderList)
}

module.exports = {rider}