var express = require('express');
var app = express();
var http = require('http').Server(app);
var server = require('socket.io')(http);
var yaml = require('yamljs'); //解析yml文件
var fs = require('fs');
var path = require('path');

app.use(express.static('./'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var data = null;//需要实时传送的数据
var filePath = path.resolve('./assets/output/yml');//数据保存的文件夹路径



server.on('connection', function (socket) {
    fileDisplay(filePath, function (data) {
        server.emit('message', data);
        console.log(data.date);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});




function fileDisplay(filePath, mySendfile) {  //根据文件路径读取文件，返回文件列表
    var ymlArray = []; //保存yml文件在文件夹中的索引
    var ymlIndex = 0;  //ymlArray的索引，从0开始

    fs.readdir(filePath, function (err, files) { //开始读取文件夹
        if (err) {
            console.warn(err)
        } else {

            files.forEach(function (filename, index) {  //遍历读取到的文件列表，筛选出yml文件
                const re = /(.yml)$/;
                var filedir = path.join(filePath, filename);
                if (re.test(filedir)) {
                    ymlArray.push(index); //保存yml文件在对应文件夹中的索引
                }
            });


            (function my_readFile(index) {  //index为ymlArray的索引，ymlArray[index]为yml文件在文件夹中的索引

                if (index == ymlArray.length) {
                    console.log("已经读完文件");
                    return;
                }
                var filedir = path.join(filePath, files[ymlArray[index]]); //得到yml文件的绝对路径
                // console.log(filedir);
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        data = yaml.parse(fs.readFileSync(filedir).toString()); //解析yml文件为json
                        data.date = Date.now(); //返回时间戳
                        mySendfile(data); //回调函数
                    }
                });

                setTimeout(function () {
                    my_readFile(++index);
                }, 1000)

            })(ymlIndex);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
        }
    });
}
