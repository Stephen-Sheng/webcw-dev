const dbConfig = require("../util/dbconfig");

//登陆接口
log = (req, res)=>{
    let {username,password} = req.query;
    var sql = "SELECT * FROM cw.user WHERE name=? AND password=?";
    var sqlArr = [username, password];
    var callBack = (err, data)=>{
        if(err){
            console.log('connection failed')
        } else {
            if(data.length){
                console.log('登陆成功111')
                res.send({
                    'list': data
                })
            } else {
                console.log('用户名或密码错误')
            }
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {log};