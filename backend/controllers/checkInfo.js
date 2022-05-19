const dbConfig = require("../util/dbconfig");
const axios = require("axios");

//提交订单接口
checkIn = async (req, res)=> {
    let {orderInfo} = req.body;
    console.log(typeof orderInfo);
    console.log(orderInfo);
    //订单号
    var orderCode='';
    for (var i = 0; i < 6; i++){
        orderCode += Math.floor(Math.random() * 10);
    }
    orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
    console.log(orderCode)
    //时间戳
    var currentTime = new Date();
    var timeStamp = currentTime.toLocaleString();//4/23/2022, 6:06:54 PM
    console.log(timeStamp);
    //distance
    var sql1 = "SELECT location FROM cw.user WHERE name=?"
    var sqlArr1 = [orderInfo.username]
    let userLoc = await dbConfig.SySqlConnect(sql1,sqlArr1)
    var sql2 = "SELECT location FROM cw.restaurant WHERE resId=?"
    var sqlArr2 = [orderInfo.resId]
    let resLoc = await dbConfig.SySqlConnect(sql2,sqlArr2)
    const loc1 = await getLocation(userLoc[0].location)
    const loc2 = await getLocation(resLoc[0].location)
    const dis = getDistance(loc1.data.result.latitude,loc1.data.result.longitude,loc2.data.result.latitude,loc2.data.result.longitude)

    var sql = "INSERT INTO cw.orderList values(?,?,?,'999',?,'uncompleted',?,?)";
    var sqlArr = [orderCode,orderInfo.resId,orderInfo.username,orderInfo.menu.pop().total,timeStamp,dis];
    var callBack = (err, data) => {
        if(err){
            console.log('checkInfo failed')
        } else {
            for (let i = 0; i <= orderInfo.menu.length-1; ++i){
                var sql2 = "INSERT INTO cw.orderInfo values(?,?,?,?)";
                var sqlArr2 = [orderCode,orderInfo.menu[i].name,orderInfo.menu[i].num,orderInfo.menu[i].price];
                var callBack2 = (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {

                    }
                }
                dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
            }
            res.status(200).send("{\"orderId\":\"" + orderCode + "\"}");
        }

    }





    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

async function getLocation(postcode) {
    try{
        const axios = require('axios')
        const data = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
        return data
    }catch (err){
        consol.log(err)
    }
}

function getDistance(lat1,lng1,lat2,lng2){
    //console.log("enter dis")
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    var distance = Math.ceil((r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))) / 360);

    return distance

}


module.exports = {checkIn};