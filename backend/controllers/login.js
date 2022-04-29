const dbConfig = require("../util/dbconfig");
const {notification} = require("antd");

//登陆接口
log = (req, res)=>{
    let {username,password} = req.body;
    var sql = "SELECT name,location,userType FROM cw.user WHERE name=? AND password=?";
    var sqlArr = [username, password];
    var callBack = async (err, data)=>{
        if(err){
            console.log('connection failed')
        } else {
            if(data.length){
                console.log('登陆成功111')
                var sql = "SELECT DISTINCT resId FROM cw.notify WHERE username=?";
                var sqlArr = [username];
                let data1 = await dbConfig.SySqlConnect(sql, sqlArr)
                var resName = []
                for(let i=0; i < data1.length; ++i){
                    var sql1 = "SELECT resName FROM cw.restaurant WHERE resId=?";
                    var sqlArr1 = [data1[i].resId]
                    let name = await dbConfig.SySqlConnect(sql1, sqlArr1)
                    resName.push(name[0].resName)
                }
                var sql2 = "DELETE FROM cw.notify WHERE username=?"
                var sqlArr2 = [username]
                await dbConfig.SySqlConnect(sql2, sqlArr2)
                res.status(200).send("{\"store\":[" + resName + "],\"userInfo\":" + JSON.stringify(data[0]) + "}")
            } else {
                console.log('用户名或密码错误')
                res.status(530).send("login failed")
            }
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {log};