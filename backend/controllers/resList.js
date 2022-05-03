const dbConfig = require("../util/dbconfig");
const axios = require("axios");




//餐厅列表接口
res = (req, res)=> {
    let userLoc = null;
    let {username} = req.query;
    var sql = "SELECT location FROM cw.user WHERE name=?";
    var sqlArr = [username];
    var callBack =  (err, data) => {
        if(err){
            console.log('connection failed')
        } else {
            userLoc = data[0].location;
            var sql2 = "SELECT * FROM cw.restaurant";
            var sqlArr2 = [];
            var callBack2 = async (err, data) => {
                if(err){
                    console.log("fail")
                } else {
                    let value = []
                    for (let i in data) {
                        //console.log(data[i].location); //餐厅地点
                        //console.log(userLoc);//用户地点
                        const loc1 = await getLocation(userLoc)
                        //console.log(loc1.data.result.longitude)
                        const loc2 = await getLocation(data[i].location)
                        const dis = getDistance(loc1.data.result.latitude,loc1.data.result.longitude,loc2.data.result.latitude,loc2.data.result.longitude)
                        if(dis <= 5000){
                            value.push(data[i])
                        }
                        // let loc2 = await getLocation(userLoc)
                        // let dis = await getDistance(loc1[0],loc1[1],loc2[0],loc2[1])
                        // console.log(dis)
                        // let loc1 = getLocation(userLoc)
                        // let loc2 = getLocation(data[i].location)
                        // console.log(loc1)
                        // let dis = getDistance(loc1[0], loc1[1], loc2[0], loc2[1])
                        // console.log(dis)
                    }
                    res.send(value)
                }
            }
            dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)

}
async function getLocation(postcode) {
    const axios = require('axios')
    const data = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
    return data
    //     .then(res=>{
    //     console.log("getting location:")
    //     let value = new Array(res.data.result.longitude,res.data.result.latitude)
    //     console.log(value)
    //     return value
    // }).catch(error=>{
    //     console.log(error)
    // })
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
        var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
        return distance

}


module.exports = {res};