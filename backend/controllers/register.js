const dbConfig = require("../util/dbconfig");

//注册接口
reg = async (req, res)=>{
    let{usertype} = req.body
    if(usertype === "customer"){
        let {username,password,postcode,email} = req.body
        var sql = "SELECT * FROM cw.user WHERE name=?"
        var sqlArr = [username]
        let data0 = await dbConfig.SySqlConnect(sql, sqlArr)

        var sql2 = "SELECT * FROM cw.email WHERE username=?"
        var sqlArr2 = [username]
        let data2 = await dbConfig.SySqlConnect(sql2,sqlArr2)

        if(data0.length || data2.length){
            res.status(530).send("The username is already registered")
        } else {
            const postcodeResult = await getValidate(postcode)
            if(postcodeResult.data.result){
                let verCode = Math.random().toString().slice(-6)
                var sql1 = "INSERT into cw.email(username,password,location,userType,emailAddress,code) value(?,?,?,'CUS',?,?)"
                var sqlArr1 = [username,password,postcode,email,verCode]
                await dbConfig.SySqlConnect(sql1,sqlArr1)
                //send email
                sendMail(email,verCode).then(()=>{
                    res.send({ err: 0, msg: "already send email"})
                }).catch(()=>{
                    res.send({ err: 1, msg: "send email failed"})
                })

            } else {
                res.status(903).send("The postcode is invalid")
            }

        }
    } else {
        let {username,password,postcode,resName,resImg,description,email} = req.body
        var sql = "SELECT * FROM cw.user WHERE name=?"
        var sqlArr = [username]
        let data0 = await dbConfig.SySqlConnect(sql, sqlArr)

        var sql1 = "SELECT * FROM cw.verify WHERE name=?"
        var sqlArr1 = [username]
        let data1 = await dbConfig.SySqlConnect(sql1, sqlArr1)

        var sql2 = "SELECT * FROM cw.email WHERE username=?"
        var sqlArr2 = [username]
        let data2 = await dbConfig.SySqlConnect(sql2,sqlArr2)

        if(data0.length || data1.length || data2.length){
            res.status(530).send("The username is already registered")
        } else {
            const postcodeResult = await getValidate(postcode)
            if(postcodeResult.data.result){
                var currentTime = new Date();
                var timeStamp = currentTime.toLocaleString();
                let verCode = Math.random().toString().slice(-6)
                var sql3 = "INSERT into cw.email(username,password,location,userType,resName,resImg,description,date,emailAddress,code) value(?,?,?,'STO',?,?,?,?,?,?)"
                var sqlArr3 = [username,password,postcode,resName,resImg,description,timeStamp,email,verCode]
                await dbConfig.SySqlConnect(sql3,sqlArr3)
                //send email
                sendMail(email,verCode).then(()=>{
                    res.send({ err: 0, msg: "already send email"})
                }).catch(()=>{
                    res.send({ err: 1, msg: "send email failed"})
                })
            } else {
                res.status(903).send("The postcode is invalid")
            }
        }
    }
}


verPage = async (req,res) => {
    var sql = "SELECT * FROM cw.verify WHERE status IS NULL"
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
        var sql = "UPDATE cw.verify SET status = 'rejected' WHERE name=?"
        var sqlArr = [username]
        await dbConfig.SySqlConnect(sql,sqlArr)

        res.status(200).send("rejected success")
    }
}

//判断验证码
codeCheck = async (req,res) => {
    let {username,verCode} = req.body
    var sql = "SELECT * FROM cw.email WHERE username=?"
    var sqlArr = [username]
    let data0 = await dbConfig.SySqlConnect(sql, sqlArr)
    if(data0.length){
        if(JSON.stringify(data0[0].code) === JSON.stringify(verCode)){
            if(data0[0].userType === "CUS"){
                let sql_insert = "INSERT into cw.user(name,password,location,userType) value(?,?,?,?)";
                let sqlArr_insert = [data0[0].username,data0[0].password,data0[0].location,"CUS"];
                let re = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);

                let sql_del = "DELETE FROM cw.email WHERE username=?"
                let sqlArr_del = [username]
                await dbConfig.SySqlConnect(sql_del,sqlArr_del)
                res.status(200).send("Registration success")
            } else {
                let sql_insert = "INSERT into cw.verify(name,password,location,userType,resName,resImg,description,date) value(?,?,?,?,?,?,?,?)";
                let sqlArr_insert = [data0[0].username,data0[0].password,data0[0].location,"STO",data0[0].resName,data0[0].resImg,data0[0].description,data0[0].date];
                let re = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);

                let sql_del = "DELETE FROM cw.email WHERE username=?"
                let sqlArr_del = [username]
                await dbConfig.SySqlConnect(sql_del,sqlArr_del)
                res.status(200).send("Waiting for verification")
            }
        } else {
            res.status(904).send("wrong code")
        }
    }
}

