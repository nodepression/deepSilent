/**
 * Created by weng on 2018/2/10.
 */
define(function (require) {
    var api = require('js/modules/API.js');
    var url = api.ws;
    console.log(url);
    var ws = new WebSocket(url);


        ws.addEventListener("message", function (e) {
            console.log("接收到   ", JSON.parse(e.data))



        })
        ws.addEventListener("error", function (e) {
            ws.send(JSON.stringify({event: 1}));//断开连接发送请求
            console.log("ws error   ", (e));
        })
        ws.addEventListener("close", function (e) {
            // ws.send(JSON.stringify({event: 1}));
            console.log("ws close   ", e);

        });
        window.onunload=function () {
            ws.send(JSON.stringify({event: 1}));
            console.log("web close   ",);
        }

        //
        // setInterval(function () {
        //     ws.send(JSON.stringify({type: 1}));
        // }, 3000);

    return {ws:ws};
})