const dbConfig = require("../util/dbconfig");

//upload file
upload = (req, res) => {
    res.status(200).send(`http://localhost:5020/images/${req.file.filename}`)
}
module.exports = {upload};