//重新发送验证码
resendCode = async (req,res) => {
    let {username} = req.body
    var sql = "SELECT * FROM cw.email WHERE username=?"
    var sqlArr = [username]
    let data0 = await dbConfig.SySqlConnect(sql, sqlArr)

    if(data0.length){
        let verCode = Math.random().toString().slice(-6)
        var sql1 = "UPDATE cw.email SET code=? WHERE username=?"
        var sqlArr1 = [verCode,username]
        await dbConfig.SySqlConnect(sql1,sqlArr1)
        //send email
        sendMail(data0[0].emailAddress,verCode).then(()=>{
            res.send({ err: 0, msg: "already send email"})
        }).catch(()=>{
            res.send({ err: 1, msg: "send email failed"})
        })
    }
}

//google注册
googleReg = async (req,res) => {
    let {username,postcode,usertype} = req.body
    if(usertype === "customer"){
        var sql = "SELECT * FROM cw.user WHERE name=?"
        var sqlArr = [username]
        let data0 = await dbConfig.SySqlConnect(sql, sqlArr)

        var sql2 = "SELECT * FROM cw.email WHERE username=?"
        var sqlArr2 = [username]
        let data2 = await dbConfig.SySqlConnect(sql2,sqlArr2)

        if(data0.length || data2.length){
            res.status(530).send("The username is already registered")
        } else {
            const postcodeResult = await getValidate(postcode)
            if(postcodeResult.data.result){
                let sql_insert = "INSERT into cw.user(name,password,location,userType) value(?,?,?,?)";
                let sqlArr_insert = [username,"googlelogin",postcode,"CUS"];
                let re = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);
                res.status(200).send("Registration success")
            } else {
                res.status(903).send("The postcode is invalid")
            }
        }
    } else {
        let {username,postcode,resName,resImg,description} = req.body
        var sql = "SELECT * FROM cw.user WHERE name=?"
        var sqlArr = [username]
        let data0 = await dbConfig.SySqlConnect(sql, sqlArr)

        var sql1 = "SELECT * FROM cw.verify WHERE name=?"
        var sqlArr1 = [username]
        let data1 = await dbConfig.SySqlConnect(sql1, sqlArr1)

        var sql2 = "SELECT * FROM cw.email WHERE usernanme=?"
        var sqlArr2 = [username]
        let data2 = await dbConfig.SySqlConnect(sql2,sqlArr2)

        if(data0.length || data1.length || data2.length){
            res.status(530).send("The username is already registered")
        } else {
            const postcodeResult = await getValidate(postcode)
            if(postcodeResult.data.result){
                var currentTime = new Date();
                var timeStamp = currentTime.toLocaleString();
                let sql_insert = "INSERT into cw.verify(name,password,location,userType,resName,resImg,description,date) value(?,?,?,?,?,?,?,?)";
                let sqlArr_insert = [username,"googlelogin",postcode,"STO",resName,resImg,description,timeStamp];
                let re = await dbConfig.SySqlConnect(sql_insert, sqlArr_insert);
                res.status(200).send("Waiting for verification")
            } else {
                res.status(903).send("The postcode is invalid")
            }
        }
    }

}

async function getValidate(postcode) {
    const axios = require('axios')
    const data = await axios.get(`http://api.postcodes.io/postcodes/${postcode}/validate`)
    return data
}

//发邮件配置
const nodemailer = require('nodemailer');
//配置邮箱 记得开启邮箱服务
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: "544518449@qq.com",
        pass: "sasbljnjgoxybdga",
    },
});
//mail是收邮件的邮箱，code是验证码
function sendMail(mail, code) {
    // 设置邮件内容（谁发送什么给谁）
    let mailOptions = {
        from: '" Verification Email " <544518449@qq.com>',   // 发件人
        to: mail,     // 收件人
        subject: "Email Verification",    // 主题
        text: `You are trying to register with this email, your verification code is ${code},The verification code is valid for 5 minutes.`,   // 直接发送文本
    };
    //异步操作
    return new Promise((resolve, reject) => {
        // 使用先前创建的传输器的 sendMail 方法传递消息对象
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) reject();
            else {
                console.log(`Message: ${info.messageId}`);
                console.log(`sent: ${info.response}`);
                resolve();
            }
        });
    });
}



module.exports = {reg,verPage,ver,googleReg,codeCheck,resendCode};