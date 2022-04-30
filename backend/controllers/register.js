const dbConfig = require("../util/dbconfig");

//注册接口
reg = async (req, res)=>{
    let{usertype} = req.body
    if(usertype === "customer"){
        let {username,password,postcode} = req.body
        var sql = "SELECT * FROM cw.user WHERE name=?"
        var sqlArr = [username]
        let data0 = await dbConfig.SySqlConnect(sql, sqlArr)
        if(data0.length){
            res.status(530).send("The username is already registered")
        } else {
            let sql_insert = "INSERT into cw.user(name,password,location,userType) value(?,?,?,?)";
            let sqlArr_insert = [username,password,postcode,"CUS"];
            let res = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);
            res.status(200).send("Registration success")
        }
    } else {
        let {username,password,postcode,resName,resImg,description} = req.body
        var sql = "SELECT * FROM cw.user WHERE name=?"
        var sqlArr = [username]
        let data0 = await dbConfig.SySqlConnect(sql, sqlArr)

        var sql1 = "SELECT * FROM cw.verify WHERE name=?"
        var sqlArr1 = [username]
        let data1 = await dbConfig.SySqlConnect(sql1, sqlArr1)

        if(data0.length || data1.length){
            res.status(530).send("The username is already registered")
        } else {
            var currentTime = new Date();
            var timeStamp = currentTime.toLocaleString();
            let sql_insert = "INSERT into cw.verify(name,password,location,userType,resName,resImg,description,date) value(?,?,?,?,?,?,?,?)";
            let sqlArr_insert = [username,password,postcode,"STO",resName,resImg,description,timeStamp];
            let res = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);
            res.status(200).send("Waiting for verification")
        }
    }
}


verPage = async (req,res) => {
    var sql = "SELECT * FROM cw.verify"
    var sqlArr = []
    let data = await dbConfig.SySqlConnect(sql, sqlArr)
    res.send(data)
}

ver = async (req, res) => {
    let {username,result} = req.body
    if(result === "approve"){
        var sql = "SELECT * FROM cw.verify WHERE name=?"
        var sqlArr = [username]
        let data = await dbConfig.SySqlConnect(sql, sqlArr)
        //data[0].
        var sql1 = "INSERT INTO cw.user (name, password, location, userType) VALUES (?,?,?,?)"
        var sqlArr1 = [data[0].name,data[0].password,data[0].location,"STO"]
        await dbConfig.SySqlConnect(sql1,sqlArr1)
        var sql2 = "INSERT INTO cw.restaurant (resName, location, resImg, description, ownerName) VALUES (?,?,?,?,?)"
        var sqlArr2 = [data[0].resName,data[0].location,data[0].resImg,data[0].description,data[0].name]
        await dbConfig.SySqlConnect(sql2,sqlArr2)
        var sql3 = "DELETE FROM cw.verify WHERE name=?"
        var sqlArr3 = [username]
        await dbConfig.SySqlConnect(sql3,sqlArr3)
        res.status(200).send("approved success")
    } else {
        var sql = "DELETE FROM cw.verify WHERE name=?"
        var sqlArr = [username]
        await dbConfig.SySqlConnect(sql,sqlArr)
        res.status(200).send("rejected success")
    }
}

module.exports = {reg,verPage,ver};