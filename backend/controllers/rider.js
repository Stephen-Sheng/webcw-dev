const dbConfig = require("../util/dbconfig");

//check free rider
rider = async (req, res)=>{
    var sql = "SELECT riderName FROM cw.rider WHERE status='available'"
    var sqlArr=[]
    let riderList = await dbConfig.SySqlConnect(sql,sqlArr)
    res.status(200).send(riderList)
}

module.exports = {rider}