const dbConfig = require("../util/dbconfig");

//登陆接口
log = (req, res)=>{
    let {username,password} = req.body;
    var sql = "SELECT * FROM cw.user WHERE name=? AND password=?";
    var sqlArr = [username, password];
    var callBack = (err, data)=>{
        if(err){
            console.log('connection failed')
        } else {
            if(data.length){
                console.log('登陆成功111')
                // console.log(data)
                // console.log(typeof data)
                // console.log(Object.keys(data))
                // console.log(Object.keys(Object.values(data)))
                // console.log(Object.values(Object.values(data)))
                // var rData = Object.values(data)
                console.log(typeof data[0])
                res.status(200).send(data[0])
            } else {
                console.log('用户名或密码错误')
                res.status(530).send("login failed")
            }
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {log};