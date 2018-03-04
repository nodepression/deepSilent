/**
 * Created by weng on 2018/2/10.
 *
 *
 * unused file
 */



// define(function (require) {
//     var iceServer = {
//         "iceServers": [{
//             "url": "stun:stun.l.google.com:19302"
//         }]
//     };
//     var wsocket = require('./ws');
//     var Channel=function () {
//         this.isCaller = window.location.href.split('#')[1];
//         this.PeerConnection=(window.PeerConnection ||
//         window.webkitPeerConnection00 ||
//         window.webkitRTCPeerConnection ||
//         window.mozRTCPeerConnection);
//
//         this.pc = new this.PeerConnection(iceServer);
//         //发送ICE候选到其他客户端
//
//         this.establish();
//         this.pc.onicecandidate = function(event){
//             wsocket.ws.send(JSON.stringify({
//                 "event": "__ice_candidate",
//                 "data": {
//                     "candidate": event.candidate
//                 }
//             }));
//         };
//
//         this.pc.onaddstream = function(event){
//             console.log('add stream')
//             document.getElementById('your').src = URL.createObjectURL(event.stream);
//         };
//
//        var that = this;
//          this.sendOfferFn = function(desc){
//              console.log('sendoffer',desc)
//                 that.pc.setLocalDescription(desc);
//                 wsocket.ws.send(JSON.stringify({
//                     "event": "_offer",
//                     "data": {
//                         "sdp": desc
//                     }
//                 }));
//             }
//             this.sendAnswerFn = function(desc){
//                 console.log('answer',desc)
//                 that.pc.setLocalDescription(desc);
//                 wsocket.ws.send(JSON.stringify({
//                     "event": "_answer",
//                     "data": {
//                         "sdp": desc
//                     }
//                 }));
//             };
//
//
//
//
//     }
//
//
//
//     Channel.prototype.establish = function () {
//         var that=this;
//
//         // wsocket.ws.send(JSON.stringify({
//         //     "event": "__ice_candidate",
//         //     "data": {
//         //         "candidate": event.candidate,
//         //         "room":1
//         //     }
//         // }))
//         wsocket.ws.addEventListener('message',function (event) {
//             var json = JSON.parse(event.data);
//             console.log(json);
//             //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
//             if( json.event === "__ice_candidate" ){
//                 that.pc.addIceCandidate(new RTCIceCandidate(json.data));
//             } else {
//
//                 console.log(that.pc.setRemoteDescription(new RTCSessionDescription(json.data.sdp)));
//                 // 如果是一个offer，那么需要回复一个answer
//                 if(json.event === "_offer") {
//                     that.pc.createAnswer(that.sendAnswerFn, function (error) {
//                         console.log('Failure callback: ' + error);
//                     });
//                 }
//             }
//         })
//
//     }
//
//
//
//
//
//
//
//
//
//     Channel.prototype.sender=function () {
//         // var cam = require('./getCamera')
//         // new cam('mine');
//         var that = this;
//         var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
//
//         getUserMedia.call(navigator, {
//             video: true,
//             audio: true
//         }, function(localMediaStream) {
//             var video = document.getElementById('mine');
//             video.src = window.URL.createObjectURL(localMediaStream);
//
//             that.pc.addStream(localMediaStream);
//
//             that.pc.createOffer(that.sendOfferFn, function (error) {
//                 console.log('Failure callback: ' + error);
//             });
//
//
//
//
//             video.onloadedmetadata = function(e) {
//                 console.log("Label: " + localMediaStream.label);
//                 console.log("AudioTracks" , localMediaStream.getAudioTracks());
//                 console.log("VideoTracks" , localMediaStream.getVideoTracks());
//             };
//         }, function(e) {
//             console.log('Reeeejected!', e);
//         });
//
//     }
//
//
//     Channel.prototype.receiver=function () {
//
//     }
//
//
//
//     return Channel;
//
//
// })