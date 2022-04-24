const dbConfig = require("../util/dbconfig");

//注册接口
reg = (req, res)=>{
    let {username,password} = req.body;
    var sql = "SELECT * FROM cw.user WHERE name=?";
    var sqlArr = [username];
    var callBack = async (err, data)=>{
        if(err){
            console.log('connection failed')
        } else {
            if(data.length){
                console.log('zhuceguole')
            } else {
                //没有注册过，写入数据库
                let sql_insert = "INSERT into cw.user(name,password) value(?,?)";
                let sqlArr_insert = [username,password];
                let res = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);
                console.log('zhucechenggong')
            }
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {reg};