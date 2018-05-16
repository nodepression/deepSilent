(function () {

    var express = require('express');
    var app = express();
    var http = require('http').Server(app);
    var server = require('socket.io')(http);
    var fs = require('fs');
    var nodePath = require('path');
    var chokidar = require('chokidar'); //监听文件变化
    var bodyParser = require('body-parser');
    var { exec } = require('child_process');
    var mysql = require('mysql');



     //自己定义的router
    var index   = require('./routes/index.js')();


    

    app.use(express.static('./'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/', index);//对所有路径应用这个路由



    var log = console.log.bind(console);
    var jsonData = null;//需要实时传送的数据
    var json_path = nodePath.resolve('./assets/output/json');//需要实时更新的json数据保存的文件夹路径
    var keyImg_path = nodePath.resolve('./assets/output/keyImg');//需要监听的关键图片(表格里的数据)文件夹;



    //保存前端发送的图片和json
    app.post('/saveInfo', function (req, res) {
        var imgData = req.body.imgData;//接收前台POST过来的base64
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");//过滤data:URL
        var dataBuffer = new Buffer(base64Data, 'base64');
        var img_url = "./out/img/" + req.body.username + ".png"; //根据username命名文件
        fs.writeFile(img_url, dataBuffer, function (err) { //写入图片
            if (err) {
                res.send({ "state": "false", err });
            } else {
                log(img_url + " : 保存成功");
                res.send({ "state": "ok" });
            }
        });

        var jsonUrl = "./out/json/" + req.body.username + ".json";
        var person = {};
        person.name = req.body.username;
        person.age = req.body.age;
        person.gender = req.body.gender;
        person.img = req.body.username + ".png";
        fs.writeFile(jsonUrl, JSON.stringify(person), function (err) {
            if (err) {
                log({ "state": "false", err });
            } else {
                log(jsonUrl + " : 保存成功");
            }
        })


    });


    app.post('/cmd', function (req, res) {
        var start = req.body.start;
        if (start=="true") {
            exec("cd ./", (err, stdout, stderr) => {
                if (err) {
                    res.send({ state: "false" })
                    console.error(err);
                    return;
                }
                else {
                    res.send({ state: "start" })
                }
            });
        }
        else {
            exec("cd ./", (err, stdout, stderr) => {
                if (err) {
                    res.send({ state: "false" })
                    console.error(err);
                    return;
                }
                else {
                    res.send({ state: "off" })
                }
            });
        }

    })


    server.on('connection', function (socket) {
        console.log("开始一个连接");
        socket.on('disconnect', function () {
            console.log("一个连接断开");
        });
    });




    function watch_json_folder(filePath) {  //根据文件路径读取文件，返回文件列表

        var watcher = chokidar.watch(filePath, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });

        watcher.on('add', function (path) {
            log(`File ${path} has been added`);
            const re = /(.json)$/;  //判断json文件的正则表达式
            if (re.test(path)) { //只读取json文件

                try {
                    jsonData = JSON.parse(fs.readFileSync(path)); //读取json文件
                } catch (error) {
                    log("加入的json文件有误");
                }

                if (jsonData) {
                    var img_url = nodePath.basename(path).split("_")[0] + "_rendered.png"; //json对应的图片名
                    jsonData.date = Date.now(); //返回时间戳
                    jsonData.imgUrl = img_url;  //返回对应图片地址

                    if (server) { //保持连接状态的话就向客户端发送新添加的信息。
                        server.emit('message', jsonData);
                    }
                    else {
                        log("没有客户端连接,此时生成的信息将不能传输到客户端");
                    }
                }

            }


            else { //当传入其他文件时给出提示信息
                log("what you add is not a json format file");
                // data = fs.readFileSync(path);
            }


        })
    }


    function watch_keyImg_folder(filePath) {  //监听保存key img的文件夹,有新图片生成则把图片路径传给客户端

        var watcher = chokidar.watch(filePath, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });

        watcher.on('add', function (path) {
            log(`File ${path} has been added`);
            const re = /(.png)$/;  //判断png文件的正则表达式
            if (re.test(path)) { //只读取png文件

                if (server) { //保持连接状态的话就向客户端发送新添加的信息。
                    server.emit('keyImg', path);
                }
                else {
                    log("没有客户端连接,此时生成的信息将不能传输到客户端");
                }

            }

            else { //当传入其他文件时给出提示信息
                log("what you add is not a png format file");
            }

        })
    }


    http.listen(3000, function () {
        console.log('listening on *:3000');
    });

    watch_json_folder(json_path);//监听json文件夹
    watch_keyImg_folder(keyImg_path);//监听img文件夹




})();



