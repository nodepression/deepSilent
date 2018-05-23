module.exports = function () {
    var express = require('express');
    var fs = require('fs');
    var mysql = require('mysql');
    var config = require('../config.js');

    var router = express.Router();

    //创建连接池
    var pool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database,
    });

    //use方法为router对象指定中间件，即在数据正式发给用户之前，对数据进行处理
    // router.use(function (req, res, next) {
    //     console.log("处于登陆注册路由。方式: " + req.method, "URL: " + req.url);
    //     next();
    // });


    pool.getConnection(function (err, connection) {  //使用连接池
        if (err) {
            console.log('与MySQL数据库建立连接失败！');
            console.log('错误信息为：' + err);
        } else {
            console.log('成功创建连接池！');
        }
    })
    //登陆
    router.post('/sign_in', function (req, res) {
        var config = req.body;
        console.info(config);
        var sql = 'select * from user where username = ? and password = ? ';
        var sql_value_arr = [config.username, config.password];
        var myData = null;//返回数据


        pool.getConnection(function (err, connection) {  //使用连接池
            if (err) {
                console.log('与MySQL数据库建立连接失败！');
                console.log('错误信息为：' + err);
            } else {
                console.log('与MySQL数据库建立连接成功！');
                connection.query(sql, sql_value_arr, function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                    } else if (result.length == 1) {
                        myData = { "status": "200", "state": "ok" };
                        if (req.cookies.username == result[0].username) {
                            console.log("cookie还在有效期");
                            res.json(myData);
                        } else {
                            res.cookie("username", result[0].username, { maxAge: 6000 * 10000 });
                            console.log("登陆成功,并设置cookie");
                            res.json(myData);
                        }
                    } else {
                        myData = { "status": "300", "state": "fail" };
                        res.json(myData);
                        console.log("账号或密码输入有误");
                    }
                });
            }
        })
    });

    router.post('/sign_up', function (req, res) {
        var config = req.body;
        console.info(config);
        var sql = "insert into user(username,password) values(?,?)";
        var sql_value_arr = [config.username, config.password];
        pool.getConnection(function (err, connection) {  //使用连接池
            if (err) {
                console.log('与MySQL数据库建立连接失败！');
                console.log('错误信息为：' + err);
            } else {
                console.log('与MySQL数据库建立连接成功！');
                connection.query(sql, sql_value_arr, function (err, result) {
                    var myData;
                    if (err) {
                        if (err.errno == 1062) {
                            myData = { "status": "300", "state": "ok" };
                            res.json(myData);
                            console.log("用户名已存在！")
                        } else {
                            console.log('[SELECT ERROR] - ', err.message);
                        }
                    } else {
                        myData = { "status": "200", "state": "ok" };
                        res.cookie("username", config.username, { maxAge: 6000 * 10000 });
                        console.log("注册成功,并设置cookie");
                        res.json(myData);
                    }
                });
            }
        })
    });

    router.post('/change', function (req, res) {
        var config = req.body;
        console.info(config);
        var sql = 'update user set password = ?,username = ? where username = ? '
        var sql_value_arr = [config.password, config.username, req.cookies.username];
        // var sql = 'update user set password = ? where username = ? '
        // var sql_value_arr = [config.password, req.cookies.username];
        pool.getConnection(function (err, connection) {  //使用连接池
            if (err) {
                console.log('与MySQL数据库建立连接失败！');
                console.log('错误信息为：' + err);
            } else {
                console.log('与MySQL数据库建立连接成功！');
                connection.query(sql, sql_value_arr, function (err, result) {
                    var myData;
                    if (err) {
                        if (err.errno == 1062) {
                            myData = { "status": "300", "state": "ok" };
                            res.json(myData);
                            console.log("用户名已存在！")
                        }
                        else {
                            console.log('[SELECT ERROR] - ', err.message);
                        }

                    } else {
                        myData = { "status": "200", "state": "ok" };
                        res.cookie("username", config.username, { maxAge: 6000 * 10000 });
                        console.log(result);
                        console.log("更正成功,并重新设置cookie");
                        res.json(myData);
                    }
                });
            }
        })
    });


    return router;
}    