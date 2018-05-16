module.exports = function () {
    var express = require('express');
    var fs = require('fs');
    var mysql = require('mysql');
    var config = require('../config.js');

    var router = express.Router();
    //建立数据库连接
    var connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database,
    });
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });


    //use方法为router对象指定中间件，即在数据正式发给用户之前，对数据进行处理
    // router.use(function (req, res, next) {
    //     console.log("处于登陆注册路由。方式: " + req.method, "URL: " + req.url);
    //     next();
    // });

    //登陆
    router.post('/sign_in', function (req, res) {
        var config = req.body;
        console.info(config);
        var sql="select * from user where username = ? and password = ?)";
        var sql_value_arr = [config.username,config.password];

        connection.query(sql,sql_value_arr, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message); 
            } else {
                var myData = { "status": "200", "state": "ok"};
                console.log(result);
                res.json(myData);
            }
        });
    });

    router.post('/sign_up', function (req, res) {
        var config = req.body;
        console.info(config);
        var sql="insert into user(username,password) values(?,?)";
        var sql_value_arr = [config.username,config.password];

        connection.query(sql,sql_value_arr, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message); 
            } else {
                var myData = { "status": "200", "state": "ok"};
                console.log(result,插入成功);
                res.json(myData);
            }
        });
    });

    return router;
}    