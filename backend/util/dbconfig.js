const mysql = require('mysql')
module.exports = {
    //数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'aa123456',
        database:'cw'
    },
    //连接数据库，使用mysql的连接池连接方式
    //连接池对象
    sqlConnect:function (sql, sqlArr, callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('connect failed');
                return;
            }
            //事件驱动回调
            conn.query(sql, sqlArr, callBack);
            //释放连接
            conn.release();
        })
    },

    //promise回调
    SySqlConnect:function(sySql, sqlArr){
        return new Promise((resolve, reject)=>{
            var pool = mysql.createPool(this.config)
            pool.getConnection((err,conn)=>{
                if(err){
                    console.log('connect failed');
                    reject(err)
                } else {
                    //事件驱动回调
                    conn.query(sySql, sqlArr,(err,data)=>{
                        if(err){
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    });
                    //释放连接
                    conn.release();
                }
            })
        }).catch((err)=>{
            console.log(err)
        })
    }


}