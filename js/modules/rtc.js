/**
 * Created by weng on 2018/2/11.
 */

define(function (require) {

    var wsocket = require('./ws');



    function hasUserMedia() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        return !!navigator.getUserMedia;
    }

    function hasRTCPeerConnection() {
        window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection;
        return !!window.RTCPeerConnection;
    }
    var nativeRTCSessionDescription = (window.mozRTCSessionDescription || window.RTCSessionDescription); // order is very important: "RTCSessionDescription" defined in Nighly but useless

    var yourVideo = document.getElementById("mine");
    var theirVideo = document.getElementById("your");
    var yourConnection, theirConnection;

    var config = {
        'iceServers': [{ "url": "stun:stun.l.google.com:19302"}]
    };
    yourConnection = new RTCPeerConnection(config);
    theirConnection = new RTCPeerConnection(config);

    yourConnection.onicecandidate = function(e) {
        console.log('your  e:  ',e)
        if (e.candidate) {
            theirConnection.addIceCandidate(new RTCIceCandidate(e.candidate));
        }
    }
    theirConnection.onicecandidate = function(e) {
        console.log('their  e:  ',e)
        if (e.candidate) {
            yourConnection.addIceCandidate(new RTCIceCandidate(e.candidate));
        }
    }

    theirConnection.onaddstream = function(e) {
        console.log('add stream')
        theirVideo.src = window.URL.createObjectURL(e.stream);
    }



    function startPeerConnection(stream) {

        yourConnection.addStream(stream);

        /***********************信令交换部分*******************************/

        yourConnection.createOffer().then(offer => {
            console.log(offer)
            yourConnection.setLocalDescription(offer);
            sendoffer(offer);


        });
    }


    function sendoffer(offer) {
        wsocket.ws.send(JSON.stringify({
            "event": "_offer",
            "data": {
                "sdp": offer
            }
        }))
    }

    function receiveoffer(offer) {
        theirConnection.setRemoteDescription(new nativeRTCSessionDescription(offer));
    }

    function sendanswer() {
        if(yourVideo.src==window.location){
            yourConnection.createOffer().then(offer => {
                console.log(offer)
                yourConnection.setLocalDescription(offer);
                sendoffer(offer);
            });
        }
        theirConnection.createAnswer().then(answer => {
            console.log(answer)
            theirConnection.setLocalDescription(answer);
            wsocket.ws.send(JSON.stringify({
                "event": "_answer",
                "data": {
                    "sdp": answer
                }
            }))


        })


    }

    function receiveanswer(ans) {
        yourConnection.setRemoteDescription(new nativeRTCSessionDescription(ans));
    }


    wsocket.ws.addEventListener('message',function (event) {
        var json = JSON.parse(event.data);
        console.log(json);
        console.log(json.event);
        if(json.event==1){
            //另一方掉线
            window.alert('对方掉线');
        }
        if(json.event==2){
            //另一方不存在
            alert('另一方不存在');
        }
        //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
        if( json.event === "__ice_candidate" ){
            that.pc.addIceCandidate(new RTCIceCandidate(json.data));
        } else {

            // console.log(that.pc.setRemoteDescription(new RTCSessionDescription(json.data.sdp)));
            // 如果是一个offer，那么需要回复一个answer
            if(json.event === "_offer") {
                receiveoffer(json.data.sdp);
                sendanswer();
            }else if(json.event === "_answer"){
                receiveanswer(json.data.sdp)
            }
        }
    })


    document.getElementById('call').onclick=function () {
        makeCakll();
        makeCakll();

    }
    function makeCakll() {
        if (hasUserMedia()) {
            navigator.getUserMedia({ video: true, audio: true },
                (stream) => {
                    yourVideo.src = window.URL.createObjectURL(stream);
                    if (hasRTCPeerConnection()) {
                        startPeerConnection(stream);
                    } else {
                        alert("没有RTCPeerConnection API");
                    }
                },
                (err) => {
                    console.log(err);
                })
        } else {
            alert("没有userMedia API")
        }
    }

})