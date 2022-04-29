const dbConfig = require("../util/dbconfig");

//上传文件接口
upload = (req, res) => {
    console.log("进入upload")

    console.log(req.file);
    console.log("接收完request")
    res.send(`http://localhost:5020/images/${req.file.filename}`)
}
module.exports = {upload};

