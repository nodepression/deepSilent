(function () {

    var express = require('express');
    var app = express();
    var http = require('http').Server(app);
    var server = require('socket.io')(http);
    var fs = require('fs');
    var path = require('path');
    var chokidar = require('chokidar'); //监听文件变化
    var bodyParser = require('body-parser');


    app.use(express.static('./'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));



    
    var log = console.log.bind(console);
    var jsonData = null;//需要实时传送的数据
    var filePath = path.resolve('./assets/output/json');//需要实时更新的数据保存的文件夹路径


    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    //保存前端发送的base64图片
    app.post('/saveInfo', function (req, res) {
        //接收前台POST过来的base64
        var imgData = req.body.imgData;
        //过滤data:URL
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var filename = "./out/" + req.body.username + ".png";
        //根据username命名文件
        fs.writeFile(filename, dataBuffer, function (err) {
            if (err) {
                res.send({ "state": "false", err });
            } else {
                log(filename + " : 保存成功");
                res.send({ "state": "ok" });
            }
        });
    });


    server.on('connection', function (socket) {
        console.log("开始一个连接");
        socket.on('disconnect', function () {
            console.log("一个连接断开");
        });
    });


    function watch_a_folder(filePath) {  //根据文件路径读取文件，返回文件列表

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
                    jsonData.date = Date.now(); //返回时间戳

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


    http.listen(3000, function () {
        console.log('listening on *:3001');
    });



    watch_a_folder(filePath);//监听目的文件夹

})();



