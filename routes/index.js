module.exports = function () {
    var express = require('express');
    var fs = require('fs');

    var router = express.Router();
    //use方法为router对象指定中间件，即在数据正式发给用户之前，对数据进行处理
    router.use(function (req, res, next) {
        console.log("方式: " + req.method, "URL: " + req.url);
        next();
    });

    // router.get('/', function (req, res) {
    //     fs.createReadStream("./public/index.html").pipe(res);
    // });
    router.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });


    return router;
}    